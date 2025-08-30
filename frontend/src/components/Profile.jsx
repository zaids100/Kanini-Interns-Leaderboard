import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { uploadProfilePic, addCertificationToIntern, updateCertificationForIntern, deleteCertificationForIntern } from '../services/api';
import ProfileHeader from './ProfileHeader';
import ModulePerformance from './ModulePerformance';
import CertificationsSection from './CertificationsSection';
import LeetcodeStats from './LeetcodeStats';
import QuickStats from './QuickStats';
import CommunicationSection from './CommunicationSection';

export default function Profile() {
    const { user, setUser, token, setToken } = useUser();

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

    // Calculate average score
    const averageScore = user.score && user.score.length > 0
        ? user.score.reduce((acc, s) => acc + s.score, 0) / user.score.length
        : 0;

    const roundedAvg = Math.round(averageScore * 100) / 100;

    // Add averageScore to user object for ProfileHeader
    const userWithAvg = { ...user, averageScore: roundedAvg };

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

    const handleCertificationUpdate = async (action, certificationName, editForm) => {
        try {
            let response;
            
            if (action === 'add') {
                response = await addCertificationToIntern(user.ka_id, certificationName, token);
            } else if (action === 'edit') {
                response = await updateCertificationForIntern(user.ka_id, certificationName, editForm, token);
            } else if (action === 'delete') {
                response = await deleteCertificationForIntern(user.ka_id, certificationName, token);
            }
            
            if (response?.data?.certifications) {
                const updatedUser = { ...user };
                updatedUser.certifications = response.data.certifications;
                setUser(updatedUser);
            }
        } catch (error) {
            console.error(`Error ${action}ing certification:`, error);
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
            throw error;
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <ProfileHeader user={userWithAvg} onFileChange={handleFileChange} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ModulePerformance user={user} />
                    </div>

                    <div className="space-y-8">
                        <CertificationsSection 
                            user={user} 
                            onCertificationUpdate={handleCertificationUpdate} 
                        />
                        <LeetcodeStats user={user} />
                        <QuickStats user={user} />
                        <CommunicationSection user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
}
