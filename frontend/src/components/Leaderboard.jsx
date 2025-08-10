import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext'
import { getAllInterns } from '../services/api';
import { useNavigate } from 'react-router-dom';
import LeaderboardHeader from './LeaderboardHeader';
import SortDropdown from './SortDropdown';
import LeaderboardTable from './LeaderboardTable';
import EmptyState from './EmptyState';
import LeaderboardLoading from './LeaderboardLoading';
// import TokenDebug from './TokenDebug';

export default function Leaderboard() {
    const [interns, setInterns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('overall');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, token, setUser, setToken } = useUser();
    const navigate = useNavigate();

    // Debug logging for token state
    // console.log('Leaderboard - Component rendered with token:', token ? 'Present' : 'Missing');
    // console.log('Leaderboard - Token details:', token ? { length: token.length, start: token.substring(0, 20) + '...' } : 'No token');
    
    // Debug function to check token state
    // const debugTokenState = () => {
    //     console.log('=== DEBUG TOKEN STATE ===');
    //     console.log('Context token:', token ? 'Present' : 'Missing');
    //     console.log('localStorage token:', localStorage.getItem('token') ? 'Present' : 'Missing');
    //     console.log('Context user:', user ? 'Present' : 'Missing');
    //     console.log('localStorage user:', localStorage.getItem('user') ? 'Present' : 'Missing');
        
    //     // Test API call with current token
    //     if (token) {
    //         console.log('Testing API call with current token...');
    //         getAllInterns(token)
    //             .then(res => {
    //                 console.log('✅ API call successful:', res.data);
    //             })
    //             .catch(err => {
    //                 console.error('❌ API call failed:', err.response?.status, err.response?.data);
    //             });
    //     }
    //     console.log('=======================');
    // };

    // Log initial token state once
    useEffect(() => {
        console.log('Leaderboard - Initial mount - Token state:', {
            contextToken: token ? 'Present' : 'Missing',
            localStorageToken: localStorage.getItem('token') ? 'Present' : 'Missing',
            tokenLength: token ? token.length : 0
        });
        
        // Check if token exists in localStorage but not in context
        const storedToken = localStorage.getItem('token');
        if (storedToken && !token) {
            console.log('🚨 DISCREPANCY: Token exists in localStorage but not in context!');
            console.log('localStorage token:', storedToken.substring(0, 20) + '...');
        }
    }, []); // Empty dependency array - runs only once

    useEffect(() => {
        console.log('Leaderboard - useEffect triggered with token:', token ? 'Present' : 'Missing');
        console.log('Leaderboard - useEffect token details:', token ? { length: token.length, start: token.substring(0, 20) + '...' } : 'No token');
        
        const fetchInterns = async () => {
            if (!token) {
                console.log('No token available, skipping fetch');
                setIsLoading(false);
                return;
            }

            try {
                console.log('Leaderboard - Attempting to fetch interns with token');
                console.log('Leaderboard - Token before API call:', token.substring(0, 20) + '...');
                const res = await getAllInterns(token);
                setInterns(res.data.interns);
                console.log('Fetched interns:', res.data.interns);
                console.log('Sample intern score structure:', res.data.interns[0]?.score);
            } catch (error) {
                console.error('Error fetching interns:', error);
                if (error.response?.status === 401) {
                    console.error('Authentication failed - token might be invalid');
                    // Temporarily disable aggressive token clearing for debugging
                    // setToken(null);
                    // setUser(null);
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('user');
                    console.log('401 error - token clearing disabled for debugging');
                }
                setInterns([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInterns();
    }, [token, setToken, setUser]);

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
        navigate('/');
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const getTotalScore = (scores) => {
        return scores.reduce((total, score) => total + score.score, 0);
    };

    const getMaxScore = (scores) => {
        return scores.length * 100;
    };

    const getModuleScore = (scoreArray, moduleNumber) => {
        const module = scoreArray.find((s) => s.moduleNumber === moduleNumber.toString());
        return module ? module.score : 0;
    };

    // Get all unique modules from interns data
    const getAllModules = () => {
        const modules = new Set();
        interns.forEach(intern => {
            intern.score.forEach(score => {
                modules.add(score.moduleNumber);
            });
        });
        const sortedModules = Array.from(modules).sort((a, b) => parseInt(a) - parseInt(b));
        console.log('Available modules:', sortedModules);
        return sortedModules;
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
            console.log('Sorting by module:', moduleNumber);
            
            // Filter out interns who don't have this module, then sort
            const internsWithModule = sortedData.filter(intern => {
                const hasModule = intern.score.some(s => s.moduleNumber === moduleNumber.toString());
                console.log(`${intern.name} has module ${moduleNumber}:`, hasModule);
                return hasModule;
            });
            
            console.log('Interns with module:', internsWithModule.length);
            
            return internsWithModule.sort((a, b) => {
                const scoreA = getModuleScore(a.score, moduleNumber);
                const scoreB = getModuleScore(b.score, moduleNumber);
                console.log(`${a.name}: ${scoreA}, ${b.name}: ${scoreB}`);
                return scoreB - scoreA;
            });
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
        return <LeaderboardLoading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <LeaderboardHeader 
                user={user}
                onLogout={handleLogout}
                onProfileClick={handleProfileClick}
                // onDebugClick={debugTokenState}
            />

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
                {sortedInterns.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        <SortDropdown
                            sortBy={sortBy}
                            isDropdownOpen={isDropdownOpen}
                            setIsDropdownOpen={setIsDropdownOpen}
                            sortOptions={sortOptions}
                            currentSortLabel={currentSortLabel}
                            onSortChange={handleSortChange}
                            internCount={sortedInterns.length}
                        />
                        
                        <LeaderboardTable
                            sortedInterns={sortedInterns}
                            sortBy={sortBy}
                            getModuleScore={getModuleScore}
                            getTotalScore={getTotalScore}
                            getMaxScore={getMaxScore}
                        />
                    </>
                )}
            </div>

            {/* Debug component */}
            {/* <TokenDebug /> */}

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