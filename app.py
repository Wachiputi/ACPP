import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_percentage_error
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.metrics import r2_score
from sklearn.preprocessing import MinMaxScaler
import datetime
from pathlib import Path

# Set title and sidebar info
st.title('Agricultural Commodity Price Projection')
st.sidebar.info('Welcome to the Agricultural Commodity Price Projection App. Choose your options below')

# Sidebar options
option = st.sidebar.selectbox('Select Crop', ['Maize (new harvest)', 'Beans'])
start_date = st.sidebar.date_input('Start Date', value=datetime.date(2016, 1, 1))
num_days_forecast = st.sidebar.number_input('Number of days to forecast', value=180, min_value=1, max_value=365, step=1)

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

# Define the path to the CSV file
DATA_PATH = Path.cwd() / 'data' / 'wfp_food_prices_mwi.csv'
WEATHER_DATA_PATH = Path.cwd() /'data'/'boston_weather_data.csv'

# Read the data from the CSV file
data = pd.read_csv(DATA_PATH)

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

# Filter data based on the date, commodity, district, and market
# Converting the date column to datetime format
ft_data['date'] = pd.to_datetime(ft_data['date'])

# Defining the date range
start_dates = start_date.strftime('%Y-%m-%d')
end_dates = (datetime.date.today() + datetime.timedelta(days=num_days_forecast)).strftime('%Y-%m-%d')

# Filtering the data for the date range, commodity, district, and market
filtered_df = ft_data[(ft_data['date'] >= start_dates) & (ft_data['date'] <= end_dates)]
filtered_df = filtered_df[(filtered_df['commodity'] == option) & (filtered_df['district'] == selected_district) & (filtered_df['market'] == selected_market)]

# Display the fully filtered data
st.subheader('Filtered Data only left with required columns')
st.write(filtered_df)

# Generate trend graph for the fully filtered data
if not filtered_df.empty:
    fig = px.line(filtered_df, x='date', y='price', title='Historical Prices Trend', labels={'price': 'Price', 'date': 'Date'})
    st.plotly_chart(fig)

# Read the weather data from the CSV file
weather_data = pd.read_csv(WEATHER_DATA_PATH)

# Display the raw weather data using Streamlit
st.subheader("Raw Weather Data")
st.write(weather_data)

# Display the columns of the weather data to check for the correct date column name
st.subheader("Weather Data Columns")
st.write(weather_data.columns)

# Ensure the 'date' column is in datetime format
if 'date' not in weather_data.columns:
    st.error("The weather data does not contain a 'date' column.")
else:
    weather_data['date'] = pd.to_datetime(weather_data['date'])

    # Plot Rainfall
    fig_rainfall = px.line(weather_data, x='date', y='rainfal', title='Rainfall Over Time', labels={'rainfal': 'Rainfall', 'date': 'Date'})
    st.plotly_chart(fig_rainfall)

    # Plot Maximum Temperature
    fig_max_temp = px.line(weather_data, x='date', y='maximum temperature', title='Maximum Temperature Over Time', labels={'maximum temperature': 'Maximum Temperature', 'date': 'Date'})
    st.plotly_chart(fig_max_temp)

    # Plot Average Air Temperature
    fig_avg_temp = px.line(weather_data, x='date', y='average air temp', title='Average Air Temperature Over Time', labels={'average air temp': 'Average Air Temperature', 'date': 'Date'})
    st.plotly_chart(fig_avg_temp)

if forecast_button:
    # Prepare the data for LSTM
    def prepare_data_for_lstm(data, scaler, seq_length=10):
        # Convert price column to array
        prices = data['price'].values

        # Normalize prices using the provided scaler
        prices_normalized = scaler.fit_transform(prices.reshape(-1, 1))

        # Create sequences and corresponding targets
        sequences = []
        targets = []
        for i in range(len(prices_normalized) - seq_length):
            sequences.append(prices_normalized[i:i+seq_length])
            targets.append(prices_normalized[i+seq_length])

        return np.array(sequences), np.array(targets), scaler

    # Create a scaler object
    scaler = MinMaxScaler()

    # Prepare data for LSTM
    X, y, scaler = prepare_data_for_lstm(filtered_df, scaler)

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Define the LSTM model
    model = Sequential([
        LSTM(50, input_shape=(X_train.shape[1], X_train.shape[2])),
        Dense(1)
    ])

    # Compile the model
    model.compile(optimizer='adam', loss='mse')

    # Train the model
    model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_test, y_test))

    # Save the model
    model.save("lstm_model.h5")

    # Evaluate the model
    mse = model.evaluate(X_test, y_test)
    st.write(f'Mean Squared Error: {mse}')

    # Calculate R2 score
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    st.write(f'R2 Score: {r2}')

    mape = mean_absolute_percentage_error(y_test, y_pred)
    st.write(f'Mean Absolute Percentage Error (MAPE): {mape * 100:.2f}%')

    # Forecasting for the specified number of days
    last_sequence = X_test[-1]
    forecast_prices_normalized = []
    for _ in range(num_days_forecast):
        next_price = model.predict(last_sequence[np.newaxis, :, :])
        forecast_prices_normalized.append(next_price)
        last_sequence = np.append(last_sequence[1:], next_price, axis=0)

    # Inverse transform the forecasted prices
    forecast_prices = scaler.inverse_transform(np.array(forecast_prices_normalized).reshape(-1, 1))

    # Generate dates for the forecasted prices
    forecast_dates = [datetime.date.today() + datetime.timedelta(days=i) for i in range(num_days_forecast)]

    # Display the predicted prices in a table
    st.write("Predicted Prices for the next period:")
    predicted_prices_df = pd.DataFrame(forecast_prices, index=forecast_dates, columns=["Price"])
    st.write(predicted_prices_df)

    # Plot forecasted prices using a line plot
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=forecast_dates, y=forecast_prices.flatten(), mode='lines+markers', name='Forecasted Prices'))
    fig.update_layout(title='Forecasted Prices', xaxis_title='Date', yaxis_title='Price')
    st.plotly_chart(fig)
