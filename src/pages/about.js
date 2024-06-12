// pages/about.js
 
import React from "react";
 
export const About = () => {
		return (
			<div className="about-us">
			<h1>About Us</h1>
			<section className="overview">
			  <h2>Overview</h2>
			  <p>
				Welcome to our Price Prediction Model application. We specialize in forecasting future prices of maize and beans
				in the specific markets of Mzimba, Blantyre, Ntcheu, and Dedza. Our application leverages advanced machine learning
				techniques to provide accurate and reliable predictions, helping farmers, traders, and policymakers make informed decisions.
			  </p>
			</section>
	  
			<section className="features">
			  <h2>Features</h2>
			  <ul>
				<li>Interactive User Interface: Experience a seamless and responsive UI built with React.</li>
				<li>Real-time Predictions: Input relevant data to get instant price forecasts.</li>
				<li>Historical Data Visualization: Analyze historical trends with our interactive charts.</li>
				<li>Customizable Parameters: Adjust model parameters to see their impact on predictions.</li>
				<li>Export Functionality: Download prediction results for further analysis.</li>
			  </ul>
			</section>
	  
			<section className="technology">
			  <h2>Technology Stack</h2>
			  <ul>
				<li>React: Provides a dynamic and responsive front-end experience.</li>
				<li>Machine Learning Model: Utilizes advanced algorithms for high accuracy.</li>
				<li>API Integration: Ensures efficient communication between front-end and back-end.</li>
				<li>Chart.js: Used for creating interactive data visualizations.</li>
			  </ul>
			</section>
	  
			<section className="how-it-works">
			  <h2>How It Works</h2>
			  <ol>
				<li>Input Data: Enter data points like historical prices and relevant variables.</li>
				<li>Run Prediction: Click 'Predict' to get future price forecasts.</li>
				<li>View Results: Analyze the predicted prices and historical trends.</li>
				<li>Adjust Parameters: Modify model parameters and observe changes in predictions.</li>
				<li>Export Data: Download results in CSV format for further use.</li>
			  </ol>
			</section>
	  
			<section className="markets">
			  <h2>Specified Markets</h2>
			  <p>Our model focuses on the following markets:</p>
			  <ul>
				<li>Mzimba</li>
				<li>Blantyre</li>
				<li>Ntcheu</li>
				<li>Dedza</li>
			  </ul>
			</section>
	  
			<section className="getting-started">
			  <h2>Getting Started</h2>
			  <ol>
				<li>Sign Up / Log In: Create an account or log in to access the application.</li>
				<li>Navigate to Prediction: Go to the prediction page from the main menu.</li>
				<li>Enter Data: Fill in the required fields with your data.</li>
				<li>Run Prediction: Click 'Predict' to generate price forecasts.</li>
				<li>Analyze Results: View the results and make informed decisions.</li>
			  </ol>
			</section>
	  
			<section className="contact-us">
			  <h2>Contact Us</h2>
			  <p>If you have any questions or need support, please contact us at support@pricepredict.com. We're here to help you make the most of our application.</p>
			</section>
		  </div>
	);
	
};
export const AboutUsOne = () => {
	return (
		<div className="about-us">
			<h1>prediction here</h1>
		</div>
	);
};
export const AboutUsTwo = () => {
	return (
		<div className="about-us">
			<h1>this is going to be our vision</h1>
		</div>
	);
};
export default About;