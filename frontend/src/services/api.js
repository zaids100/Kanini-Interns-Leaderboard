import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = (ka_id, password) =>
  axios.post(`${API_URL}/auth/login`, { ka_id, password });

export const getAllInterns = (token) =>
  axios.get(`${API_URL}/leaderboard/all`, {
    headers: { Authorization: `Bearer ${token}` }
  });