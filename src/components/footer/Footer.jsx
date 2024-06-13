
import React from 'react'
// import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import './footer.css'


const Footer = () => {
  return (
 
    <footer id="footer" className="footer">
  <div className="containerr">
    <div className="row gy-4">
      <div className="col-lg-5 col-md-12 footer-info">
        <a href="index.html" className="logo d-flex align-items-center">
          <span>Yield Wise </span>
        </a>
        <p>Our company, YieldWise, is dedicated to revolutionizing the agricultural industry through 
          advanced price projection system.we aim to provide accurate and reliable price projections,
           empowering farmers to make informed decisions and optimize their profitability. </p>

           <ph2>We uphold the highest ethical standards in all our dealings, fostering trust and transparency
             with our stakeholders. Customer Centricity: We prioritize the needs and concerns of our customers,
              delivering solutions that address their challenges and exceed their expectations.. </ph2>
       
      </div>
      <div className="col-lg-2 col-6 footer-links">
        <h4>Useful Links</h4>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Terms of service</a></li>
      
        </ul>
      </div>
      <div className="col-lg-2 col-6 footer-links">
        <h4>Our Services</h4>
        <ul>
          <li><a href="#">price predictions</a></li>
          <li><a href="#">Market Trend analysis</a></li>
          <li><a href="#">consultation</a></li>
          <li><a href="#">Marketing</a></li>
       
        </ul>
      </div>
      <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
        <h4>Contact Us</h4>
        <p>  <i className="bi bi-geo-alt flex-shrink-0" /> <br/>
            ZOMBA  <br />
            UNIMA<br />
          <br /><br />
          <strong> Phone:</strong> +265 99 385 1049<br />
          <strong>Email:</strong>Yieldwize@gmail.com<br />
        </p>
      </div>
    </div>
  </div>
  <div className="container mt-4">
    <div className="copyright">
      © Copyright <strong><span>YieldWise</span></strong>. All Rights Reserved
    </div>
    <div className="credits">
  
     
      Designed by <a href="https://#">YieldWise</a>
    </div>
  </div>
</footer>



   
  )
}

export default Footer