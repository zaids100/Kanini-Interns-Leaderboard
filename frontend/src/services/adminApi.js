import axios from "axios";

const API = axios.create({
  baseURL: "https://kanini-interns-leaderboard.onrender.com/api/admin",
  // baseURL: "http://localhost:3000/api/admin",
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

// Add certification for a specific intern
export const addCertificationToIntern = (ka_id, certificationData) =>
  API.post(`/interns/${ka_id}/certifications`, certificationData);

// Update certification for a specific intern
export const updateCertificationForIntern = (ka_id, certificationName, certificateLink) =>
  API.put(`/interns/${ka_id}/certifications/${certificationName}`, { certificate_link: certificateLink });

// Update leetcode stats for a specific intern
export const updateLeetcodeStatsForIntern = (ka_id, leetcodeData) =>
  API.put(`/interns/${ka_id}/leetcode-stats`, leetcodeData);

// Update communication scores for a specific intern
// communicationData should be an object: { grammar, proactiveness, fluency }
export const updateCommunicationScoreForIntern = (ka_id, communicationData) =>
  API.put(`/interns/${ka_id}/communication`, {
    grammar: communicationData.grammar,
    proactiveness: communicationData.proactiveness,
    fluency: communicationData.fluency
  });