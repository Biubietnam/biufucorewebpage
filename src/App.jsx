import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AnimeModerationLogin from './page/login';
import React from 'react';

function App() {
  // Function to check token validity by sending a request to /request/tokencheck
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
      console.log(result);
  
      // Check the 'status' field in the result to determine validity
      if (result.status !== "Valid") {
        console.log("Invalid token");
        localStorage.setItem('token', "0");
      }
    } catch (error) {
      // In case of error (e.g., network issues), set token to "0"
      console.error("Error while checking token:", error);
      localStorage.setItem('token', "0");
    }
  };
  

  // Call the initializeToken function on component mount
  React.useEffect(() => {
    initializeToken();
  }, []);

  // Check token to determine if redirect to login is needed
  const token = localStorage.getItem('token');
  if (token === "0" || token === null) {
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

  // If token is valid, render the main app routes
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/"/>
          <Route path="/login" element={<AnimeModerationLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
