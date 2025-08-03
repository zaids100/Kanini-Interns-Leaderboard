import React, { useEffect, useState } from 'react';
import { User, Award, Trophy, Star, Mail, Car as IdCard } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getInternById } from '../services/api'; // Adjust the import based on your file structure

export default function ProfileCard() {
    const { ka_id } = useParams();
    const [intern, setIntern] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchIntern = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const res = await getInternById(ka_id, token);
                setIntern(res.data.intern);
            } catch (error) {
                setIntern(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchIntern();
    }, [ka_id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading profile...</p>
            </div>
        );
    }

    if (!intern) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Intern not found.</p>
            </div>
        );
    }

    // Destructure intern data
    const { name, ka_id: internKaId, score = [], achievements = [], profilePic = '', _id: id } = intern;

    const getTotalScore = () => {
        return score.reduce((total, module) => total + module.score, 0);
    };

    const getMaxScore = () => {
        return score.length * 100;
    };

    const getPercentage = () => {
        const total = getTotalScore();
        const max = getMaxScore();
        return max > 0 ? ((total / max) * 100).toFixed(1) : 0;
    };

    // Get highest scoring module
    const getTopModule = () => {
        if (score.length === 0) return null;
        return score.reduce((prev, current) => 
            prev.score > current.score ? prev : current
        );
    };

    const topModule = getTopModule();
    const percentage = getPercentage();

    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white relative">
                <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-xs font-semibold">ID: {ka_id}</span>
                    </div>
                </div>
                
                <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                        <img
                            src={profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=ffffff&size=120`}
                            alt={`${name}'s profile`}
                            className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-1">{name}</h2>
                    <p className="text-blue-100 text-sm">Software Development Intern</p>
                </div>
            </div>

            {/* Main content */}
            <div className="p-6">
                {/* Overall Score Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                            Overall Performance
                        </h3>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
                            <div className="text-sm text-gray-500">{getTotalScore()}/{getMaxScore()}</div>
                        </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                    </div>
                    
                    {topModule && (
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Top Module:</span> {topModule.moduleName} ({topModule.score}/100)
                        </p>
                    )}
                </div>

                {/* Module Scores */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <Star className="w-5 h-5 text-blue-500 mr-2" />
                        Module Scores
                    </h3>
                    
                    {score.length > 0 ? (
                        <div className="space-y-3">
                            {score.map((module) => (
                                <div key={module.moduleNumber} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{module.moduleName}</h4>
                                            <p className="text-sm text-gray-500">Module {module.moduleNumber}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-gray-900">{module.score}</div>
                                            <div className="text-sm text-gray-500">/ 100</div>
                                        </div>
                                    </div>
                                    
                                    {/* Module progress bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all duration-500 ease-out ${
                                                module.score >= 90 ? 'bg-green-500' :
                                                module.score >= 75 ? 'bg-blue-500' :
                                                module.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                            style={{ width: `${module.score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4 text-gray-500">
                            <Star className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p>No module scores available</p>
                        </div>
                    )}
                </div>

                {/* Achievements */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <Award className="w-5 h-5 text-green-500 mr-2" />
                        Achievements
                    </h3>
                    
                    {achievements.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {achievements.map((achievement, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                                >
                                    <Award className="w-3 h-3 mr-1" />
                                    {achievement}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4 text-gray-500">
                            <Award className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p>No achievements yet</p>
                        </div>
                    )}
                </div>

                {/* Contact Info */}
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                            <IdCard className="w-4 h-4 mr-2" />
                            <span>Profile ID: {id.substring(0, 8)}...</span>
                        </div>
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            <span>Intern</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}