import { Trophy, User, Award, Code } from "lucide-react";

export default function InternDetails({ selectedIntern }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center space-x-2">
        <Trophy className="w-5 h-5 text-amber-500" />
        <span>Intern Details</span>
      </h2>
      {!selectedIntern ? (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Select an intern from the left panel to view details</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <img
              src={selectedIntern.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedIntern.name)}`}
              alt={selectedIntern.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{selectedIntern.name}</h3>
              <p className="text-slate-600 font-medium">{selectedIntern.ka_id}</p>
              <p className="text-blue-600 font-semibold">{selectedIntern.role}</p>
            </div>
          </div>

          {/* Leetcode Stats
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <Code className="w-5 h-5 text-orange-500" />
              <span>Leetcode Stats</span>
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center border border-orange-200">
                <div className="text-2xl font-bold text-green-600">{selectedIntern.leetcode_stats?.easy || 0}</div>
                <div className="text-sm text-green-500">Easy</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-orange-200">
                <div className="text-2xl font-bold text-yellow-600">{selectedIntern.leetcode_stats?.medium || 0}</div>
                <div className="text-sm text-yellow-500">Medium</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-orange-200">
                <div className="text-2xl font-bold text-red-600">{selectedIntern.leetcode_stats?.hard || 0}</div>
                <div className="text-sm text-red-500">Hard</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-slate-600">
                Total: <span className="font-semibold">{(selectedIntern.leetcode_stats?.easy || 0) + (selectedIntern.leetcode_stats?.medium || 0) + (selectedIntern.leetcode_stats?.hard || 0)}</span> problems solved
              </div>
            </div>
          </div> */}

          {/* Certifications */}
          {/* <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-green-500" />
              <span>Certifications ({selectedIntern.certifications?.length || 0})</span>
            </h4>
            {selectedIntern.certifications && selectedIntern.certifications.length > 0 ? (
              <div className="space-y-2">
                {selectedIntern.certifications.map((cert, idx) => (
                  <a
                    key={idx}
                    href={cert.certificate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200 hover:bg-green-200 transition-colors cursor-pointer"
                  >
                    <Award className="w-3 h-3 mr-1" />
                    {cert.certification_name}
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-500">
                <Award className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p>No certifications yet</p>
              </div>
            )}
          </div> */}
        </div>
      )}
    </div>
  );
}
