
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import datetime
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error, r2_score
import tensorflow as tf
from tensorflow.keras.losses import MeanSquaredError
from pathlib import Path
import logging
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Define the paths to the CSV files
DATA_PATH = Path.cwd() / 'data' / 'bt_food_pricesup.csv'
BT_WEATHER_DATA_PATH = Path.cwd() / 'data' / 'bt_weather_data1.csv'
MAIZE_HARVEST_DATA_PATH = Path.cwd() / 'data' / 'bt_maize_harvest.csv'

# Read the data from the CSV files
data = pd.read_csv(DATA_PATH)
bt_weather_data = pd.read_csv(BT_WEATHER_DATA_PATH)
bt_maize_data = pd.read_csv(MAIZE_HARVEST_DATA_PATH)

# Clean data
data.fillna(method='bfill', inplace=True)

# Register custom loss/metric
mse = MeanSquaredError()

# Load the pre-trained LSTM model
MODEL_PATH = Path.cwd() / 'models' / 'lstm_model.h5'
lstm_model = load_model(MODEL_PATH, custom_objects={'mse': mse})

# Swagger configuration
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Agricultural Commodity Price Projection API"
    }
)

app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)


# Function to prepare data for LSTM
def prepare_data_for_lstm(data, seq_length=10):
    if data.empty:
        raise ValueError("No data available to prepare for LSTM")
        
    prices = data['price'].values.reshape(-1, 1)
    rainfall = data['rainfall'].values.reshape(-1, 1)
    temp = data['temp'].values.reshape(-1, 1)

    scaler_price = MinMaxScaler()
    scaler_rainfall = MinMaxScaler()
    scaler_temp = MinMaxScaler()

    prices_normalized = scaler_price.fit_transform(prices)
    rainfall_normalized = scaler_rainfall.fit_transform(rainfall)
    temp_normalized = scaler_temp.fit_transform(temp)

    combined_features = np.concatenate((prices_normalized, rainfall_normalized, temp_normalized), axis=1)

    sequences = []
    targets = []
    for i in range(len(combined_features) - seq_length):
        sequences.append(combined_features[i:i+seq_length])
        targets.append(prices_normalized[i+seq_length])

    return np.array(sequences), np.array(targets), scaler_price

# seasonal trends
def adjust_forecast_prices(forecast_prices, forecast_dates):
    seasonal_factors = {
        1: 1.28, 2: 1.2, 3: 1.13, 4: 1.1, 5: 1.03, 6: 1.0, 7: 1.0, 8: 1.3, 9: 1.3, 10: 1.33, 11: 1.3, 12: 1.3
    }
    
    pred_prices = []
    for date, price in zip(forecast_dates, forecast_prices):
        month = date.month
        seasonal_factor = seasonal_factors.get(month, 1.0)
        pred_prices.append(price * seasonal_factor)
    
    return pred_prices

# Route to get raw data
@app.route('/raw_data', methods=['GET'])
def get_raw_data():
    return data.to_json(orient='records')

# Route to filter data
@app.route('/filtered_data', methods=['POST'])
def filter_data():
    req_data = request.get_json()
    logging.debug(f"Received request for filtering data: {req_data}")
    option = req_data['option']
    selected_district = req_data['selected_district']
    selected_market = req_data['selected_market']

    # Filter based on selected commodity, district, and market
    filtered_df = data[(data['commodity'] == option) & (data['district'] == selected_district) & (data['market'] == selected_market)]

    return filtered_df.to_json(orient='records')

# Route to forecast prices
@app.route('/forecast', methods=['POST'])
def forecast_prices():
    req_data = request.get_json()
    logging.debug(f"Received request for forecasting: {req_data}")

    try:
        option = req_data['option']
        selected_district = req_data['selected_district']
        selected_market = req_data['selected_market']
        num_months_forecast = req_data['num_months_forecast']

        historical_data = data[(data['commodity'] == option) & (data['district'] == selected_district) & (data['market'] == selected_market)]

        if historical_data.empty:
            return jsonify({"error": "No historical data available for the given filters."}), 400

        # Merge weather data with historical data
        bt_weather_data_filtered = bt_weather_data[(pd.to_datetime(bt_weather_data['date']).dt.year >= 2010)]
        merged_data = pd.merge(historical_data, bt_weather_data_filtered[['date', 'rainfall', 'temp']], on='date', how='left')
        merged_data.fillna(method='bfill', inplace=True)
        merged_data.fillna(method='ffill', inplace=True)

        scaler = MinMaxScaler()
        try:
            seq_length = 30
            sequences, targets, scaler = prepare_data_for_lstm(merged_data, seq_length)
        except ValueError as e:
            return jsonify({"error": str(e)}), 400

        X_train, X_test, y_train, y_test = train_test_split(sequences, targets, test_size=0.2, random_state=42)

        # Evaluate the model
        y_pred = lstm_model.predict(X_test)
        mse = lstm_model.evaluate(X_test, y_test)
        mae = mean_absolute_error(y_test, y_pred)
        mape = mean_absolute_percentage_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)

        # Predict future prices on a monthly basis
        last_sequence = sequences[-1]
        predicted_prices = []
        for _ in range(num_months_forecast):
            next_price = lstm_model.predict(last_sequence[np.newaxis, :, :])[0][0]  # Extract scalar value
            predicted_prices.append(next_price)
            last_sequence = np.append(last_sequence[1:], [[next_price, 0, 0]], axis=0)

        # Inverse transform the predicted prices
        predicted_prices = scaler.inverse_transform(np.array(predicted_prices).reshape(-1, 1))

        # forecasted prices based on seasonal factors
        forecast_dates = pd.date_range(pd.to_datetime(merged_data['date']).max() + pd.DateOffset(months=1), periods=num_months_forecast, freq='MS')
        pred_prices = adjust_forecast_prices(predicted_prices.flatten(), forecast_dates)

        # Create a DataFrame for the forecasted and adjusted prices
        forecast_df = pd.DataFrame(data={'date': forecast_dates, 'predicted_price': pred_prices})

        result = {
            'forecasted_prices': forecast_df.to_dict(orient='records'),
            'mse': mse,
            'mae': mae,
            'mape': mape * 100,
            'r2': r2
        }

        return jsonify(result)
       

    except Exception as e:
        logging.error(f"Error during forecasting: {e}")
        return jsonify({"error": str(e)}), 400

# Route to plot historical data graph
@app.route('/historical_data_plot', methods=['POST'])
def plot_historical_data():
    req_data = request.get_json()
    logging.debug(f"Received request for plotting historical data: {req_data}")

    try:
        option = req_data['option']
        selected_district = req_data['selected_district']
        selected_market = req_data['selected_market']
        start_date_str = req_data['start_date']
        end_date_str = req_data['end_date']

        # Convert start_date and end_date to datetime.date
        start_date = datetime.datetime.strptime(start_date_str, '%Y-%m-%d').date()
        end_date = datetime.datetime.strptime(end_date_str, '%Y-%m-%d').date()

        # Filter historical data based on the provided parameters
        historical_data = data[(data['commodity'] == option) &
                               (data['district'] == selected_district) &
                               (data['market'] == selected_market) &
                               (pd.to_datetime(data['date'], errors='coerce').dt.date >= start_date) &
                               (pd.to_datetime(data['date'], errors='coerce').dt.date <= end_date)]

        if historical_data.empty:
            return jsonify({"error": "No historical data available for the given filters and date range."}), 400

        historical_data = historical_data[['date', 'price']]
        historical_data['date'] = pd.to_datetime(historical_data['date'])
        historical_data.sort_values(by='date', inplace=True)

        # Convert to JSON
        result = historical_data.to_json(orient='records', date_format='iso')
        return result

    except Exception as e:
        logging.error(f"Error during plotting historical data: {e}")
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
