// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Subscription from './components/subscription/Subscription';
import Predictions from './components/predictions/Predictions';
import TrendAnalysis from './components/predictions/TrendAnalysis';
// import ViewCrops from './components/ViewCrops';
import NewsFeed from './components/newsfeeds/NewsFeed';
import Navbar from './components/navbar/Navbar';
import About from './components/About/About';
import getStarted from './components/predictions/getStarted';
// import MostSearchedCrops from './components/MostSearchedCrops';

const App = () => {
  return (
    <div className="App">

   
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" Component={getStarted} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/trend-analysis" element={<TrendAnalysis/>} />
        <Route path="/newsfeed" element={<NewsFeed />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
