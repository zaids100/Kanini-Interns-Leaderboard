import React from 'react';
import { Code } from 'lucide-react';

export default function LeetcodeStats({ user }) {
    const totalProblems = (user.leetcode_stats?.easy || 0) + (user.leetcode_stats?.medium || 0) + (user.leetcode_stats?.hard || 0);

    return (
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
                    Total: <span className="font-semibold">{totalProblems}</span> problems solved
                </div>
            </div>
        </div>
    );
}


