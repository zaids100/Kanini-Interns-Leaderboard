import React from 'react';
import { Mail, Target, Star } from 'lucide-react';

export default function ProfileHeader({ user, onFileChange }) {
    return (
        <div className="bg-gray-100 rounded-3xl shadow-lg border border-gray-300 p-8 mb-8">
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <div className="relative group cursor-pointer">
                        <label htmlFor="profile-pic-upload">
                            <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center hover:opacity-80 transition">
                                <img
                                    src={user.profilePic || "https://i.pravatar.cc/150?img=11"}
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
                            onChange={onFileChange}
                        />
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
                    <div className="text-3xl font-bold text-gray-700">
                        {user.averageScore || 0}
                    </div>
                    <div className="text-sm text-gray-500">Percentage</div>
                </div>
            </div>
        </div>
    );
}

