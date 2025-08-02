import React, { useState } from 'react';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import Header from './components/Header';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = (tok) => {
    setToken(tok);
    localStorage.setItem('token', tok);
  };

  return (
    <div className="min-h-screen">
      {/* Show Header only when not logged in */}
      {!token && <Header />}

      {/* Adjust top padding so content doesn't go under fixed header */}
      <main className={!token ? 'pt-20' : ''}>
        {!token ? (
          <Login setToken={handleSetToken} />
        ) : (
          <Leaderboard token={token} />
        )}
      </main>
    </div>
  );
}

export default App;
