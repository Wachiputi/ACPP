import React, { useState, useEffect } from 'react';
// import './TrendAnalysis.css';

const Events = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    // Fetch trend data from an API or a data source
    fetch('/api/trends')
      .then(response => response.json())
      .then(data => setTrends(data))
      .catch(error => console.error('Error fetching trend data:', error));
  }, []);

  return (
    <div className="trend-analysis">
      <h1>Trend Analysis and Price Projection</h1>
      <section className="description">
        <p>
          Our trend analysis and price projection system provides insights into the future price
          movements of maize and beans. Utilizing historical data and market trends, we offer
          projections to help farmers, traders, and consumers make informed decisions.
        </p>
      </section>
      <section className="trends">
        {trends.length === 0 ? (
          <p>Loading trend data...</p>
        ) : (
          trends.map((trend, index) => (
            <div key={index} className="trend">
              <h3>{trend.market}</h3>
              <p>
                <strong>Product:</strong> {trend.product}<br />
                <strong>Current Price:</strong> {trend.currentPrice} MWK per kg<br />
                <strong>Projected Price (Next Month):</strong> {trend.projectedPrice} MWK per kg<br />
                <strong>Trend:</strong> {trend.trend}%
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Events;
