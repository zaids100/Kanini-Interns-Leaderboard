import InternRow from "./InternRow";

export default function LeaderboardTable({ 
  sortedInterns, 
  sortBy, 
  getModuleScore, 
  getTotalScore, 
  getMaxScore 
}) {
  const showScoreColumn = sortBy === 'overall';

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
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
                Certifications
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Module Scores
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Communication
              </th>
              {showScoreColumn && (
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Score
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedInterns.map((intern, index) => (
              <InternRow
                key={intern.ka_id}
                intern={intern}
                index={index}
                sortBy={sortBy}
                getModuleScore={getModuleScore}
                getTotalScore={getTotalScore}
                getMaxScore={getMaxScore}
                showScoreColumn={showScoreColumn}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
