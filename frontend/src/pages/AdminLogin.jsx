import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/adminApi";
import { useAdmin } from "../contexts/AdminContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setAdmin, setAdminToken } = useAdmin();

  const [formData, setFormData] = useState({ admin_id: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await adminLogin(formData);
      setAdmin(res.data.data);
      setAdminToken(res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://kanini.com/wp-content/uploads/2022/06/Kanini-Logo.svg"
            alt="Kanini Logo"
            className="w-40 mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500 text-sm">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="admin_id" className="block text-sm font-medium text-gray-700">
            Admin ID
          </label>
          <input
            type="text"
            id="admin_id"
            name="admin_id"
            value={formData.admin_id}
            onChange={handleChange}
            placeholder="ADM01,ADM02,ADM03"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
