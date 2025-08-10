import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      headers: config.headers,
      hasAuth: !!config.headers.Authorization
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.msg || error.message,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export const login = (ka_id, password) =>
  axios.post(`${API_URL}/auth/login`, { ka_id, password });

export const getAllInterns = (token) => {
  console.log('getAllInterns called with token:', token ? 'Present' : 'Missing');
  console.log('getAllInterns token details:', token ? { length: token.length, start: token.substring(0, 20) + '...' } : 'No token');
  console.log('getAllInterns Authorization header:', `Bearer ${token}`);
  
  return axios.get(`${API_URL}/leaderboard/all`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

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

// Certification management functions
export const addCertificationToIntern = (ka_id, certificationData, token) =>
  axios.post(`${API_URL}/leaderboard/${ka_id}/certifications`, certificationData, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateCertificationForIntern = (ka_id, certificationName, certificationData, token) =>
  axios.put(`${API_URL}/leaderboard/${ka_id}/certifications/${certificationName}`, certificationData, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteCertificationForIntern = (ka_id, certificationName, token) =>
  axios.delete(`${API_URL}/leaderboard/${ka_id}/certifications/${certificationName}`, {
    headers: { Authorization: `Bearer ${token}` }
  });