import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = (ka_id, password) =>
  axios.post(`${API_URL}/auth/login`, { ka_id, password });

export const getAllInterns = (token) =>
  axios.get(`${API_URL}/leaderboard/all`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getInternById = (ka_id, token) =>
  axios.get(`${API_URL}/leaderboard/${ka_id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const uploadProfilePic = (file, token) => {
  const formData = new FormData();
  formData.append('profilePic', file);

  return axios.post(`${API_URL}/leaderboard/upload-profile-pic`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};