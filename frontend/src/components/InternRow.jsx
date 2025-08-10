import { useNavigate } from "react-router-dom";
import RankIcon from "./RankIcon";

export default function InternRow({ 
  intern, 
  index, 
  sortBy, 
  getModuleScore, 
  getTotalScore, 
  getMaxScore,
  showScoreColumn
}) {
  const navigate = useNavigate();
  const totalScore = getTotalScore(intern.score);
  const maxScore = getMaxScore(intern.score);
  const percentage = ((totalScore / maxScore) * 100).toFixed(1);
  const isBottomFive = index >= 5 && percentage < 85;

  return (
    <tr
      className="transition-colors hover:bg-gray-50"
    >
      {/* Rank */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <RankIcon rank={index + 1} />
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

      {/* Certifications */}
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {intern.certifications && intern.certifications.length > 0 ? (
            intern.certifications.map((cert, idx) => (
              <a
                key={idx}
                href={cert.certificate_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors cursor-pointer"
              >
                {cert.certification_name}
              </a>
            ))
          ) : (
            <span className="text-sm text-gray-400">No certifications yet</span>
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
                className={`flex items-center justify-between px-3 py-1 rounded-lg ${
                  isCurrentSort ? 'bg-blue-100 border border-blue-200' : 'bg-gray-50'
                }`}
              >
                <span className="text-sm text-gray-700 font-medium">
                  {s.moduleName} (M{s.moduleNumber})
                </span>
                <span className={`text-sm font-semibold ${
                  isCurrentSort ? 'text-blue-700' : 'text-blue-600'
                }`}>
                  {s.score}
                </span>
              </div>
            );
          })}
        </div>
      </td>

      {/* Display Score - Only show when sorting by overall */}
      {showScoreColumn && (
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <div className="text-lg font-bold text-gray-900">
            {`${percentage}%`}
          </div>
        </td>
      )}
    </tr>
  );
}
