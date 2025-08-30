import React, { useEffect, useMemo, useState } from "react";
import { getAllInterns } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../contexts/AdminContext";
import {
  addModuleToIntern,
  updateModuleScore,
  addCertificationToIntern,
  updateLeetcodeStatsForIntern,
  updateCommunicationScoreForIntern
} from "../services/adminApi";
import ModulesAccordion from "../components/ModulesAccordion";
import AdminHeader from "../components/AdminHeader";
import InternsSidebar from "../components/InternsSidebar";
import InternDetails from "../components/InternDetails";
import AdminForms from "../components/AdminForms";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminDashboard = () => {
  const [interns, setInterns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKaId, setSelectedKaId] = useState("");
  const [addModuleNumber, setAddModuleNumber] = useState("");
  const [addModuleName, setAddModuleName] = useState("");
  const [addScore, setAddScore] = useState("");
  const [updateModuleNumber, setUpdateModuleNumber] = useState("");
  const [updateScoreValue, setUpdateScoreValue] = useState("");

  // ✅ new comms fields
  const [grammar, setGrammar] = useState("");
  const [proactiveness, setProactiveness] = useState("");
  const [fluency, setFluency] = useState("");

  // New state variables for certifications
  const [certificationName, setCertificationName] = useState("");
  const [certificateLink, setCertificateLink] = useState("");

  // New state variables for leetcode stats
  const [easyCount, setEasyCount] = useState("");
  const [mediumCount, setMediumCount] = useState("");
  const [hardCount, setHardCount] = useState("");

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

  const handleAddCertification = async () => {
    if (!selectedKaId || !certificationName || !certificateLink) {
      alert("Fill all fields for adding certification!");
      return;
    }
    try {
      await addCertificationToIntern(selectedKaId, {
        certification_name: certificationName,
        certificate_link: certificateLink,
      });
      alert("Certification added successfully");
      setCertificationName("");
      setCertificateLink("");
      await fetchInterns();
    } catch (err) {
      alert(err?.response?.data?.msg || "Error adding certification");
    }
  };

  const handleUpdateLeetcodeStats = async () => {
    if (!selectedKaId) {
      alert("Please select an intern first!");
      return;
    }

    const leetcodeData = {};
    if (easyCount !== "") leetcodeData.easy = Number(easyCount);
    if (mediumCount !== "") leetcodeData.medium = Number(mediumCount);
    if (hardCount !== "") leetcodeData.hard = Number(hardCount);

    if (Object.keys(leetcodeData).length === 0) {
      alert("Please fill at least one leetcode stat field!");
      return;
    }

    try {
      await updateLeetcodeStatsForIntern(selectedKaId, leetcodeData);
      alert("Leetcode stats updated successfully");
      setEasyCount("");
      setMediumCount("");
      setHardCount("");
      await fetchInterns();
    } catch (err) {
      alert(err?.response?.data?.msg || "Error updating leetcode stats");
    }
  };

  const handleUpdateCommunicationScore = async () => {
    if (!selectedKaId) {
      alert("Please select an intern and enter communication scores!");
      return;
    }

    try {
      await updateCommunicationScoreForIntern(selectedKaId, {
        grammar: grammar !== "" ? Number(grammar) : 0,
        proactiveness: proactiveness !== "" ? Number(proactiveness) : 0,
        fluency: fluency !== "" ? Number(fluency) : 0,
      });
      alert("Communication scores updated successfully");
      setGrammar("");
      setProactiveness("");
      setFluency("");
      await fetchInterns();
    } catch (err) {
      alert(err?.response?.data?.msg || "Error updating communication score");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <AdminHeader onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <InternsSidebar
            interns={interns}
            selectedKaId={selectedKaId}
            onSelectIntern={setSelectedKaId}
          />

          <section className="lg:col-span-8 xl:col-span-9 space-y-8">
            <InternDetails selectedIntern={selectedIntern} />
            <ModulesAccordion selectedIntern={selectedIntern} />

            {/* ✅ Communication Section */}
            {selectedIntern && selectedIntern.communication && (
              <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Communication Scores</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {["grammar", "proactiveness", "fluency"].map((field) => (
                    <div
                      key={field}
                      className="bg-gray-50 p-3 rounded-lg text-center"
                    >
                      <p className="text-sm text-gray-500 capitalize">{field}</p>
                      <p
                        className={`text-lg font-bold ${selectedIntern.communication[field] >= 15 // 75% of max
                            ? "text-green-600"
                            : selectedIntern.communication[field] >=
                              (field === "fluency" ? 5 : 10) // 50% of max
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                      >
                        {selectedIntern.communication[field] ?? "N/A"}
                        <span className="text-xs text-gray-400">
                          {" "}
                          /{field === "fluency" ? 10 : 20}
                        </span>
                      </p>
                    </div>
                  ))}

                  {/* ✅ Overall Percentage */}
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Overall %</p>
                    {(() => {
                      const comm = selectedIntern.communication;
                      const total = (comm.grammar || 0) + (comm.proactiveness || 0) + (comm.fluency || 0);
                      const percentage = (total / 50) * 100;

                      return (
                        <p
                          className={`text-lg font-bold ${percentage >= 75
                              ? "text-green-600"
                              : percentage >= 50
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                        >
                          {percentage.toFixed(1)}%
                        </p>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}


            <AdminForms
              selectedKaId={selectedKaId}
              addModuleNumber={addModuleNumber}
              setAddModuleNumber={setAddModuleNumber}
              addModuleName={addModuleName}
              setAddModuleName={setAddModuleName}
              addScore={addScore}
              setAddScore={setAddScore}
              handleAddModule={handleAddModule}
              updateModuleNumber={updateModuleNumber}
              setUpdateModuleNumber={setUpdateModuleNumber}
              updateScoreValue={updateScoreValue}
              setUpdateScoreValue={setUpdateScoreValue}
              handleUpdateScore={handleUpdateScore}
              certificationName={certificationName}
              setCertificationName={setCertificationName}
              certificateLink={certificateLink}
              setCertificateLink={setCertificateLink}
              handleAddCertification={handleAddCertification}
              easyCount={easyCount}
              setEasyCount={setEasyCount}
              mediumCount={mediumCount}
              setMediumCount={setMediumCount}
              hardCount={hardCount}
              setHardCount={setHardCount}
              handleUpdateLeetcodeStats={handleUpdateLeetcodeStats}
              // ✅ pass new comms props
              grammar={grammar}
              setGrammar={setGrammar}
              proactiveness={proactiveness}
              setProactiveness={setProactiveness}
              fluency={fluency}
              setFluency={setFluency}
              handleUpdateCommunicationScore={handleUpdateCommunicationScore}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
