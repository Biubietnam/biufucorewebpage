import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const uptimeData = [
  { time: '00:00', uptime: 100 },
  { time: '04:00', uptime: 99 },
  { time: '08:00', uptime: 100 },
  { time: '12:00', uptime: 98 },
  { time: '16:00', uptime: 100 },
  { time: '20:00', uptime: 100 },
  { time: '24:00', uptime: 99 },
];

export default function GameServerAdmin() {
  const [command, setCommand] = useState('');

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    console.log('Command submitted:', command);
    setCommand('');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
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

        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Game Server Control Panel</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search..." aria-label="Search" />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 mb-4">
              <div className="card bg-primary text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Active Since</h5>
                  <p className="card-text">10/24/2023, 11:23 AM</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card bg-success text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Latest Update</h5>
                  <p className="card-text">Server updated to v1.666</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card bg-warning text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Active Players</h5>
                  <p className="card-text">142</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card bg-info text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Server Load</h5>
                  <p className="card-text">37%</p>
                </div>
              </div>
            </div>
          </div>

          <h2>Server Uptime</h2>
          <div className="card mb-4">
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={uptimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="uptime" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2>Server Command</h2>
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleCommandSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter server command"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">
                    <i className="fas fa-paper-plane me-2"></i>
                    Execute
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
          padding: 48px 0 0;
          box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
        }

        .sidebar .nav-link {
          font-weight: 500;
          color: #333;
        }

        .sidebar .nav-link.active {
          color: #007bff;
        }

        main {
          padding-top: 48px;
        }

        .card {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-title {
          font-weight: 600;
        }

        .btn-primary {
          background-color: #007bff;
          border-color: #007bff;
        }

        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }
      `}</style>
    </div>
  );
}