import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/admin",
});

// Attach token automatically for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Admin login
export const adminLogin = (adminData) =>
  API.post("/auth/login", adminData);

// Add module & score for a specific intern
export const addModuleToIntern = (ka_id, moduleData) =>
  API.post(`/interns/${ka_id}/modules`, moduleData);

// Update score for a specific intern's module
export const updateModuleScore = (ka_id, moduleNumber, scoreData) =>
  API.post(`/interns/${ka_id}/modules/${moduleNumber}`, scoreData);