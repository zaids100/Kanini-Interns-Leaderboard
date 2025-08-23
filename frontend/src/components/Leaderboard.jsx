import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { getAllInterns } from '../services/api';
import { useNavigate } from 'react-router-dom';
import LeaderboardHeader from './LeaderboardHeader';
import SortDropdown from './SortDropdown';
import LeaderboardTable from './LeaderboardTable';
import EmptyState from './EmptyState';
import LeaderboardLoading from './LeaderboardLoading';

export default function Leaderboard() {
    const [interns, setInterns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('overall');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [batch, setBatch] = useState(1); // batch state

    const { user, token, setUser, setToken } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInterns = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const res = await getAllInterns(token, batch);
                setInterns(res.data.interns);
            } catch (error) {
                console.error('Error fetching interns:', error);
                setInterns([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInterns();
    }, [token, batch]);

    const handleLogout = () => {
        setToken(null);
        setUser(null);
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

    const getAllModules = () => {
        const modules = new Set();
        interns.forEach(intern => {
            intern.score.forEach(score => {
                modules.add(score.moduleNumber);
            });
        });
        return Array.from(modules).sort((a, b) => parseInt(a) - parseInt(b));
    };

    const availableModules = getAllModules();

    const getSortedInterns = () => {
        const sortedData = [...interns];

        if (sortBy === 'overall') {
            return sortedData.sort((a, b) => getTotalScore(b.score) - getTotalScore(a.score));
        } else {
            const moduleNumber = parseInt(sortBy.replace('module-', ''));
            const internsWithModule = sortedData.filter(intern =>
                intern.score.some(s => s.moduleNumber === moduleNumber.toString())
            );

            return internsWithModule.sort((a, b) => {
                const scoreA = getModuleScore(a.score, moduleNumber);
                const scoreB = getModuleScore(b.score, moduleNumber);
                return scoreB - scoreA;
            });
        }
    };

    const sortedInterns = getSortedInterns();

    const getSortOptions = () => {
        const options = [{ value: 'overall', label: 'Overall Score' }];
        availableModules.forEach(moduleNum => {
            const moduleData = interns.find(intern =>
                intern.score.find(s => s.moduleNumber === moduleNum)
            )?.score.find(s => s.moduleNumber === moduleNum);
            const moduleName = moduleData?.moduleName || `Module ${moduleNum}`;
            options.push({ value: `module-${moduleNum}`, label: moduleName });
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
                batch={batch}
                setBatch={setBatch}
            />

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

            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </div>
    );
}
