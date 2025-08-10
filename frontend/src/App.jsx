import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import ProfileCard from './components/ProfileCard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import { useAdmin } from "./contexts/AdminContext";
import { UserProvider, useUser } from "./contexts/UserContext";

function AppRoutes() {
  const { token } = useUser();
  const { adminToken } = useAdmin();

  // Debug logging
  console.log('AppRoutes - Current token:', token ? 'Present' : 'Missing');
  console.log('AppRoutes - Current adminToken:', adminToken ? 'Present' : 'Missing');

  return (
    <Router>
      {/* Show Header only when neither user nor admin is logged in */}
      {!token && !adminToken && <Header />}

      <main className="">
        <Routes>
          {/* User Login */}
          <Route path="/" element={!token ? <Login /> : <Navigate to="/leaderboard" />} />
          
          {/* User Pages */}
          <Route path="/leaderboard" element={token ? <Leaderboard /> : <Navigate to="/" />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/" />} />
          <Route path="/profile-card/:ka_id" element={<ProfileCard />} />

          {/* Admin Pages */}
          <Route path="/admin/login" element={!adminToken ? <AdminLogin /> : <Navigate to="/admin/dashboard" />} />
          <Route path="/admin/dashboard" element={adminToken ? <AdminDashboard /> : <Navigate to="/admin/login" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
