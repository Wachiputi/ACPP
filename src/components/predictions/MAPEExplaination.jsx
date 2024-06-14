import React from 'react';

function MAPEExplanation({ forecastData }) {
  if (!forecastData) return null;

  const { mape } = forecastData;

  const explanation = () => {
    if (mape <= 10) {
      return (
        <p>
          The Mean Absolute Percentage Error (MAPE) of {mape.toFixed(2)}% indicates that our predictions are very accurate,
          typically within 10% of the actual prices. You can use these forecasts with confidence for your planning and decision-making.
        </p>
      );
    } else if (mape <= 20) {
      return (
        <p>
          These Prices might varry from actual prices with a margin of {mape.toFixed(2)}%.
          Generally within 20% of the actual prices, This provides a good basis for planning and decision-making.
        </p>
      );
    } else {
      return (
        <p>
        These Prices might varry from actual prices with a margin of {mape.toFixed(2)}%.
        However, This provides a good basis for planning and decision-making.
      </p>
      );
    }
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'left' }}>
        
      <h2 style={{ marginTop: '20px', textAlign: 'left' ,fontSize:'30px', fontWeight:'bold', color:'orange' }}> 
        <i style={{ marginTop: '20px', textAlign: 'left' ,fontSize:'30px', fontWeight:'bold', color:'orange' }}className="bi bi-exclamation-triangle-fill" />  Disclaimer </h2>
      {explanation()}
    </div>
  );
}

export default MAPEExplanation;
