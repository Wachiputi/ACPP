import React from 'react';
import './about.css';
import '../footer/Footer.jsx'
import Footer from '../footer/Footer.jsx';

const About = () => {
  return (
    <div>
      <main id="main">
        {/* ======= Breadcrumbs ======= */}
        <div className="breadcrumbs">
          <div className="page-header d-flex align-items-center" style={{backgroundImage: 'url("assets/img/download.jpg")'}}>
            <div className="container position-relative">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 text-center">
                  <h2>About</h2>
                  <p>Yield Wise is an online service/consultant, that offers farmers and traders predictive insights into future price movements to avoid indecision which reduces uncertainty and improves planning. The level of accuracy is set as a distinction for this system against our competetors.</p>
                </div>
              </div>
            </div>
          </div>
          <nav>
          
          </nav>
        </div>

        {/* ======= About Us Section ======= */}
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
          <div className="row gy-4">
        <div className="col-lg-6 position-relative align-self-start order-lg-last order-first">
          <img src="assets/img/about.png" className="img-fluid" alt />
          <a href="https://www.youtube.com/watch?v=LIEHvmzFaHo" className="glightbox play-btn" />
        </div>
        <div className="col-lg-6 content order-last  order-lg-first">
          <h3 className="abty">About Yield Wise</h3>
          <p>
           Our company, YieldWise, is dedicated to revolutionizing the agricultural industry through advanced price projection system.we aim to provide accurate and reliable price projections, empowering farmers to make informed decisions and optimize their profitability.          </p>
          <ul>
            <li data-aos="fade-up" data-aos-delay={100}>
              <i className="bi bi-fullscreen-exit" />
              <div>
                <h5>Mission Statement</h5>
                <p>
                   our mission is to empower farmers with reliable insights and tools to thrive in an ever-changing agricultural landscape.
                     We believe in leveraging technology and data-driven solutions to revolutionize the way farmers predict prices, make decisions, and secure their livelihoods.</p>
              </div>
            </li>
            <li data-aos="fade-up" data-aos-delay={200}>
              <i className="bi bi-diagram-3" />
              <div>
                <h5>Target audience,Their background, Job? Responsibilities? 
                  Demographic information?</h5>
                <p>
                  Our primary target audience is agricultural stakeholders, including farmers, agronomists, agricultural economists, and agribusiness professionals. 
                  These individuals typically have backgrounds in agriculture, economics, or related fields. Their responsibilities include crop cultivation, market analysis,
                   financial management, and decision-making to optimize farm profitability. Demographically, they span a wide range of ages and geographic 
                  with a common interest in leveraging technology to improve agricultural outcomes.</p>
              </div>
            </li>
            <li data-aos="fade-up" data-aos-delay={300}>
              <i className="bi bi-broadcast" />
              <div>
                <h5>Core Values:</h5>
                <p>
                  Integrity: We uphold the highest ethical standards in all our dealings, fostering trust and transparency with our stakeholders.
                  Customer Centricity: We prioritize the needs and concerns of our customers, delivering solutions that address their challenges and exceed their expectations.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
            <div className="section-header">
              <span>The Dev Team</span>
              <h2>The Dev Team</h2>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
              <div className="col">
                <div className="member">
                  <img src="assets/team/team-1.jpg" className="img-fluid" alt="Walter White" />
                  <div className="member-content">
                    <h4>Steve Chisale</h4>
                    <span>Back-End Developer</span>
                    
                    <p className="memberp">api/Backend developer of Yieldwise</p>
                    <div className="social">
                      <a href="https://github.com/Wachiputi"><i className="bi bi-github" /></a>
                      <a href="www.linkedin.com/in/stcchisale-chisale-319b292b6"><i className="bi bi-linkedin" /></a>
                      <a href="#"><i className="bi bi-facebook" /></a>
                      <a href="#"><i className="bi bi-instagram" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="member">
                  <img src="assets/team/team-2.jpg" className="img-fluid" alt="Sarah Jhinson" />
                  <div className="member-content">
                    <h4>King Isaac Banda</h4>
                    <span>Back-End Developer</span>
                    <p className="memberp">Backend designer and developer of Yield Wise</p>
                    <div className="social">
                      <a href="https://github.com/Bsc-com-04-19"><i className="bi bi-github" /></a>
                      <a href="www.linkedin.com/in/isaac-king-banda-6ab181241"><i className="bi bi-linkedin" /></a>
                      <a href="#"><i className="bi bi-facebook" /></a>
                      <a href="#"><i className="bi bi-instagram" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="member">
                  <img src="assets/team/team-3.jpg" className="img-fluid" alt="William Anderson" />
                  <div className="member-content">
                    <h4>Liana Chagunda</h4>
                    <span>UI developer</span>
                    <p className="memberp"> The ui designer and developer of Yieldwise</p>
                    <div className="social">
                      <a href="https://github.com/Bsc-com-26-19"><i className="bi bi-github" /></a>
                      <a href="#"><i className="bi bi-facebook" /></a>
                      <a href="#"><i className="bi bi-instagram" /></a>
                      <a href="#"><i className="bi bi-linkedin" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="member">
                  <img src="assets/team/team-4.jpg" className="img-fluid" alt="Oliver Johnson" />
                  <div className="member-content">
                    <h4>Clement T Katumbi</h4>
                    <span>UI developer</span>
                    <p className="memberp">Yieldwise frontend developer </p>
                    <div className="social">
                      <a href="https://github.com/clem-thulawena"><i className="bi bi-github" /></a>
                      <a href="#"><i className="bi bi-facebook" /></a>
                      <a href="#"><i className="bi bi-instagram" /></a>
                      <a href="#"><i className="bi bi-linkedin" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default About;
