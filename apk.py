from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import datetime
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error, r2_score
import tensorflow as tf
from tensorflow.keras.callbacks import EarlyStopping
from pathlib import Path
import logging
import plotly.express as px 

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Sample data path
DATA_PATH = Path.cwd() / 'data' / 'wfp_food_prices_mwi.csv'

# Read data
data = pd.read_csv(DATA_PATH)

# Clean data
#data.fillna(method='bfill', inplace=True)
data.bfill(inplace=True)  # For backward fill
# Function to prepare data for LSTM
def prepare_data_for_lstm(data, scaler, seq_length=10):
    if data.empty:
        raise ValueError("No data available to prepare for LSTM")
        
    prices = data['price'].values
    prices_normalized = scaler.fit_transform(prices.reshape(-1, 1))
    sequences = []
    targets = []
    for i in range(len(prices_normalized) - seq_length):
        sequences.append(prices_normalized[i:i+seq_length])
        targets.append(prices_normalized[i+seq_length])
    return np.array(sequences), np.array(targets), scaler

# LSTM model training
def train_lstm_model(X_train, y_train, X_test, y_test):
    model = Sequential([
        LSTM(100, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])),
        LSTM(100),
        Dense(1)
    ])
    early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
    optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)
    model.compile(optimizer=optimizer, loss='mse')
    model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_test, y_test), callbacks=[early_stopping])
    return model

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
    start_date = req_data['start_date']
    num_days_forecast = req_data['num_days_forecast']

    # Convert start_date to datetime if needed
    start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()

    # Calculate end date based on num_days_forecast
    end_date = start_date + datetime.timedelta(days=num_days_forecast)

    filtered_df = data[(data['date'] >= start_date) & (data['date'] <= end_date) &
                       (data['commodity'] == option) & (data['district'] == selected_district) &
                       (data['market'] == selected_market)]

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
        num_days_forecast = req_data['num_days_forecast']
        start_date = req_data['start_date']

        # Convert start_date to datetime if needed
        start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()

        historical_data = data[(data['commodity'] == option) & (data['district'] == selected_district) & (data['market'] == selected_market)]

        if historical_data.empty:
            return jsonify({"error": "No historical data available for the given filters."}), 400

        scaler = MinMaxScaler()
        try:
            X, y, scaler = prepare_data_for_lstm(historical_data, scaler)
        except ValueError as e:
            return jsonify({"error": str(e)}), 400

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = train_lstm_model(X_train, y_train, X_test, y_test)

        # Evaluate the model
        y_pred = model.predict(X_test)
        mse = model.evaluate(X_test, y_test)
        mae = mean_absolute_error(y_test, y_pred)
        mape = mean_absolute_percentage_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)

        # Forecasting for the specified number of days (initially 25 days)
        forecast_days = min(25, num_days_forecast)
        last_sequence = X_test[-1]
        forecast_prices_normalized = []
        for _ in range(forecast_days):
            next_price = model.predict(last_sequence[np.newaxis, :, :])
            forecast_prices_normalized.append(next_price)
            last_sequence = np.append(last_sequence[1:], next_price, axis=0)

        # Inverse transform the forecasted prices
        forecast_prices = scaler.inverse_transform(np.array(forecast_prices_normalized).reshape(-1, 1))

        # Extend forecast prices to the desired number of forecast days using interpolation
        extended_forecast_prices = np.interp(
            np.arange(num_days_forecast),
            np.linspace(0, num_days_forecast, forecast_days),
            forecast_prices.flatten()
        )

        # Generate dates for the forecasted prices
        forecast_dates = [datetime.date.today() + datetime.timedelta(days=i) for i in range(num_days_forecast)]

        # Prepare the forecasted prices DataFrame
        forecasted_prices_df = pd.DataFrame({'Date': forecast_dates, 'Price': extended_forecast_prices})

        result = {
            'forecasted_prices': forecasted_prices_df.to_dict(orient='records'),
            'mse': mse,
            'mae': mae,
            'mape': mape * 100,
            'r2': r2
        }

        return jsonify(result)

    except Exception as e:
        logging.error(f"Error during forecasting: {e}")
        return jsonify({"error": str(e)}), 400
# Route to plot historical data
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
            return jsonify({"error": "No historical data available for the given filters."}), 400

        # Prepare JSON response
        response_data = {
            "historical_data": historical_data.to_dict(orient='records'),
            "message": "Historical data retrieved successfully."
        }

        return jsonify(response_data), 200

    except Exception as e:
        logging.error(f"Error during plotting historical data: {e}")
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
