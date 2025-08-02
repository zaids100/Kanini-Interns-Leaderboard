import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Award, User, LogOut, Crown, Star } from 'lucide-react';
import axios from 'axios';

export default function Leaderboard({ token }) {
    const [interns, setInterns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInterns = async () => {
            try {
                const res = await axios.get('http://localhost:3000/leaderboard/all', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setInterns(res.data.interns);
            } catch (error) {
                setInterns([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInterns();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    const getRankIcon = (index) => {
        switch (index) {
            case 0:
                return <Crown className="w-6 h-6 text-yellow-500" />;
            case 1:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 2:
                return <Award className="w-6 h-6 text-orange-500" />;
            default:
                return <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm font-semibold text-gray-600">{index + 1}</div>;
        }
    };

    const getTotalScore = (scores) => {
        return scores.reduce((total, score) => total + score.score, 0);
    };

    const sortedInterns = [...interns].sort((a, b) => getTotalScore(b.score) - getTotalScore(a.score));

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600">Loading leaderboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                                <img
                                    src="https://kanini.com/wp-content/uploads/2022/06/Kanini-Logo.svg"
                                    alt="Kanini Logo"
                                    className="h-10 w-auto"
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Intern Leaderboard</h1>
                                <p className="text-sm text-gray-600">Track achievements and scores</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {sortedInterns.length === 0 ? (
                    <div className="text-center py-12">
                        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No interns found</h3>
                        <p className="text-gray-600">Check back later for leaderboard updates.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        {/* Stats Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                            <div className="flex items-center justify-between text-white">
                                <h2 className="text-xl font-semibold">Rankings</h2>
                                <div className="flex items-center space-x-2">
                                    <Star className="w-5 h-5" />
                                    <span className="text-sm">{sortedInterns.length} Interns</span>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Rank
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Intern
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Achievements
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Module Scores
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Total Score
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {sortedInterns.map((intern, index) => (
                                        <tr key={intern.ka_id} className="hover:bg-gray-50 transition-colors">
                                            {/* Rank */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getRankIcon(index)}
                                                </div>
                                            </td>

                                            {/* Intern Info */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">{intern.name}</div>
                                                    <div className="text-sm text-gray-500">ID: {intern.ka_id}</div>
                                                </div>
                                            </td>

                                            {/* Achievements */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {intern.achievements.length > 0 ? (
                                                        intern.achievements.map((achievement, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                                            >
                                                                {achievement}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-gray-400">No achievements yet</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Module Scores */}
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    {intern.score.map((s) => (
                                                        <div key={s.moduleNumber} className="flex items-center justify-between bg-gray-50 px-3 py-1 rounded-lg">
                                                            <span className="text-sm text-gray-700 font-medium">
                                                                {s.moduleName} (M{s.moduleNumber})
                                                            </span>
                                                            <span className="text-sm font-semibold text-blue-600">
                                                                {s.score}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>

                                            {/* Total Score */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="text-lg font-bold text-gray-900">
                                                    {getTotalScore(intern.score)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}