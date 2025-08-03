import React from 'react';
import { useUser } from '../contexts/UserContext';
import { User, Mail, Award, Code, TrendingUp, Star, Trophy, Target } from 'lucide-react';
import { uploadProfilePic } from '../services/api'
export default function Profile() {
    const { user, setUser } = useUser();

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
                const token = localStorage.getItem('token');
                const response = await uploadProfilePic(file, token);
                console.log("Upload successful:", response.data);

                if (response.data?.imageUrl) {
                    setUser(prev => ({ ...prev, profilePic: response.data.imageUrl }));
                }
            } catch (error) {
                console.error("Upload failed:", error);
            }
        }
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
                            <div className="flex items-center space-x-3 mb-6">
                                <Trophy className="text-yellow-600" size={24} />
                                <h2 className="text-2xl font-bold">Achievements</h2>
                            </div>
                            {user.achievements?.length ? (
                                <div className="space-y-3">
                                    {user.achievements.map((achievement, idx) => (
                                        <div
                                            key={idx}
                                            className="group hover:bg-yellow-50 rounded-xl p-4 border border-gray-300 hover:border-yellow-300 transition-all duration-300 cursor-pointer"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Award size={20} className="text-white" />
                                                </div>
                                                <span className="font-medium group-hover:text-yellow-600 transition-colors duration-300">
                                                    {achievement}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Award size={48} className="text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No achievements yet</p>
                                    <p className="text-sm text-gray-500 mt-2">Keep working to unlock achievements!</p>
                                </div>
                            )}
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
                                    <span className="text-gray-600">Achievements</span>
                                    <span className="font-bold text-yellow-600">{user.achievements?.length || 0}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
