import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
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
  
  return (
    <tr className="transition-colors hover:bg-gray-50">
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

      {/* Communication */}
      <td className="px-6 py-4 whitespace-nowrap">
        {intern.communication ? (
          <div className="space-y-2">
            {/* Grammar, Proactiveness, Fluency */}
            {[
              { label: "Grammar", value: intern.communication.grammar, max: 20 },
              { label: "Proactiveness", value: intern.communication.proactiveness, max: 20 },
              { label: "Fluency", value: intern.communication.fluency, max: 10 },
            ].map((item, idx) => {
              let color = "bg-green-100 text-green-800";

              if (
                (item.label !== "Fluency" && item.value < 12.5) ||
                (item.label === "Fluency" && item.value <= 6.4)
              ) {
                color = "bg-red-100 text-red-800";
              } else if (
                (item.label !== "Fluency" &&
                  item.value >= 12.5 &&
                  item.value <= 16.4) ||
                (item.label === "Fluency" &&
                  item.value >= 6.5 &&
                  item.value <= 8.4)
              ) {
                color = "bg-amber-100 text-amber-800";
              }

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-1 rounded-lg bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span
                    className={`text-sm font-semibold px-2 py-0.5 rounded-full ${color}`}
                  >
                    {item.value} / {item.max}
                  </span>
                </div>
              );
            })}

            {/* Total Communication Percentage */}
            {(() => {
              const total =
                intern.communication.grammar +
                intern.communication.proactiveness +
                intern.communication.fluency;
              const maxTotal = 20 + 20 + 10; // 50
              const commsPercent = ((total / maxTotal) * 100).toFixed(1);

              let color = "bg-green-100 text-green-800";
              if (commsPercent < 60.5) color = "bg-red-100 text-red-800";
              else if (commsPercent >= 60.5 && commsPercent <= 79.4)
                color = "bg-amber-100 text-amber-800";

              return (
                <div className="flex items-center justify-between px-3 py-1 rounded-lg bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">Total</span>
                  <span
                    className={`text-sm font-bold px-2 py-0.5 rounded-full ${color}`}
                  >
                    {commsPercent}%
                  </span>
                </div>
              );
            })()}
          </div>
        ) : (
          <span className="text-sm text-gray-400">N/A</span>
        )}
      </td>

      {/* Total Score */}
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
