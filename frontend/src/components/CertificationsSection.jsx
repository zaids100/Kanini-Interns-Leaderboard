import React, { useState } from 'react';
import { Trophy, Plus, Award, Edit, Trash2 } from 'lucide-react';

export default function CertificationsSection({ user, onCertificationUpdate }) {
    const [isAddingCertification, setIsAddingCertification] = useState(false);
    const [editingCertification, setEditingCertification] = useState(null);
    const [newCertification, setNewCertification] = useState({ certification_name: '', certificate_link: '' });
    const [editForm, setEditForm] = useState({ certification_name: '', certificate_link: '' });

    const handleAddCertification = async () => {
        if (!newCertification.certification_name || !newCertification.certificate_link) {
            alert('Please fill in both fields');
            return;
        }

        try {
            await onCertificationUpdate('add', newCertification);
            setNewCertification({ certification_name: '', certificate_link: '' });
            setIsAddingCertification(false);
        } catch (error) {
            console.error('Error adding certification:', error);
        }
    };

    const handleEditCertification = async () => {
        if (!editForm.certification_name || !editForm.certificate_link) {
            alert('Please fill in both fields');
            return;
        }

        try {
            await onCertificationUpdate('edit', editingCertification.certification_name, editForm);
            setEditingCertification(null);
            setEditForm({ certification_name: '', certificate_link: '' });
        } catch (error) {
            console.error('Error updating certification:', error);
        }
    };

    const handleDeleteCertification = async (certificationName) => {
        if (!confirm('Are you sure you want to delete this certification?')) {
            return;
        }

        try {
            await onCertificationUpdate('delete', certificationName);
        } catch (error) {
            console.error('Error deleting certification:', error);
        }
    };

    const startEditing = (certification) => {
        setEditingCertification(certification);
        setEditForm({
            certification_name: certification.certification_name,
            certificate_link: certification.certificate_link
        });
    };

    const cancelEditing = () => {
        setEditingCertification(null);
        setEditForm({ certification_name: '', certificate_link: '' });
    };

    return (
        <div className="bg-gray-100 rounded-3xl shadow-lg border border-gray-300 p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <Trophy className="text-yellow-600" size={24} />
                    <h2 className="text-2xl font-bold">Certifications</h2>
                </div>
                <button
                    onClick={() => setIsAddingCertification(!isAddingCertification)}
                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    <Plus size={16} />
                    <span>Add</span>
                </button>
            </div>

            {/* Add Certification Form */}
            {isAddingCertification && (
                <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Add New Certification</h3>
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Certification Name"
                            value={newCertification.certification_name}
                            onChange={(e) => setNewCertification(prev => ({ ...prev, certification_name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            type="url"
                            placeholder="Certificate Link"
                            value={newCertification.certificate_link}
                            onChange={(e) => setNewCertification(prev => ({ ...prev, certificate_link: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={handleAddCertification}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                Add Certification
                            </button>
                            <button
                                onClick={() => {
                                    setIsAddingCertification(false);
                                    setNewCertification({ certification_name: '', certificate_link: '' });
                                }}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Certifications List */}
            {user.certifications?.length ? (
                <div className="space-y-3">
                    {user.certifications.map((cert, idx) => (
                        <div key={idx} className="group hover:bg-yellow-50 rounded-xl p-4 border border-gray-300 hover:border-yellow-300 transition-all duration-300">
                            {editingCertification && editingCertification.certification_name === cert.certification_name ? (
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Certification Name"
                                        value={editForm.certification_name}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, certification_name: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                    <input
                                        type="url"
                                        placeholder="Certificate Link"
                                        value={editForm.certificate_link}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, certificate_link: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleEditCertification}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition-colors duration-200 text-sm"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEditing}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors duration-200 text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Award size={20} className="text-white" />
                                        </div>
                                        <a
                                            href={cert.certificate_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium group-hover:text-yellow-600 transition-colors duration-300"
                                        >
                                            {cert.certification_name}
                                        </a>
                                    </div>
                                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button
                                            onClick={() => startEditing(cert)}
                                            className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors duration-200"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCertification(cert.certification_name)}
                                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <Award size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No certifications yet</p>
                    <p className="text-sm text-gray-500 mt-2">Keep working to earn certifications!</p>
                </div>
            )}
        </div>
    );
}
