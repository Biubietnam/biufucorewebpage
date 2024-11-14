import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current route

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Function to check if the current route matches the link
  const isActive = (route) => location.pathname === route;

  return (
    <>
      {/* Hamburger Button (only for mobile view) */}
      <button
        className="btn btn-primary d-md-none position-fixed top-0 start-0 m-3"
        style={{ zIndex: 1051 }}
        type="button"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar for both desktop and mobile */}
      <nav
        className={`col-md-auto col-lg-auto d-md-block bg-light sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '250px', // Set a fixed width for the sidebar
          display: isSidebarOpen || window.innerWidth >= 768 ? 'block' : 'none', // Show it on mobile when toggled or on desktop
          zIndex: 1050,
          transition: 'all 0.3s ease',
        }}
      >
        <div className="position-sticky pt-3">
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Navigation</span>
          </h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                href="/dashboard"
              >
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${isActive('/servers') ? 'active' : ''}`}
                href="/servers"
              >
                <i className="fas fa-server me-2"></i>
                Servers
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${isActive('/users') ? 'active' : ''}`}
                href="/users"
              >
                <i className="fas fa-users me-2"></i>
                Users
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${isActive('/settings') ? 'active' : ''}`}
                href="/settings"
              >
                <i className="fas fa-cog me-2"></i>
                Settings
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
