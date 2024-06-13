// src/components/predictions/PriceForecastChart.jsx

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios'; // Import axios for making HTTP requests

const PriceForecastChart = () => {
  const chartRef = useRef(null);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/forecast', {
          option: 'your_option_value', // Replace with actual option value
          selected_district: 'your_district_value', // Replace with actual district value
          selected_market: 'your_market_value', // Replace with actual market value
          num_days_forecast: 30 // Replace with actual number of days to forecast
        });
        setForecastData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (forecastData.length > 0 && chartRef.current) {
      const labels = forecastData.map(entry => new Date(entry.Date));
      const prices = forecastData.map(entry => entry.Price);

      const chartConfig = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Forecasted Prices',
            data: prices,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time', // Using time scale
              time: {
                unit: 'day' // Adjust time scale options as needed
              }
            },
            y: {
              title: {
                display: true,
                text: 'Price'
              }
            }
          }
        }
      };

      const myChart = new Chart(chartRef.current, chartConfig);

      return () => {
        myChart.destroy();
      };
    }
  }, [forecastData]);

  return <canvas ref={chartRef} />;
};

export default PriceForecastChart;
