import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './sidebard';

export default function GameServerAdmin({ user }) {
  const [command, setCommand] = useState('');
  const [startTime, setStartTime] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [cpudata, setcpudata] = useState(null);
  const [uptimeData, setUptimeData] = useState([]); // State for uptime data
  const username = user.username;
  const role = user.role;

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    console.log('Command submitted:', command);
    setCommand('');
  };

  useEffect(() => {
    const fetchData = () => {
      // Fetch data from the init endpoint
      fetch('/request/init')
        .then(response => response.json())
        .then(data => {
          if (data && data.StartTime) {
            setStartTime(data.StartTime); // Set StartTime to the state
          }

          if (data && data.cpuUsageHistory) {
            // Process the cpuUsageHistory to extract the hour and uptime values
            const newUptimeData = data.cpuUsageHistory.map(entry => {
              const time = entry.time.split(' ')[1].substring(0, 2); // Extract the hour part
              return {
                time: time,
                uptime: entry.cpupercent
              };
            });

            setUptimeData(newUptimeData); // Replace the entire uptimeData with new data
          }
        })
        .catch(error => console.error('Error fetching data:', error));

      // Fetch player data
      fetch('/request/getplayer')
        .then(response => response.json())
        .then(playerData => {
          if (playerData) {
            setPlayerData(playerData.playerCount); // Set player data
          }
        })
        .catch(error => console.error('Error fetching player data:', error));

      // Fetch CPU usage (or any other relevant data)
      fetch('/request/getcpuusage')
        .then(response => response.json())
        .then(cpuusage => {
          if (cpuusage) {
            setcpudata(cpuusage.cpupercent); // Set CPU data
          }
        })
        .catch(error => console.error('Error fetching CPU usage:', error));
    };

    // Initial fetch on component mount
    fetchData();

    // Set interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount and sets up the interval

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Game Server Control Panel</h1>
            <div className="d-flex align-items-center">
              {/* Search Box */}
              <div className="input-group me-3">
                <input type="text" className="form-control" placeholder="Search..." aria-label="Search" />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>

              {/* Username and Role Box */}
              <div className="card p-2 d-flex flex-row align-items-center w-100 h-100" style={{ maxWidth: '300px', maxHeight: '100px' }}>
                <i className="fas fa-user-circle me-2"></i>
                <div className="text-muted" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                  <p className="mb-0">Username: <strong>{username}</strong></p>
                  <p className="mb-0">Role: <strong>{role ? role : "N/A"}</strong></p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 mb-4">
              <div className="card bg-primary text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Active Since</h5>
                  <p className="card-text">{startTime || 'Loading...'}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card bg-success text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Latest Update</h5>
                  <p className="card-text">v.2.6.0</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card bg-warning text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Active Players</h5>
                  <p className="card-text">{playerData || '0'}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card bg-info text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Server Load</h5>
                  <p className="card-text">{cpudata + '%' || 'Loading...'}</p>
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
