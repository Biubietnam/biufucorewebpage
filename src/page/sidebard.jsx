import React from "react";

export default function sidebar(){

    return(
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
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
    )

}