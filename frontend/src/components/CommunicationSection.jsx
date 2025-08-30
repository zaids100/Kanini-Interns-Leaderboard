import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function CommunicationSection({ user }) {
    if (!user.communication) {
        return (
            <div className="bg-gray-100 rounded-3xl shadow-lg border border-gray-300 p-8">
                <div className="flex items-center space-x-3 mb-6">
                    <MessageSquare className="text-blue-600" size={24} />
                    <h2 className="text-2xl font-bold">Communication</h2>
                </div>
                <p className="text-sm text-gray-500">No communication data available.</p>
            </div>
        );
    }

    const { grammar, proactiveness, fluency } = user.communication;

    // --- Helper for metric colors ---
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

    // --- Total percentage ---
    const total = grammar + proactiveness + fluency;
    const maxTotal = 50;
    const commsPercent = ((total / maxTotal) * 100).toFixed(1);

    let percentColor = "text-green-600";
    if (commsPercent < 60.5) percentColor = "text-red-600";
    else if (commsPercent <= 79.4) percentColor = "text-yellow-600";

    return (
        <div className="bg-gray-100 rounded-3xl shadow-lg border border-gray-300 p-8">
            <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold">Communication</h2>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-gray-600">Grammar</span>
                    <span className={`font-bold ${getColor("Grammar", grammar)}`}>
                        {grammar} / 20
                    </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-gray-600">Proactiveness</span>
                    <span className={`font-bold ${getColor("Proactiveness", proactiveness)}`}>
                        {proactiveness} / 20
                    </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-gray-600">Fluency</span>
                    <span className={`font-bold ${getColor("Fluency", fluency)}`}>
                        {fluency} / 10
                    </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-gray-600">Total</span>
                    <span className={`font-bold ${percentColor}`}>
                        {commsPercent}%
                    </span>
                </div>
            </div>
        </div>
    );
}
