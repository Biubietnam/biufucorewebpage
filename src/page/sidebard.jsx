import React, { useState } from "react";

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="btn btn-primary d-md-none position-fixed top-0 start-0 w-100 m-3"
        style={{
          zIndex: 1051, // Ensure it's above other elements
        }}
        type="button"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <nav
        className={`col-md-auto col-lg-auto d-md-block bg-light sidebar ${isSidebarOpen ? 'show' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          display: isSidebarOpen ? 'block' : 'none',
          transition: 'all 0.3s ease',
          zIndex: 1050, // Ensures it's behind the hamburger button
        }}
      >
        <div className="position-sticky pt-3">
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Navigation</span>
          </h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-server me-2"></i>
                Servers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-users me-2"></i>
                Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-cog me-2"></i>
                Settings
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Offcanvas Sidebar for Small Screens */}
      <div
        className={`offcanvas offcanvas-start ${isSidebarOpen ? 'show' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1050,
          height: '100%',
          width: '100%', // Ensures sidebar takes full screen width on small screens
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Navigation</h5>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={toggleSidebar}
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-server me-2"></i>
                Servers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-users me-2"></i>
                Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-cog me-2"></i>
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
