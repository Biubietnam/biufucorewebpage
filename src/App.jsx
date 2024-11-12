import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AnimeModerationLogin from './page/login';
import React, { useEffect, useState } from 'react';
import GameServerAdmin from './page/dashboard';

function App() {
  const [user, setUser] = useState(null); // To store the decoded user data

  // Function to check token validity and decode the token
  const initializeToken = async () => {
    let token = localStorage.getItem('token');
  
    // If token is "0" or null, don't make the request
    if (token === "0" || token === null) {
      // Set the token to "0" for the first-time visitor
      localStorage.setItem('token', "0");
      return; // Exit early to prevent the request
    }
  
    try {
      // Log the token being sent
      console.log('Sending token to server:', token);
  
      // Send request to check if the token is valid
      const response = await fetch('/request/tokencheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      });
  
      const result = await response.json();
  
      // Check the 'status' field in the result to determine validity
      if (result.status === "Valid") {
        // If valid, decode the token and set user data
        const decodedUser = decodeToken(token);  // Decode the token to extract user info
        setUser(decodedUser);  // Set user state
      } else {
        console.log("Invalid token");
        localStorage.setItem('token', "0");
      }
    } catch (error) {
      // In case of error (e.g., network issues), set token to "0"
      console.error("Error while checking token:", error);
      localStorage.setItem('token', "0");
    }
  };

  // Decode the base64 token
  const decodeToken = (token) => {
    try {
      const decoded = atob(token);  // Decode from base64
      const parts = decoded.split(':'); // Split by colon (assuming format is 'username:someValue:otherValue:role')
      
      // Extract the username (index 0) and check if role exists at index 3
      const username = parts[0];
      const role = parts.length > 3 ? parts[3] : null;  // Check if index 3 exists for the role

      // Return user object with username and role (if exists)
      return { username, role: role || null };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Call the initializeToken function on component mount
  useEffect(() => {
    initializeToken();
  }, []);

  // Check token to determine if redirect to login is needed
  const token = localStorage.getItem('token');
  if (token === "0" || token === null || !user) {
    return (
      <Router>
        <Routes>
          {/* Redirect to /login if token is "0" or null */}
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<AnimeModerationLogin />} />
        </Routes>
      </Router>
    );
  }

  // If token is valid and user is decoded, render the main app routes
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<AnimeModerationLogin />} />
          <Route path="/dashboard" element={<GameServerAdmin user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
