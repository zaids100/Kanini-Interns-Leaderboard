import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function QuickStats({ user }) {
    const bestScore = Math.max(...(user.score?.map(s => s.score) || [0]));

    return (
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
                    <span className="font-bold text-green-600">{bestScore}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-gray-600">Certifications</span>
                    <span className="font-bold text-yellow-600">{user.certifications?.length || 0}</span>
                </div>
            </div>
        </div>
    );
}

