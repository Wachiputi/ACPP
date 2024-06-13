import React from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';


function Home() {
  return (
    <div className="App">
      <BannerMain />
      <ThreeBox />
      <HottestDestinations />
      <ChooseUs />
      <ProductSection />
    </div>
  );
}

const BannerMain = () => (
  <div className="banner_main">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="text-bg">
            <h1>YIELD WISE </h1>
            <p>YieldWise is a leading price predicting consultancy that provides essential insights and services for the farming community. Our expertise helps you optimize your farming strategies, ensuring better yields and market success.</p>
            <a href="#predict">Start Predicting</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ThreeBox = () => (
  <div className="three_box">
    <div className="container">
      <div className="row">
        <BoxText imgSrc="/maizw.jpg" />
        <BoxText imgSrc="./cassava.jpg" />
        <BoxText imgSrc="./beans.jpg" />
      </div>
    </div>
  </div>
);

const BoxText = ({ imgSrc }) => (
  <div className="col-md-4">
    <div className="box_text">
      <figure><img src="maizw.jpg" alt="#" /></figure>
    </div>
  </div>
);

const HottestDestinations = () => (
  <div className="hottest">
    <div className="container">
      <div className="row d_flex">
        <div className="col-md-5">
          <div className="titlepage">
            <h2>"Predict Tomorrow's Prices Today" <br />for Everyone</h2>
          </div>
        </div>
        <div className="col-md-7">
          <div className="hottest_box">
            <p>Accurate price predictions for maize and beans in major markets such as Dedza, Blantyre, Mzimba, and Lilongwe are crucial for both traders and consumers. These forecasts help stakeholders make informed decisions, optimize their profits, and reduce risks. By analyzing market trends and historical data, we provide reliable price predictions that ensure you stay ahead in the ever-changing agricultural markets. Trust our insights to navigate the complexities of maize and bean prices in these key regions, enhancing your strategic planning and economic stability.</p>
          </div>

        </div>
      </div>
    </div>
  </div>
);

const ChooseUs = () => (
  <div className="choose">
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="titlepage">
            <h2>Why Choose Us? </h2>
            <p>Choose us for accurate and reliable price predictions. Our data-driven insights help you make informed decisions, reduce risks, and maximize profits. Trust our expertise to stay ahead in the market.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row d_flex">
        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
          <div className="padding_with">
            <div className="row">
            <ChooseBox icon="fas fa-dollar-sign" title="Lower Costs" text="Expect reduced expenses due to optimized processes and resource management." />
              <ChooseBox icon="fas fa-chart-line" title="Budget Control" text="Maintain financial stability with accurate forecasting and cost management." />
              <ChooseBox icon="fas fa-balance-scale" title="Price Stability" text="Ensure consistency in pricing strategies for sustainable profitability." />
              <ChooseBox icon="fas fa-lightbulb" title="Market Insights" text="Leverage expert analysis to make informed decisions in volatile markets." />
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
          <div className="choose_img">
            <figure><img src="maizw.jpg" alt="#" /></figure>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <a className="read_more" href="#">Read More</a>
        </div>
      </div>
    </div>
  </div>
);

const ChooseBox = ({ icon, title, text }) => (
  <div className="col-md-6 padding_bottom">
    <div className="choose_box">
      <i><img src={`images/${icon}`} alt="#" /></i>
      <div className="choose_text">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  </div>
);

const ProductSection = () => (
  <div className="product">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="titlepage">
            <h2>Our Product</h2>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row">
        <ProductBox img="Maizw.jpg" title="vegetable" />
        <ProductBox img="beans.jpg" title="weat" />
        <ProductBox img="cassava.jpg" title="fruit" />
        <ProductBox img="product4.jpg" title="sunflowere" large />
        <ProductBox img="product5.jpg" title="Livestock" />
      </div>
    </div>
  </div>
);

const ProductBox = ({ img, title, large }) => (
  <div className={`col-xl-${large ? '7' : '3'} col-lg-${large ? '7' : '3'} col-md-${large ? '7' : '3'} col-sm-12 ${large ? 'padding_left0' : 'padding_right0'}`}>
    <div className="product_box">
      <figure><img src={`images/${img}`} alt="#" /></figure>
      <h3>{title}</h3>
    </div>
  </div>
);

export default Home;
