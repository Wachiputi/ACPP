import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import 'react-datepicker/dist/react-datepicker.css';
import { ThreeDots } from 'react-loader-spinner';
import './predictions.css';
import MAPEExplanation from './MAPEExplaination';
import Footer from '../footer/Footer';

function Predictions() {
  const [option, setOption] = useState('Maize (new harvest)');
  const [selectedDistrict, setSelectedDistrict] = useState('Blantyre');
  const [selectedMarket, setSelectedMarket] = useState('Lunzu');
  const [numMonthsForecast, setNumMonthsForecast] = useState(6);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);

  const marketsDict = {
    'Blantyre': ['Lunzu']
    // 'Dedza': ['Ntakataka'],
    // 'Mzimba': ['Jenda'],
    // 'Ntcheu': ['Chimbiya', 'Golomoti', 'Ntcheu Boma'],
    // 'Dowa': ['Nsungwi', 'Mponela'],
    // 'Zomba': ['Thondwe', 'Jali', 'Chinamwali', 'Songani', 'Mulomba', 'Mayaka']
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestData = {
      option,
      selected_district: selectedDistrict,
      selected_market: selectedMarket,
      num_months_forecast: numMonthsForecast,
      start_date: '2010-01-15'  // Pre-set start date
    };

    try {
      // const response = await axios.post('http://localhost:5000/forecast', requestData);
      const response = await axios.post('https://yieldwize.onrender.com/forecast', requestData);
      setForecastData(response.data);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className="predictions-page">
        <header className="predictions-header">
          <h1 className="predictions-title">Agricultural Commodity Price Projection</h1>
        </header>
        <div className="predictions-content">
          <div className="predictions-sidebar">
            <form className="predictions-form" onSubmit={handleSubmit}>
              <div className="predictions-form-section">
                <label className="predictions-form-label">Select Commodity:</label>
                <select value={option} onChange={(e) => setOption(e.target.value)} className="predictions-form-input">
                  <option value="Maize (new harvest)">Maize (new harvest)</option>
                  {/* <option value="Beans">Beans</option>
                  <option value="Rice">Rice</option> */}
                </select>
              </div>
              <div className="predictions-form-section">
                <label className="predictions-form-label">Select District:</label>
                <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="predictions-form-input">
                  {Object.keys(marketsDict).map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              <div className="predictions-form-section">
                <label className="predictions-form-label">Select Market:</label>
                <select value={selectedMarket} onChange={(e) => setSelectedMarket(e.target.value)} className="predictions-form-input">
                  {marketsDict[selectedDistrict].map((market) => (
                    <option key={market} value={market}>{market}</option>
                  ))}
                </select>
              </div>
              <div className="predictions-form-section">
                <label className="predictions-form-label">Number of months to forecast:</label>
                <input type="number" value={numMonthsForecast} onChange={(e) => setNumMonthsForecast(parseInt(e.target.value))} min="1" max="12" step="1" className="predictions-form-input" />
              </div>
              <button type="submit" className="predictions-form-button">Predict</button>
            </form>
          </div>
          <div className="predictions-results">
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
              forecastData && (
                <div className="predictions-results-chart">
                  <h2 className="predictions-title">Forecasted Prices</h2>
                  <Plot
                    data={[
                      {
                        x: forecastData.forecasted_prices.map(item => item.date),
                        y: forecastData.forecasted_prices.map(item => item.predicted_price),
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'green' },
                      },
                    ]}
                    layout={{ title: `Forecasted Prices for  ${selectedMarket}  in the next ${numMonthsForecast} months`, xaxis: { title: 'Date' }, yaxis: { title: 'Price(MWK)/kg' } }}
                  />
                  <div className="predictions-results-info">
                    <div className="result-item"><strong>Mean Absolute Percentage Error:</strong> {forecastData.mape.toFixed(2)}%</div>
                    <MAPEExplanation forecastData={forecastData} />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Predictions;
