// pages/about.js
 
import React from "react";
 
export const About = () => {
		return (
			<div style={styles.container}>
			<h1>About Us</h1>
			<section style={styles.section}>
			  <h2>Our Objective</h2>
			  <p>
				Our primary objective is to provide accurate and timely market information for maize and beans
				in various regions of Malawi. We aim to empower farmers, traders, and consumers by offering
				insights into market trends, prices, and availability. Our platform seeks to enhance the
				agricultural economy by fostering informed decision-making and transparency in market transactions.
			  </p>
			</section>
			<section style={styles.section}>
			  <h2>Market Information</h2>
	  
			  <div style={styles.market}>
				<h3>Mzimba</h3>
				<p>
				  <strong>Market Location:</strong> Mzimba Central Market<br />
				  <strong>Products:</strong> Maize, Beans<br />
				  <strong>Market Days:</strong> Monday, Thursday, Saturday<br />
				  <strong>Price Range:</strong> Maize: MWK 150-180 per kg, Beans: MWK 400-450 per kg
				</p>
			  </div>
	  
			  <div style={styles.market}>
				<h3>Blantyre</h3>
				<p>
				  <strong>Market Location:</strong> Blantyre Main Market<br />
				  <strong>Products:</strong> Maize, Beans<br />
				  <strong>Market Days:</strong> Daily<br />
				  <strong>Price Range:</strong> Maize: MWK 160-200 per kg, Beans: MWK 420-470 per kg
				</p>
			  </div>
	  
			  <div style={styles.market}>
				<h3>Ntcheu</h3>
				<p>
				  <strong>Market Location:</strong> Ntcheu Boma Market<br />
				  <strong>Products:</strong> Maize, Beans<br />
				  <strong>Market Days:</strong> Tuesday, Friday<br />
				  <strong>Price Range:</strong> Maize: MWK 140-170 per kg, Beans: MWK 410-460 per kg
				</p>
			  </div>
	  
			  <div style={styles.market}>
				<h3>Dedza</h3>
				<p>
				  <strong>Market Location:</strong> Dedza Main Market<br />
				  <strong>Products:</strong> Maize, Beans<br />
				  <strong>Market Days:</strong> Wednesday, Saturday<br />
				  <strong>Price Range:</strong> Maize: MWK 155-185 per kg, Beans: MWK 430-480 per kg
				</p>
			  </div>
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

const styles = {
	container: {
	  padding: '20px',
	  fontFamily: 'Arial, sans-serif',
	},
	section: {
	  marginBottom: '20px',
	},
	market: {
	  marginBottom: '15px',
	}
  };
  
export const AboutUsTwo = () => {
	return (
		<div className="about-us">
			<h1>this is going to be our vision</h1>
		</div>
	);
};
export default About;