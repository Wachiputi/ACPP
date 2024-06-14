// Filename - pages/Support.js

import React from 'react';

const Support = () => {
  return (
    <div className="support-container">
      <h1 className="support-title">Support</h1>
      <p className="support-description">
        If you have any questions or need assistance, please contact our support team.
      </p>
      <form className="support-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Support;