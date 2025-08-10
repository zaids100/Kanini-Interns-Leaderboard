import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { User, Mail, Award, Code, TrendingUp, Star, Trophy, Target, Plus, Edit, Trash2 } from 'lucide-react';
import { uploadProfilePic, addCertificationToIntern, updateCertificationForIntern, deleteCertificationForIntern } from '../services/api'
export default function Profile() {
    const { user, setUser, token, setToken } = useUser();
    const [isAddingCertification, setIsAddingCertification] = useState(false);
    const [editingCertification, setEditingCertification] = useState(null);
    const [newCertification, setNewCertification] = useState({ certification_name: '', certificate_link: '' });
    const [editForm, setEditForm] = useState({ certification_name: '', certificate_link: '' });

    // Debug logging
    console.log('Profile component - token:', token ? 'Present' : 'Missing');
    console.log('Profile component - user:', user);

    if (!user) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading user data...</p>
                </div>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">Authentication token missing. Please log in again.</p>
                </div>
            </div>
        );
    }

    const getScoreColor = (score) => {
        if (score >= 95) return 'from-green-500 to-green-700';
        if (score >= 90) return 'from-blue-500 to-blue-700';
        if (score >= 85) return 'from-yellow-500 to-yellow-700';
        return 'from-gray-400 to-gray-600';
    };

    const getScoreRing = (score) => {
        const circumference = 2 * Math.PI * 20;
        const strokeDashoffset = circumference - (score / 100) * circumference;
        return { circumference, strokeDashoffset };
    };

    const averageScore = user.score && user.score.length > 0
        ? user.score.reduce((acc, s) => acc + s.score, 0) / user.score.length
        : 0;

    const roundedAvg = Math.round(averageScore * 100) / 100;

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const response = await uploadProfilePic(file, token);
                console.log("Upload successful:", response.data);

                if (response.data?.imageUrl) {
                    setUser(prev => ({ ...prev, profilePic: response.data.imageUrl }));
                }
            } catch (error) {
                console.error("Upload failed:", error);
                if (error.response?.status === 401) {
                    alert('Authentication failed. Please log in again.');
                    // Clear invalid token
                    setToken(null);
                    setUser(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                }
            }
        }
    };

    const handleAddCertification = async () => {
        if (!newCertification.certification_name || !newCertification.certificate_link) {
            alert('Please fill in both fields');
            return;
        }

        try {
            const response = await addCertificationToIntern(user.ka_id, newCertification, token);
            
            const updatedUser = { ...user };
            updatedUser.certifications = response.data.certifications;
            setUser(updatedUser);
            setNewCertification({ certification_name: '', certificate_link: '' });
            setIsAddingCertification(false);
        } catch (error) {
            console.error('Error adding certification:', error);
            if (error.response?.status === 401) {
                alert('Authentication failed. Please log in again.');
                // Clear invalid token
                setToken(null);
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
                return;
            }
            alert(error.response?.data?.error || 'Failed to add certification');
        }
    };

    const handleEditCertification = async () => {
        if (!editForm.certification_name || !editForm.certificate_link) {
            alert('Please fill in both fields');
            return;
        }

        try {
            const response = await updateCertificationForIntern(user.ka_id, editingCertification.certification_name, editForm, token);
            
            const updatedUser = { ...user };
            updatedUser.certifications = response.data.certifications;
            setUser(updatedUser);
            setEditingCertification(null);
            setEditForm({ certification_name: '', certificate_link: '' });
        } catch (error) {
            console.error('Error updating certification:', error);
            if (error.response?.status === 401) {
                alert('Authentication failed. Please log in again.');
                // Clear invalid token
                setToken(null);
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
                return;
            }
            alert(error.response?.data?.error || 'Failed to update certification');
        }
    };

    const handleDeleteCertification = async (certificationName) => {
        if (!confirm('Are you sure you want to delete this certification?')) {
            return;
        }

        try {
            const response = await deleteCertificationForIntern(user.ka_id, certificationName, token);
            
            const updatedUser = { ...user };
            updatedUser.certifications = response.data.certifications;
            setUser(updatedUser);
        } catch (error) {
            console.error('Error deleting certification:', error);
            if (error.response?.status === 401) {
                alert('Authentication failed. Please log in again.');
                // Clear invalid token
                setToken(null);
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
                return;
            }
            alert(error.response?.data?.error || 'Failed to delete certification');
        }
    };

    const startEditing = (certification) => {
        setEditingCertification(certification);
        setEditForm({
            certification_name: certification.certification_name,
            certificate_link: certification.certificate_link
        });
    };

    const cancelEditing = () => {
        setEditingCertification(null);
        setEditForm({ certification_name: '', certificate_link: '' });
    };
    return (
        <div className="min-h-screen bg-white text-gray-900 py-8 px-4 ">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gray-100 rounded-3xl shadow-lg border border-gray-300 p-8 mb-8">
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <div className="relative group cursor-pointer">
                                <label htmlFor="profile-pic-upload">
                                    <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center hover:opacity-80 transition">
                                        <img
                                            src={user.profilePic || "https://i.pravatar.cc/150?img=11"} // Fallback image
                                            alt="Profile"
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="profile-pic-upload"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                {/* <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
                                    <Star size={16} className="text-white" />
                                </div> */}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
                                <Star size={16} className="text-white" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                {user.name}
                            </h1>
                            <div className="flex items-center space-x-4 text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <Target size={16} />
                                    <span className="font-mono text-gray-800">{user.ka_id}</span>
                                </div>
                                {user.email && (
                                    <div className="flex items-center space-x-2">
                                        <Mail size={16} />
                                        <span>{user.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-700"><div className="text-3xl font-bold text-gray-700">{roundedAvg}</div></div>
                            <div className="text-sm text-gray-500">Percentage</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-gray-100 rounded-3xl shadow-lg border border-gray-300 p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <Code className="text-gray-700" size={24} />
                                <h2 className="text-2xl font-bold">Module Performance</h2>
                            </div>
                            <div className="space-y-6">
                                {user.score?.map((s, idx) => {
                                    const { circumference, strokeDashoffset } = getScoreRing(s.score);
                                    return (
                                        <div key={idx} className="group hover:bg-gray-200 rounded-2xl p-4 transition-all duration-300 border border-transparent hover:border-gray-400">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative w-12 h-12">
                                                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 44 44">
                                                            <circle
                                                                cx="22"
                                                                cy="22"
                                                                r="20"
                                                                stroke="currentColor"
                                                                strokeWidth="3"
                                                                fill="none"
                                                                className="text-gray-300"
                                                            />
                                                            <circle
                                                                cx="22"
                                                                cy="22"
                                                                r="20"
                                                                stroke="currentColor"
                                                                strokeWidth="3"
                                                                fill="none"
                                                                strokeDasharray={circumference}
                                                                strokeDashoffset={strokeDashoffset}
                                                                strokeLinecap="round"
                                                                className={`text-green-500 transition-all duration-1000 ease-out`}
                                                            />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="text-xs font-bold text-gray-700">M{s.moduleNumber}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg text-gray-800">{s.moduleName}</h3>
                                                        <p className="text-gray-500 text-sm">Module {s.moduleNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-green-600">{s.score}</div>
                                                    <div className="text-sm text-gray-500">/ 100</div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <div className="w-full bg-gray-300 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full bg-gradient-to-r ${getScoreColor(s.score)} transition-all duration-1000 ease-out`}
                                                        style={{ width: `${s.score}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-gray-100 rounded-3xl shadow-lg border border-gray-300 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <Trophy className="text-yellow-600" size={24} />
                                    <h2 className="text-2xl font-bold">Certifications</h2>
                                </div>
                                <button
                                    onClick={() => setIsAddingCertification(!isAddingCertification)}
                                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                >
                                    <Plus size={16} />
                                    <span>Add</span>
                                </button>
                            </div>

                            {/* Add Certification Form */}
                            {isAddingCertification && (
                                <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
                                    <h3 className="font-semibold text-gray-800 mb-3">Add New Certification</h3>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Certification Name"
                                            value={newCertification.certification_name}
                                            onChange={(e) => setNewCertification(prev => ({ ...prev, certification_name: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        <input
                                            type="url"
                                            placeholder="Certificate Link"
                                            value={newCertification.certificate_link}
                                            onChange={(e) => setNewCertification(prev => ({ ...prev, certificate_link: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handleAddCertification}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                            >
                                                Add Certification
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsAddingCertification(false);
                                                    setNewCertification({ certification_name: '', certificate_link: '' });
                                                }}
                                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Certifications List */}
                            {user.certifications?.length ? (
                                <div className="space-y-3">
                                    {user.certifications.map((cert, idx) => (
                                        <div key={idx} className="group hover:bg-yellow-50 rounded-xl p-4 border border-gray-300 hover:border-yellow-300 transition-all duration-300">
                                            {editingCertification && editingCertification.certification_name === cert.certification_name ? (
                                                <div className="space-y-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Certification Name"
                                                        value={editForm.certification_name}
                                                        onChange={(e) => setEditForm(prev => ({ ...prev, certification_name: e.target.value }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    />
                                                    <input
                                                        type="url"
                                                        placeholder="Certificate Link"
                                                        value={editForm.certificate_link}
                                                        onChange={(e) => setEditForm(prev => ({ ...prev, certificate_link: e.target.value }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    />
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={handleEditCertification}
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition-colors duration-200 text-sm"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={cancelEditing}
                                                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors duration-200 text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <Award size={20} className="text-white" />
                                                        </div>
                                                        <a
                                                            href={cert.certificate_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-medium group-hover:text-yellow-600 transition-colors duration-300"
                                                        >
                                                            {cert.certification_name}
                                                        </a>
                                                    </div>
                                                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button
                                                            onClick={() => startEditing(cert)}
                                                            className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors duration-200"
                                                            title="Edit"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteCertification(cert.certification_name)}
                                                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Award size={48} className="text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No certifications yet</p>
                                    <p className="text-sm text-gray-500 mt-2">Keep working to earn certifications!</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-100 rounded-3xl shadow-lg border border-gray-300 p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <Code className="text-orange-600" size={24} />
                                <h2 className="text-2xl font-bold">Leetcode Stats</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                                    <div className="text-2xl font-bold text-green-600">{user.leetcode_stats?.easy || 0}</div>
                                    <div className="text-sm text-green-500">Easy</div>
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-200">
                                    <div className="text-2xl font-bold text-yellow-600">{user.leetcode_stats?.medium || 0}</div>
                                    <div className="text-sm text-yellow-500">Medium</div>
                                </div>
                                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                                    <div className="text-2xl font-bold text-red-600">{user.leetcode_stats?.hard || 0}</div>
                                    <div className="text-sm text-red-500">Hard</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-600">
                                    Total: <span className="font-semibold">{(user.leetcode_stats?.easy || 0) + (user.leetcode_stats?.medium || 0) + (user.leetcode_stats?.hard || 0)}</span> problems solved
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 rounded-3xl shadow-lg border border-gray-300 p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <TrendingUp className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold">Quick Stats</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                                    <span className="text-gray-600">Total Modules</span>
                                    <span className="font-bold text-blue-600">{user.score?.length || 0}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                                    <span className="text-gray-600">Best Score</span>
                                    <span className="font-bold text-green-600">
                                        {Math.max(...(user.score?.map(s => s.score) || [0]))}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                                    <span className="text-gray-600">Certifications</span>
                                    <span className="font-bold text-yellow-600">{user.certifications?.length || 0}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
