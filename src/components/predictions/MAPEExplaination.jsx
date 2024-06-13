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
          The Mean Absolute Percentage Error (MAPE) of {mape.toFixed(2)}% shows that our predictions are reasonably accurate,
          generally within 20% of the actual prices. This provides a good basis for planning and decision-making.
        </p>
      );
    } else {
      return (
        <p>
          The Mean Absolute Percentage Error (MAPE) of {mape.toFixed(2)}% indicates that while our predictions have some margin of error,
          they still provide valuable insights for your planning and decision-making process.
        </p>
      );
    }
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'left' }}>
        
      <h2> <i className="bi bi-exclamation-triangle-fill" />  Disclaimer </h2>
      {explanation()}
    </div>
  );
}

export default MAPEExplanation;
