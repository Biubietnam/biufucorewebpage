import React, { useState } from 'react';
import Sidebar from './sidebar';

export default function SettingsPage() {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleUsernameChange = (e) => {
    e.preventDefault();
    console.log('Username changed to:', username);
    setUsername('');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Password changed');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    // Clear the token and user data from localStorage
    localStorage.setItem('user',null);
    localStorage.setItem('token',0);
    
    // Optionally, you can also clear other session-related data if needed.
    localStorage.clear(); // Un-comment this if you want to clear all localStorage items.

    window.location.href = "/login";
    window.location.href = "/login";
  };

  return (
    <div className="d-flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      
      <div
        className="container mt-5 p-3"
        style={{
          marginLeft: isSidebarOpen ? '250px' : '0',
          flexGrow: 1,
          width: isSidebarOpen ? 'calc(100% - 250px)' : '100%',
          transition: 'all 0.3s ease',
        }}
      >
        <h1 className="mb-4">Settings</h1>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Change Username</h5>
            <form onSubmit={handleUsernameChange}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">New Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Change Username</button>
            </form>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Change Password</h5>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Change Password</button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Logout</h5>
            <p className="card-text">Click the button below to log out of your account.</p>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
