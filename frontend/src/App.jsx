import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import Header from './components/Header';
import Profile from './components/Profile'; 
import ProfileCard from './components/ProfileCard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = (tok) => {
    setToken(tok);
    localStorage.setItem('token', tok);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  return (
    <Router>
      {!token && <Header />} {/* Show header only when not logged in */}

      <main className={!token ? 'pt-20' : ''}>
        <Routes>
          {/* Redirect to leaderboard if already logged in */}
          <Route path="/" element={!token ? <Login setToken={handleSetToken} /> : <Navigate to="/leaderboard" />} />
          
          {/* Protect leaderboard and profile routes */}
          <Route path="/leaderboard" element={token ? <Leaderboard token={token} /> : <Navigate to="/" />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/" />} />
          <Route path="/profile-card/:ka_id" element={<ProfileCard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;