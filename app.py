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
import statsmodels.api as sm
from prophet import Prophet

# Set title and sidebar info
st.title('Agricultural Commodity Price Projection')
st.sidebar.info('Welcome to the Agricultural Commodity Price Projection App. Choose your options below')

# Sidebar options
option = st.sidebar.selectbox('Select Crop', ['Maize (new harvest)', 'Beans'])
start_date = st.sidebar.date_input('Start Date', value=datetime.date(2016, 1, 1))
num_days_forecast = st.sidebar.number_input('Number of days to forecast', value=100, min_value=1, max_value=365, step=1)

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
model_choice = st.sidebar.selectbox('Select Model', ['LSTM', 'ARIMA', 'Prophet'])
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

