
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AnimeModerationLogin from './page/login';
import React, { useEffect, useState } from 'react';
import GameServerAdmin from './page/dashboard';
import SettingsPage from './page/settings';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
    let token = localStorage.getItem('token');
  const initializeToken = async () => {
    if (token === "0" || token === null) {
      localStorage.setItem('token', "0");
      return;
    }

    try {
      const response = await fetch('/request/tokencheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const result = await response.json();
      console.log("token check")
      if (result.status === "Valid") {
        console.log("Valid")
        const decodedUser = decodeToken(token);
        setUser(decodedUser);
        localStorage.setItem('user', JSON.stringify(decodedUser));
      } else {
        console.log("Token invalid")
        localStorage.setItem('token', "0");
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error("Error while checking token:", error);
      localStorage.setItem('token', "0");
      localStorage.setItem('user', null);
    }
  };

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

  useEffect(() => {
    if (token) initializeToken();
  }, []);

  if (token==0 || token == null) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<AnimeModerationLogin />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<GameServerAdmin user={user} />} />
          <Route path='/settings' element={<SettingsPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
