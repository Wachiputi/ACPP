// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <div className="d-flex flex-grow-1">
          <div className="navbar-brand">Yield Wise</div>
          <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={toggleNavbar}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/predictions" onClick={toggleNavbar}>forecast</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/trend-analysis" onClick={toggleNavbar}>Historical Trend Analysis</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={toggleNavbar}>About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
