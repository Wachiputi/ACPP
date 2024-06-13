// src/components/sidebar/Sidebar.jsx
import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <i className="bi bi-x-lg"></i>
      </button>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#dashboard">
            <i className="bi bi-grid" />
            <span>Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <button className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse">
            <i className="bi bi-menu-button-wide" />
            <span>Analysis</span>
            <i className="bi bi-chevron-down ms-auto" />
          </button>
          <ul id="components-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
              <a href="#historical-trends">
                <i className="bi bi-circle" />
                <span>Historical trends</span>
              </a>
            </li>
            <li>
              <a href="#predict">
                <i className="bi bi-circle" />
                <span>Predict</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <button className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse">
            <i className="bi bi-journal-text" />
            <span>Trends</span>
            <i className="bi bi-chevron-down ms-auto" />
          </button>
          <ul id="forms-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
              <a href="#weekly">
                <i className="bi bi-circle" />
                <span>Weekly</span>
              </a>
            </li>
            <li>
              <a href="#monthly">
                <i className="bi bi-circle" />
                <span>Monthly</span>
              </a>
            </li>
            <li>
              <a href="#yearly">
                <i className="bi bi-circle" />
                <span>Yearly</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-heading">More links</li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#faq">
            <i className="bi bi-question-circle" />
            <span>F.A.Q</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#contact">
            <i className="bi bi-envelope" />
            <span>Contact</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#register">
            <i className="bi bi-card-list" />
            <span>Register</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#login">
            <i className="bi bi-box-arrow-in-right" />
            <span>Login</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
