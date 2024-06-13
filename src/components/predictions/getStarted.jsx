// src/components/predictions/GetStarted.js
import './getStarted.css';
import Sidebar from '../sidebar/Sidebar';
import React, { useState } from 'react';
import axios from 'axios';

const GetStarted = () => {
  const [forecastData, setForecastData] = useState(null);
  const [formData, setFormData] = useState({
    cropType: '',
    market: '',
    district: '',
    date: '',
    days: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { cropType, market, district, date, days } = formData;

    try {
      const response = await axios.post('http://127.0.0.1:5000/forecast', {
        option: cropType,
        selected_district: district,
        selected_market: market,
        num_days_forecast: days,
        date: date
      });

      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="contentt p-4">
        <h2>Get Started</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cropType">Crop Type</label>
            <input type="text" className="form-control" id="cropType" name="cropType" value={formData.cropType} onChange={handleChange} placeholder="Enter crop type" />
          </div>
          <div className="form-group">
            <label htmlFor="market">Market</label>
            <input type="text" className="form-control" id="market" name="market" value={formData.market} onChange={handleChange} placeholder="Enter market" />
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <input type="text" className="form-control" id="district" name="district" value={formData.district} onChange={handleChange} placeholder="Enter district" />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="days">Number of Days to Forecast</label>
            <input type="number" className="form-control" id="days" name="days" value={formData.days} onChange={handleChange} placeholder="Enter number of days" />
          </div>
          <button type="submit" className="btn btn-primary">Forecast</button>
        </form>
        {forecastData && (
          <div className="preview-box">
            <p>Forecasted Data:</p>
            <pre>{JSON.stringify(forecastData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStarted;