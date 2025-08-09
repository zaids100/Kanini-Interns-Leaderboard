import React, { useEffect, useMemo, useState } from "react";
import { getAllInterns } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../contexts/AdminContext";
import { addModuleToIntern, updateModuleScore } from "../services/adminApi";
import { LogOut, User, Plus, Edit3, GraduationCap, Trophy } from "lucide-react";

const AdminDashboard = () => {
  const [interns, setInterns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKaId, setSelectedKaId] = useState("");
  const [addModuleNumber, setAddModuleNumber] = useState("");
  const [addModuleName, setAddModuleName] = useState("");
  const [addScore, setAddScore] = useState("");
  const [updateModuleNumber, setUpdateModuleNumber] = useState("");
  const [updateScoreValue, setUpdateScoreValue] = useState("");
  const navigate = useNavigate();
  const { admin, setAdmin, adminToken, setAdminToken } = useAdmin();

  useEffect(() => {
    if (!adminToken) {
      setIsLoading(false);
      navigate("/admin/login", { replace: true });
      return;
    }
    fetchInterns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken]);

  const fetchInterns = async () => {
    setIsLoading(true);
    try {
      const res = await getAllInterns(adminToken);
      const fetched = res.data?.interns || [];
      setInterns(fetched);
      // Initialize selection if empty
      if (!selectedKaId && fetched.length > 0) {
        setSelectedKaId(fetched[0].ka_id);
      }
    } catch (error) {
      setInterns([]);
      if (error?.response?.status === 401) {
        setAdmin(null);
        setAdminToken("");
        navigate("/admin/login", { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setAdmin(null);
    setAdminToken("");
    navigate("/admin/login", { replace: true });
  };

  const selectedIntern = useMemo(
    () => interns.find((i) => i.ka_id === selectedKaId) || null,
    [interns, selectedKaId]
  );

  const handleAddModule = async () => {
    if (!selectedKaId || !addModuleNumber || !addModuleName || !addScore) {
      alert("Fill all fields for adding a module!");
      return;
    }
    try {
      await addModuleToIntern(selectedKaId, {
        moduleNumber: addModuleNumber,
        moduleName: addModuleName,
        score: Number(addScore),
      });
      alert("Module added successfully");
      setAddModuleNumber("");
      setAddModuleName("");
      setAddScore("");
      await fetchInterns();
    } catch (err) {
      alert(err?.response?.data?.msg || "Error adding module");
    }
  };

  const handleUpdateScore = async () => {
    if (!selectedKaId || !updateModuleNumber || !updateScoreValue) {
      alert("Fill all fields for updating score!");
      return;
    }
    try {
      await updateModuleScore(selectedKaId, updateModuleNumber, {
        score: Number(updateScoreValue),
      });
      alert("Score updated successfully");
      setUpdateModuleNumber("");
      setUpdateScoreValue("");
      await fetchInterns();
    } catch (err) {
      alert(err?.response?.data?.msg || "Error updating score");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium text-slate-600">Loading interns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-lg h-lg  rounded-xl flex items-center justify-center">
                <img
                  src="https://kanini.com/wp-content/uploads/2022/06/Kanini-Logo.svg"
                  alt="Kanini Logo"
                  className="w-32 h-auto object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel: Interns list */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-slate-600" />
                  <h2 className="text-lg font-semibold text-slate-800">Interns</h2>
                  <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                    {interns.length}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {interns.map((intern) => (
                    <button
                      key={intern.ka_id}
                      onClick={() => setSelectedKaId(intern.ka_id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${selectedKaId === intern.ka_id
                        ? "bg-blue-50 border-blue-200 shadow-md scale-[1.02]"
                        : "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md hover:scale-[1.01]"
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={intern.profilePic}
                            alt={intern.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                          />
                          {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div> */}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{intern.name}</p>
                          <p className="text-xs text-slate-500 truncate">{intern.ka_id}</p>
                          <p className="text-xs text-blue-600 font-medium">{intern.role}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Panel: Details & Forms */}
          <section className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Selected intern details */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Intern Details</span>
              </h2>
              {!selectedIntern ? (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Select an intern from the left panel to view details</p>
                </div>
              ) : (
                <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <img
                    src={selectedIntern.profilePic}
                    alt={selectedIntern.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{selectedIntern.name}</h3>
                    <p className="text-slate-600 font-medium">{selectedIntern.ka_id}</p>
                    <p className="text-blue-600 font-semibold">{selectedIntern.role}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modules list */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-green-500" />
                <span>Modules & Scores</span>
              </h2>
              {!selectedIntern ? (
                <div className="text-center py-8">
                  <p className="text-slate-500">No intern selected.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedIntern.score?.length ? (
                    selectedIntern.score.map((module, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg border border-slate-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                            {module.moduleNumber}
                          </div>
                          <span className="font-medium text-slate-800">{module.moduleName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">{module.score}</span>
                          <span className="text-sm text-slate-500 font-medium">pts</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No modules assigned yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions: Add / Update */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Add Module */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-blue-500" />
                  <span>Add Module</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Module Number</label>
                    <input
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter module number"
                      value={addModuleNumber}
                      onChange={(e) => setAddModuleNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Module Name</label>
                    <input
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter module name"
                      value={addModuleName}
                      onChange={(e) => setAddModuleName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Score</label>
                    <input
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter score"
                      type="number"
                      value={addScore}
                      onChange={(e) => setAddScore(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleAddModule}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105"
                    disabled={!selectedKaId}
                  >
                    Add Module
                  </button>
                </div>
              </div>

              {/* Update Module Score */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                  <Edit3 className="w-5 h-5 text-green-500" />
                  <span>Update Module Score</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Module Number</label>
                    <input
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter module number"
                      value={updateModuleNumber}
                      onChange={(e) => setUpdateModuleNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">New Score</label>
                    <input
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter new score"
                      type="number"
                      value={updateScoreValue}
                      onChange={(e) => setUpdateScoreValue(e.target.value)}
                    />
                  </div>
                  <div className="pt-8">
                    <button
                      onClick={handleUpdateScore}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105"
                      disabled={!selectedKaId}
                    >
                      Update Score
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;