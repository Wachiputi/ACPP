import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_percentage_error, mean_absolute_error, r2_score
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
import datetime
from tensorflow.keras.callbacks import EarlyStopping
from pathlib import Path

# Set title and sidebar info
st.title('Agricultural Commodity Price Projection')
st.sidebar.info('Welcome to the Agricultural Commodity Price Projection App. Choose your options below')

# Sidebar options
option = st.sidebar.selectbox('Select Crop', ['Maize (new harvest)', 'Beans'])
start_date = st.sidebar.date_input('Start Date', value=datetime.date(2016, 1, 1))
num_days_forecast = st.sidebar.number_input('Number of days to forecast', value=180, min_value=1, max_value=365, step=1)

selected_district = st.sidebar.selectbox('Select District', ['Dedza', 'Mzimba', 'Blantyre', 'Ntcheu', 'Dowa', 'Zomba'])

# Filter markets based on selected district
markets_dict = {
    'Dedza': ['Ntakataka'],
    'Mzimba': ['Jenda'],
    'Blantyre': ['Lunzu'],
    'Ntcheu': ['Chimbiya', 'Golomoti', 'Ntcheu Boma'],
    'Dowa': ['Nsungwi', 'Mponela'],
    'Zomba': ['Thondwe', 'Jali', 'Chinamwali', 'Songani', 'Mulomba', 'Mayaka']
}
selected_market = st.sidebar.selectbox('Select Market', markets_dict[selected_district])
forecast_button = st.sidebar.button('Predict')

# Define the path to the CSV file
DATA_PATH = Path.cwd() / 'data' / 'wfp_food_prices_mwi.csv'

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

if forecast_button:
    # Further filter data to include only the historical prices for the selected market
    historical_data = ft_data[(ft_data['commodity'] == option) & (ft_data['district'] == selected_district) & (ft_data['market'] == selected_market)]
    
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
    X, y, scaler = prepare_data_for_lstm(historical_data, scaler)

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Increase model complexity
    model = Sequential([
        LSTM(100, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])),
        LSTM(100),
        Dense(1)
    ])

    # Increase training duration and use early stopping
    early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

    # Hyperparameter tuning
    learning_rate = 0.001
    optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)

    # Compile the model with the specified optimizer
    model.compile(optimizer=optimizer, loss='mse')

    # Train the model with early stopping
    history = model.fit(X_train, y_train, epochs=100, batch_size=32, validation_data=(X_test, y_test), callbacks=[early_stopping])

    # Evaluate the model
    mse = model.evaluate(X_test, y_test)
    st.write(f'Mean Squared Error: {mse}')

    # Calculate R2 score
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    st.write(f'R2 Score: {r2}')

    mae = mean_absolute_error(y_test, y_pred)
    st.write(f'Mean Absolute Error (MAE): {mae}')

    mape = mean_absolute_percentage_error(y_test, y_pred)
    st.write(f'Mean Absolute Percentage Error (MAPE): {mape * 100:.2f}%')

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

    # Display the predicted prices in a table
    st.write("Predicted Prices for the next period:")
    predicted_prices_df = pd.DataFrame(extended_forecast_prices, index=forecast_dates, columns=["Price"])
    st.write(predicted_prices_df)

    # Plot forecasted prices using a line plot
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=forecast_dates, y=extended_forecast_prices, mode='lines+markers', name='Forecasted Prices'))
    fig.update_layout(title='Forecasted Prices', xaxis_title='Date', yaxis_title='Price per kg')
    st.plotly_chart(fig)
