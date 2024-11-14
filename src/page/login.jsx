import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import ErrorModal from './ErrorModal'; // Import the ErrorModal component

export default function AnimeModerationLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); // State for modal visibility
  const [errorMessage, setErrorMessage] = useState(''); // Store the error message

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    try {
      const response = await fetch('/request/login', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        const base64Token = result.token;
  
        // Store the token in localStorage
        localStorage.setItem('token', base64Token);
  
        // Decode and store user data as JSON in localStorage
        const decodedUser = decodeToken(base64Token);
        localStorage.setItem('user', JSON.stringify(decodedUser));
  
        // Redirect to dashboard with a full page reload
        window.location.href = "/dashboard"; // This causes a full page reload
      } else {
        // If login failed, set the error message and show the error modal
        setErrorMessage('Invalid username or password. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred while logging in. Please try again later.');
      setShowErrorModal(true); // Show the modal on error
    }
  };
  
  // Function to decode token
  const decodeToken = (token) => {
    try {
      const decoded = atob(token);
      const parts = decoded.split(':');
      const username = parts[0];
      const role = parts.length > 2 ? parts[2] : null;
      return { username, role: role || null };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  
  return (
    <div className="container-fluid min-vh-100 d-flex bg-light">
      <div className="row w-100 m-0">
        {/* Left side - Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center p-5">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <h2 className="mb-4 text-center">Moderator Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
                />
                <label className="form-check-label" htmlFor="showPassword">
                  Show password
                </label>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="mt-3 text-center">
              <small><a href="#" className="text-muted">Forgot password?</a></small>
            </div>
          </div>
        </div>

        {/* Right side - Title and Logo */}
        <div className="col-md-6 bg-primary text-white d-flex flex-column align-items-center justify-content-center p-5">
          <h1 className="display-4 mb-4 text-center" style={{ fontWeight: '750' }}>Honkai Starails PS</h1>
          <h2 className="h4 mb-5 text-center">Moderation Panel</h2>
          <div className="mb-5">
            <Shield size={120} />
          </div>
          <p className="text-center">
            Welcome back, moderator! Your role is crucial in maintaining a safe and enjoyable environment for all players.
          </p>
        </div>
      </div>
      
      {/* Error Modal */}
      {showErrorModal && <ErrorModal message={errorMessage} onClose={() => setShowErrorModal(false)} />}
    </div>
  );
}
