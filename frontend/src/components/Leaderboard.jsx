import { useEffect, useState } from 'react';
import { Medal, Award, User, LogOut, Crown, Star, ChevronDown } from 'lucide-react';
import { useUser } from '../contexts/UserContext'
import { getAllInterns } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Leaderboard({ token }) {
    const [interns, setInterns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('overall');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchInterns = async () => {
            try {
                const res = await getAllInterns(token);
                setInterns(res.data.interns);
                console.log(user);
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
        localStorage.removeItem('user');
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

    const getMaxScore = (scores) => {
        return scores.length * 100;
    };

    const getModuleScore = (scoreArray, moduleNumber) => {
        const module = scoreArray.find((s) => s.moduleNumber === moduleNumber);
        return module ? module.score : '-';
    };

    // Get all unique modules from interns data
    const getAllModules = () => {
        const modules = new Set();
        interns.forEach(intern => {
            intern.score.forEach(score => {
                modules.add(score.moduleNumber);
            });
        });
        return Array.from(modules).sort((a, b) => a - b);
    };

    const availableModules = getAllModules();

    // Sort interns based on selected criteria
    const getSortedInterns = () => {
        const sortedData = [...interns];

        if (sortBy === 'overall') {
            return sortedData.sort((a, b) => getTotalScore(b.score) - getTotalScore(a.score));
        } else {
            // Sort by specific module
            const moduleNumber = parseInt(sortBy.replace('module-', ''));
            return sortedData.sort((a, b) =>
                getModuleScore(b.score, moduleNumber) - getModuleScore(a.score, moduleNumber)
            );
        }
    };

    const sortedInterns = getSortedInterns();

    // Get sort options
    const getSortOptions = () => {
        const options = [
            { value: 'overall', label: 'Overall Score' }
        ];

        availableModules.forEach(moduleNum => {
            const moduleData = interns.find(intern =>
                intern.score.find(s => s.moduleNumber === moduleNum)
            )?.score.find(s => s.moduleNumber === moduleNum);
            const moduleName = moduleData?.moduleName || `Module ${moduleNum}`;
            options.push({
                value: `module-${moduleNum}`,
                label: moduleName
            });
        });

        return options;
    };

    const sortOptions = getSortOptions();
    const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Overall Score';

    const handleSortChange = (value) => {
        setSortBy(value);
        setIsDropdownOpen(false);
    };

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
            <div className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 w-full z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
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

                        <div className="flex items-center space-x-4">
                            {/* Profile Button */}
                            <button
                                onClick={() => window.location.href = "/profile"}
                                className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                            >
                                <img
                                    src={user?.profilePic || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                                    alt="Profile"
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                                <span>My Profile</span>
                            </button>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
                {sortedInterns.length === 0 ? (
                    <div className="text-center py-12">
                        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No interns found</h3>
                        <p className="text-gray-600">Check back later for leaderboard updates.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        {/* Stats Header with Sort Dropdown */}
                        <div className="bg-gradient-to-r from-[#B3D334] via-[#00AEEF] to-[#0077C8] p-4 text-white rounded-lg px-6 py-4">
                            <div className="flex items-center justify-between text-white">
                                <div className="flex items-center space-x-4">
                                    <h2 className="text-xl font-semibold">Rankings</h2>

                                    {/* Sort Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20 cursor-pointer"
                                        >
                                            <span className="text-sm font-medium">Sort by: {currentSortLabel}</span>
                                            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                                <div className="py-2">
                                                    {sortOptions.map((option) => (
                                                        <button
                                                            key={option.value}
                                                            onClick={() => handleSortChange(option.value)}
                                                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${sortBy === option.value
                                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                                : 'text-gray-700 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

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
                                            {sortBy === 'overall' ? 'Total Score' : 'Module Score'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {sortedInterns.map((intern, index) => {
                                        const totalScore = getTotalScore(intern.score);
                                        const maxScore = getMaxScore(intern.score);
                                        const percentage = ((totalScore / maxScore) * 100).toFixed(1);
                                        const isBottomFive = index >= sortedInterns.length - 5 && percentage < 85;

                                        // Get current display score
                                        let displayScore;
                                        if (sortBy === 'overall') {
                                            displayScore = `${percentage}%`;
                                        } else if (sortBy.startsWith('module-')) {
                                            const moduleNumber = parseInt(sortBy.replace('module-', ''));
                                            displayScore = getModuleScore(intern.score, moduleNumber);
                                        } else {
                                            displayScore = '-';
                                        }

                                        return (
                                            <tr
                                                key={intern.ka_id}
                                                className={`transition-colors ${isBottomFive ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}
                                            >
                                                {/* Rank */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {getRankIcon(index)}
                                                    </div>
                                                </td>

                                                {/* Intern Info */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-3">
                                                        <img
                                                            src={intern.profilePic || 'https://ui-avatars.com/api/?name=' + intern.name}
                                                            alt={`${intern.name}'s profile`}
                                                            className="w-10 h-10 rounded-full object-cover border"
                                                        />
                                                        <div>
                                                            <div
                                                                className="text-sm font-semibold text-gray-900 cursor-pointer"
                                                                onClick={() => navigate(`/profile-card/${intern.ka_id}`)}
                                                            >
                                                                {intern.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">ID: {intern.ka_id}</div>
                                                        </div>
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
                                                        {intern.score.map((s) => {
                                                            const isCurrentSort = sortBy === `module-${s.moduleNumber}`;
                                                            return (
                                                                <div
                                                                    key={s.moduleNumber}
                                                                    className={`flex items-center justify-between px-3 py-1 rounded-lg ${isCurrentSort ? 'bg-blue-100 border border-blue-200' : 'bg-gray-50'
                                                                        }`}
                                                                >
                                                                    <span className="text-sm text-gray-700 font-medium">
                                                                        {s.moduleName} (M{s.moduleNumber})
                                                                    </span>
                                                                    <span className={`text-sm font-semibold ${isCurrentSort ? 'text-blue-700' : 'text-blue-600'
                                                                        }`}>
                                                                        {s.score}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </td>

                                                {/* Display Score */}
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {displayScore}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Click outside to close dropdown */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </div>
    );
}