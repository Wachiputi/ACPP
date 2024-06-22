import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_percentage_error, r2_score
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
from pathlib import Path

# Set title and sidebar info
st.title('Agricultural Commodity Price Projection')
st.sidebar.info('Welcome to the Agricultural Commodity Price Projection App. Choose your options below')

# Sidebar options
option = st.sidebar.selectbox('Select Crop', ['Maize (new harvest)', 'Beans', 'Maize'])
num_months_forecast = st.sidebar.number_input('Number of months to forecast', value=6, min_value=1, max_value=12, step=1)
selected_district = st.sidebar.selectbox('Select District', ['Dedza', 'Mzimba', 'Blantyre', 'Ntcheu', 'Dowa'])

# Filter markets based on selected district
if selected_district == 'Dedza':
    markets = ['Nsikawanjala', 'Ntakataka']
elif selected_district == 'Mzimba':
    markets = ['Jenda']
elif selected_district == 'Blantyre':
    markets = ['Lunzu']
elif selected_district == 'Ntcheu':
    markets = ['Chimbiya', 'Golomoti', 'Ntcheu Boma']
elif selected_district == 'Dowa':
    markets = ['Nsungwi', 'Mponela']

selected_market = st.sidebar.selectbox('Select Market', markets)
forecast_button = st.sidebar.button('Predict')

# Define the path to the CSV files
DATA_PATH = Path.cwd() / 'data' / 'bt_food_pricesup.csv'
BT_WEATHER_DATA_PATH = Path.cwd() / 'data' / 'bt_weather_data1.csv'
MAIZE_HARVEST_DATA_PATH = Path.cwd() / 'data' / 'bt_maize_harvest.csv'

# Read the data from the CSV files
data = pd.read_csv(DATA_PATH)
bt_weather_data = pd.read_csv(BT_WEATHER_DATA_PATH)
bt_maize_data = pd.read_csv(MAIZE_HARVEST_DATA_PATH)

# Display the raw data using Streamlit
st.subheader("Raw WFP Data")
st.write(data)

# Remove null values by replacing with bfill
ft_data = data.fillna(method='bfill', inplace=False)
ft_data.isnull().sum()

# Display the filtered data after filling null values
st.subheader("Filtered WFP Data (Nulls Filled)")
st.write(ft_data)

# Drop the specified columns
columns_to_drop = ['usdprice', 'latitude', 'longitude', 'category', 'unit', 'priceflag', 'currency', 'pricetype']
ft_data.drop(columns=columns_to_drop, inplace=True)
ft_data.drop(index=0, inplace=True)

# Display the data after dropping columns
st.subheader('Filtered Data After Dropping Irrelevant Columns')
st.write(ft_data)

# Filter based on selected start year and month
start_year = 2010
start_month = 1
ft_data = ft_data[(pd.to_datetime(ft_data['date']).dt.year >= start_year) & (pd.to_datetime(ft_data['date']).dt.month >= start_month)]

# Filtering the data for the commodity, district, and market
filtered_df = ft_data[(ft_data['commodity'] == option) & (ft_data['district'] == selected_district) & (ft_data['market'] == selected_market)]

# Display the fully filtered data
st.write(f"Number of rows: {filtered_df.shape[0]}")
st.subheader('Filtered Data')
st.write(filtered_df)

# Generate trend graph for the fully filtered data
if not filtered_df.empty:
    fig_prices = go.Figure()
    fig_prices.add_trace(go.Scatter(x=filtered_df['date'], y=filtered_df['price'], mode='lines+markers', name='Historical Prices'))
    fig_prices.update_layout(title='Historical Prices Trend',
                             xaxis_title='Date',
                             yaxis_title='Price')
    st.plotly_chart(fig_prices)

# Display the weather data
st.write(f"Number of rows: {bt_weather_data.shape[0]}")
st.subheader('Weather Data')
st.write(bt_weather_data)

# Set start date for weather data from 2010 to 2024
bt_weather_data_filtered = bt_weather_data[(pd.to_datetime(bt_weather_data['date']).dt.year >= 2010) & (pd.to_datetime(bt_weather_data['date']).dt.year <= 2024)]

# Ensure the necessary columns are present for weather data
required_columns_weather = {'date', 'rainfall', 'temp'}
if not required_columns_weather.issubset(bt_weather_data.columns):
    st.error(f"The Blantyre weather data must contain the following columns: {required_columns_weather}")
else:
    # Plot rainfall data
    fig_rainfall = go.Figure()
    fig_rainfall.add_trace(go.Scatter(x=bt_weather_data_filtered['date'], y=bt_weather_data_filtered['rainfall'], mode='lines+markers', name='Rainfall'))
    fig_rainfall.update_layout(title='Monthly Rainfall Over the Years in Blantyre',
                               xaxis_title='Month-Year',
                               yaxis_title='Rainfall (mm)',
                               xaxis=dict(tickmode='linear'))
    st.plotly_chart(fig_rainfall)

    # Plot temperature data
    fig_temp = go.Figure()
    fig_temp.add_trace(go.Scatter(x=bt_weather_data_filtered['date'], y=bt_weather_data_filtered['temp'], mode='lines+markers', name='Temperature'))
    fig_temp.update_layout(title='Monthly Temperature Over the Years in Blantyre',
                          xaxis_title='Month-Year',
                          yaxis_title='Temperature (°C)',
                          xaxis=dict(tickmode='linear'))
    st.plotly_chart(fig_temp)

# Display the raw Blantyre maize harvest data using Streamlit
st.subheader("Blantyre Maize Harvest Data")
st.write(bt_maize_data)

# Ensure the necessary columns are present for maize harvest data
required_columns_harvest = {'year', 'area(ha)', 'production(tons)', 'yield(t/ha)', 'bt_area(ha)', 'bt_production(tons)', 'bt_yield(t/ha)'}
if not required_columns_harvest.issubset(bt_maize_data.columns):
    st.error(f"The Blantyre maize harvest data must contain the following columns: {required_columns_harvest}")
else:
    # Plot Blantyre maize harvest data
    fig_harvest = go.Figure()
    fig_harvest.add_trace(go.Scatter(x=bt_maize_data['year'], y=bt_maize_data['bt_area(ha)'], mode='lines+markers', name='Blantyre Area Harvested (ha)'))
    fig_harvest.add_trace(go.Scatter(x=bt_maize_data['year'], y=bt_maize_data['bt_production(tons)'], mode='lines+markers', name='Blantyre Production (tons)'))
    fig_harvest.add_trace(go.Scatter(x=bt_maize_data['year'], y=bt_maize_data['bt_yield(t/ha)'], mode='lines+markers', name='Blantyre Yield (t/ha)'))
    fig_harvest.update_layout(title='Blantyre Maize Harvest Data',
                              xaxis_title='Year',
                              yaxis_title='Value',
                              xaxis=dict(tickmode='linear'))
    st.plotly_chart(fig_harvest)

# Merge datasets
def merge_datasets(filtered_df, bt_weather_data_filtered):
    # Merge weather data with filtered_df
    merged_data = pd.merge(filtered_df, bt_weather_data_filtered[['date', 'rainfall', 'temp']], on='date', how='left')

    # Fill any remaining NaNs with bfill or ffill
    merged_data.fillna(method='bfill', inplace=True)
    merged_data.fillna(method='ffill', inplace=True)

    return merged_data

# Function to adjust forecasted prices based on seasonal trends
def adjust_forecast_prices(forecast_prices, forecast_dates):
    seasonal_factors = {
        1: 1.3, 2: 1.2, 3: 1.1, 4: 1.0, 5: 1.0, 6: 1.0, 7: 1.0, 8: 1.3, 9: 1.3, 10: 1.4, 11: 1.3, 12: 1.3
    }
    
    adjusted_prices = []
    for date, price in zip(forecast_dates, forecast_prices):
        month = date.month
        seasonal_factor = seasonal_factors.get(month, 1.0)
        adjusted_prices.append(price * seasonal_factor)
    
    return adjusted_prices

# LSTM model preparation and prediction
def prepare_data_for_lstm(data, seq_length=36):
    # Convert necessary columns to array
    prices = data['price'].values.reshape(-1, 1)
    rainfall = data['rainfall'].values.reshape(-1, 1)
    temp = data['temp'].values.reshape(-1, 1)

    # Normalize prices, rainfall, and temp
    scaler_price = MinMaxScaler()
    scaler_rainfall = MinMaxScaler()
    scaler_temp = MinMaxScaler()

    prices_normalized = scaler_price.fit_transform(prices)
    rainfall_normalized = scaler_rainfall.fit_transform(rainfall)
    temp_normalized = scaler_temp.fit_transform(temp)

    # Combine the normalized features into one array
    combined_features = np.concatenate((prices_normalized, rainfall_normalized, temp_normalized), axis=1)

    # Create sequences and corresponding targets
    sequences = []
    targets = []
    for i in range(len(combined_features) - seq_length):
        sequences.append(combined_features[i:i+seq_length])
        targets.append(prices_normalized[i+seq_length])  # Append the next single price value

    return np.array(sequences), np.array(targets), scaler_price

# Predict and adjust prices
if forecast_button:
    merged_data = merge_datasets(filtered_df, bt_weather_data_filtered)
    if merged_data.empty:
        st.warning('No data available for the selected filters. Please adjust your selection.')
    else:
        seq_length = 30  # Set appropriate sequence length
        sequences, targets, scaler = prepare_data_for_lstm(merged_data, seq_length)
        
        X_train, X_test, y_train, y_test = train_test_split(sequences, targets, test_size=0.2, random_state=42)

        # Define the LSTM model
        model = Sequential([
            LSTM(50, input_shape=(seq_length, X_train.shape[2]), return_sequences=True),
            LSTM(50),
            Dense(1)
        ])

        # Compile the model
        model.compile(optimizer='adam', loss='mse')

        # Train the model
        model.fit(X_train, y_train, epochs=100, batch_size=32, validation_data=(X_test, y_test))

        # Save the model
        model.save("lstm_model.h5")

        # Evaluate the model
        mse = model.evaluate(X_test, y_test)
        st.write(f'Mean Squared Error: {mse}')

        # Calculate R2 score and MAPE
        y_pred = model.predict(X_test)
        y_test_inv = scaler.inverse_transform(y_test.reshape(-1, 1))
        y_pred_inv = scaler.inverse_transform(y_pred)

        r2 = r2_score(y_test_inv, y_pred_inv)
        mape = mean_absolute_percentage_error(y_test_inv, y_pred_inv)
        st.write(f'R2 Score: {r2}')
        st.write(f'Mean Absolute Percentage Error: {mape}')

        # Predict future prices on a monthly basis
        last_sequence = sequences[-1]
        predicted_prices = []
        for _ in range(num_months_forecast):
            next_price = model.predict(last_sequence[np.newaxis, :, :])[0][0]  # Extract scalar value
            predicted_prices.append(next_price)
            last_sequence = np.append(last_sequence[1:], [[next_price, 0, 0]], axis=0)

        # Inverse transform the predicted prices
        predicted_prices = scaler.inverse_transform(np.array(predicted_prices).reshape(-1, 1))

        # Adjust forecasted prices based on seasonal factors
        forecast_dates = pd.date_range(pd.to_datetime(merged_data['date']).max() + pd.DateOffset(months=1), periods=num_months_forecast, freq='MS')
        adjusted_prices = adjust_forecast_prices(predicted_prices.flatten(), forecast_dates)

        # Create a DataFrame for the forecasted and adjusted prices
        forecast_df = pd.DataFrame(data={'date': forecast_dates, 'predicted_price': adjusted_prices})

        # Plot the forecasted and adjusted prices
        fig_forecast = go.Figure()
        fig_forecast.add_trace(go.Scatter(x=merged_data['date'], y=merged_data['price'], mode='lines+markers', name='Historical Prices'))
        fig_forecast.add_trace(go.Scatter(x=forecast_df['date'], y=forecast_df['predicted_price'], mode='lines+markers', name='Forecasted Prices (Adjusted)'))

        fig_forecast.update_layout(title='Price Forecast',
                                   xaxis_title='Date',
                                   yaxis_title='Price')
        st.plotly_chart(fig_forecast)
