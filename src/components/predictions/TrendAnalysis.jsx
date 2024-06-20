import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ThreeDots } from 'react-loader-spinner';
import './trendAnalysis.css'; // Updated CSS import

import Footer from '../footer/Footer.jsx';

function TrendAnalysis() {
  const [option, setOption] = useState('Maize (new harvest)');
  const [selectedDistrict, setSelectedDistrict] = useState('Blantyre');
  const [selectedMarket, setSelectedMarket] = useState('Lunzu');
  const [startDate, setStartDate] = useState(new Date('2016-01-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [plotData, setPlotData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      option,
      selected_district: selectedDistrict,
      selected_market: selectedMarket,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0]
    };

    try {
      // const response = await axios.post('http://localhost:5000/historical_data_plot', requestData);
      const response = await axios.post('https://yieldwize.onrender.com/historical_data_plot', requestData);
      const historical_data = response.data;

      if (!historical_data || historical_data.length === 0) {
        throw new Error("No historical data available for the selected filters.");
      }

      const plotData = {
        x: historical_data.map(item => new Date(item.date)),
        y: historical_data.map(item => item.price),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'green' },
        name: 'Price'
      };

      setPlotData([plotData]);
    } catch (error) {
      console.error("Error fetching historical data:", error);
      setPlotData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedMarket(marketsDict[district][0]); // Reset selected market based on district change
  };

  const marketsDict = {
    'Blantyre': ['Lunzu']
  };

  return (
    <div className="trend-analysis-page">
      <header className="trend-analysis-header">
        <h1 className="trend-analysis-title">Historical Price Trend Analysis</h1>
      </header>
      <div className="trend-analysis-content">
        <div className="trend-analysis-sidebar">
          <form className="trend-analysis-form" onSubmit={handleSubmit}>
            <div className="trend-analysis-form-section">
              <label className="trend-analysis-form-label">Select Commodity:</label>
              <select value={option} onChange={(e) => setOption(e.target.value)} className="trend-analysis-form-input">
                <option value="Maize (new harvest)">Maize (new harvest)</option>
               
              </select>
            </div>
            <div className="trend-analysis-form-section">
              <label className="trend-analysis-form-label">Select District:</label>
              <select value={selectedDistrict} onChange={handleDistrictChange} className="trend-analysis-form-input">
                {Object.keys(marketsDict).map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            <div className="trend-analysis-form-section">
              <label className="trend-analysis-form-label">Select Market:</label>
              <select value={selectedMarket} onChange={(e) => setSelectedMarket(e.target.value)} className="trend-analysis-form-input">
                {marketsDict[selectedDistrict].map((market) => (
                  <option key={market} value={market}>{market}</option>
                ))}
              </select>
            </div>
            <div className="trend-analysis-form-section">
              <label className="trend-analysis-form-label">Start Date:</label>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="trend-analysis-form-input" />
            </div>
            <div className="trend-analysis-form-section">
              <label className="trend-analysis-form-label">End Date:</label>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="trend-analysis-form-input" />
            </div>
            <button type="submit" className="trend-analysis-form-button">Analyze</button>
          </form>
        </div>
        <div className="trend-analysis-results">
          {loading ? (
            <div className="loading-spinner">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </div>
          ) : (
            plotData && (
              <div className="trend-analysis-results-chart">
                <h2 className="trend-analysis-title">Historical Prices Trend</h2>
                <Plot
                  data={plotData}
                  layout={{ width: 800, height: 400, title: 'Historical Prices Trend', xaxis: { title: 'Date' }, yaxis: { title: 'Price' } }}
                />
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TrendAnalysis;
