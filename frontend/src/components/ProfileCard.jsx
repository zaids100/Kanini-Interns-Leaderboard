import React, { useEffect, useState } from 'react';
import { User, Award, Trophy, Star, IdCard, Code, MessageSquare } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getInternById } from '../services/api'; 
import { useUser } from '../contexts/UserContext';

export default function ProfileCard() {
    const { ka_id } = useParams();
    const { token, setToken, setUser } = useUser();
    const [intern, setIntern] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchIntern = async () => {
            if (!token) return;
            try {
                const res = await getInternById(ka_id, token);
                setIntern(res.data.intern);
            } catch (error) {
                console.error('Error fetching intern:', error);
                if (error.response?.status === 401) {
                    setToken(null);
                    setUser(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
                setIntern(null);
            } finally {
                setIsLoading(false);
            }
        };
        if (token) fetchIntern();
        else setIsLoading(false);
    }, [ka_id, token, setToken, setUser]);

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">Authentication token missing. Please log in again.</p>
            </div>
        );
    }

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

    const { name, ka_id: internKaId, score = [], certifications = [], leetcode_stats = { easy: 0, medium: 0, hard: 0 }, profilePic = '', _id: id, communication } = intern;

    const getTotalScore = () => score.reduce((total, module) => total + module.score, 0);
    const getMaxScore = () => score.length * 100;
    const getPercentage = () => {
        const total = getTotalScore();
        const max = getMaxScore();
        return max > 0 ? ((total / max) * 100).toFixed(1) : 0;
    };
    const topModule = score.length ? score.reduce((p, c) => (p.score > c.score ? p : c)) : null;
    const percentage = getPercentage();

    // --- Communication Helpers ---
    const getColor = (label, value) => {
        if (label === "Fluency") {
            if (value <= 6.4) return "text-red-600";
            if (value <= 8.4) return "text-yellow-600";
            return "text-green-600";
        } else {
            if (value < 12.5) return "text-red-600";
            if (value <= 16.4) return "text-yellow-600";
            return "text-green-600";
        }
    };

    let commsPercent = 0;
    let percentColor = "text-green-600";
    if (communication) {
        const total = (communication.grammar || 0) + (communication.proactiveness || 0) + (communication.fluency || 0);
        commsPercent = ((total / 50) * 100).toFixed(1);
        if (commsPercent < 60.5) percentColor = "text-red-600";
        else if (commsPercent <= 79.4) percentColor = "text-yellow-600";
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white relative">
                <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-xs font-semibold">ID: {ka_id}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <img
                        src={profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=ffffff&size=120`}
                        alt={`${name}'s profile`}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-1">{name}</h2>
                    <p className="text-blue-100 text-sm">Software Development Intern</p>
                </div>
            </div>

            {/* Main content */}
            <div className="p-6">
                {/* Overall Score */}
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
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                    </div>
                    {topModule && (
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Top Module:</span> {topModule.moduleName} ({topModule.score}/100)
                        </p>
                    )}
                </div>

                {/* Leetcode Stats */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <Code className="w-5 h-5 text-orange-500 mr-2" />
                        Leetcode Stats
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-green-600">{leetcode_stats.easy || 0}</div>
                            <div className="text-xs text-green-500">Easy</div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-yellow-600">{leetcode_stats.medium || 0}</div>
                            <div className="text-xs text-yellow-500">Medium</div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-red-600">{leetcode_stats.hard || 0}</div>
                            <div className="text-xs text-red-500">Hard</div>
                        </div>
                    </div>
                    <div className="mt-3 text-center text-sm text-gray-600">
                        Total: <span className="font-semibold">{(leetcode_stats.easy||0)+(leetcode_stats.medium||0)+(leetcode_stats.hard||0)}</span> problems solved
                    </div>
                </div>

                {/* Module Scores */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <Star className="w-5 h-5 text-blue-500 mr-2" />
                        Module Scores
                    </h3>
                    {score.length > 0 ? (
                        <div className="space-y-3">
                            {score.map((m) => (
                                <div key={m.moduleNumber} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{m.moduleName}</h4>
                                            <p className="text-sm text-gray-500">Module {m.moduleNumber}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-gray-900">{m.score}</div>
                                            <div className="text-sm text-gray-500">/ 100</div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${
                                                m.score >= 90 ? 'bg-green-500' :
                                                m.score >= 75 ? 'bg-blue-500' :
                                                m.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                            style={{ width: `${m.score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center py-4 text-gray-500">No module scores available</p>
                    )}
                </div>

                {/* Communication Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <MessageSquare className="w-5 h-5 text-blue-500 mr-2" />
                        Communication
                    </h3>
                    {communication ? (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                                <span className="text-gray-600">Grammar</span>
                                <span className={`font-bold ${getColor("Grammar", communication.grammar)}`}>
                                    {communication.grammar} / 20
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                                <span className="text-gray-600">Proactiveness</span>
                                <span className={`font-bold ${getColor("Proactiveness", communication.proactiveness)}`}>
                                    {communication.proactiveness} / 20
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                                <span className="text-gray-600">Fluency</span>
                                <span className={`font-bold ${getColor("Fluency", communication.fluency)}`}>
                                    {communication.fluency} / 10
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                                <span className="text-gray-600">Total</span>
                                <span className={`font-bold ${percentColor}`}>
                                    {commsPercent}%
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No communication data available</p>
                    )}
                </div>

                {/* Certifications */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <Award className="w-5 h-5 text-green-500 mr-2" />
                        Certifications
                    </h3>
                    {certifications.length > 0 ? (
                        <div className="space-y-2">
                            {certifications.map((cert, i) => (
                                <a key={i} href={cert.certificate_link} target="_blank" rel="noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200 hover:bg-green-200 transition-colors">
                                    <Award className="w-3 h-3 mr-1" />
                                    {cert.certification_name}
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center py-4 text-gray-500">No certifications yet</p>
                    )}
                </div>

                {/* Contact */}
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
