import { useState } from 'react';
import { User, Lock, AlertCircle } from 'lucide-react';
// import axios from 'axios';
import { useEffect } from "react";
import { useUser } from '../contexts/UserContext';
import {login} from '../services/api'

export default function Login({ setToken }) {
    const [ka_id, setKaId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useUser();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await login(ka_id, password);
            setToken(res.data.token);
            console.log(res.data.data);
            setUser(res.data.data);
            localStorage.setItem('user', JSON.stringify(res.data.data));
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };



    function useTypewriter(text, speed = 50) {
        const [displayedText, setDisplayedText] = useState("");

        useEffect(() => {
            let currentIndex = 0;

            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayedText((prev) => prev + text.charAt(currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, speed);

            return () => clearInterval(interval);
        }, [text, speed]);

        return displayedText;
    }

    const typedText = useTypewriter("Trailblazers of Digital Transformation", 60);
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* 🔷 Left Side - Logo and Tagline */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    {/* Bigger Logo */}
                    <img
                        src="https://kanini.com/wp-content/uploads/2022/06/Kanini-Logo.svg"
                        alt="Kanini Logo"
                        className="w-[280px] mb-6"
                    />

                    {/* Bigger Tagline */}
                    <p className="text-xl text-gray-700 font-bold tracking-wide mb-4">
                        {typedText}
                    </p>

                    {/* Bigger Description */}
                    <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                        Welcome to Kanini's Interns Leaderboard a smart platform that tracks intern progress, performance, and engagement. Stay updated, stay ahead.
                    </p>
                </div>

                {/* 🔷 Right Side - Login Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* KA ID Input */}
                        <div>
                            <label htmlFor="ka_id" className="block text-sm font-semibold text-gray-700 mb-2">
                                KA ID
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="ka_id"
                                    type="text"
                                    value={ka_id}
                                    onChange={(e) => setKaId(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                                    placeholder="Enter your KA ID"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                <span className="text-sm text-red-700">{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#0A0A23] hover:bg-[#1a1a40] text-white py-3 px-6 rounded-md font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <span className="text-xl">→</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Help */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-500">
                            Need help? Contact your administrator
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
