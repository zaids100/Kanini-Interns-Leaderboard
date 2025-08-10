import React from 'react';
import { Code } from 'lucide-react';

export default function ModulePerformance({ user }) {
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

    return (
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
    );
}
