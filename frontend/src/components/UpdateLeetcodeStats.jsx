import { Code } from "lucide-react";

export default function UpdateLeetcodeStats({
  selectedKaId,
  easyCount,
  setEasyCount,
  mediumCount,
  setMediumCount,
  hardCount,
  setHardCount,
  handleUpdateLeetcodeStats,
}) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center space-x-2">
        <Code className="w-5 h-5 text-orange-500" />
        <span>Update Leetcode Stats</span>
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Easy Problems Solved</label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Enter easy problems count"
            type="number"
            min="0"
            value={easyCount}
            onChange={(e) => setEasyCount(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Medium Problems Solved</label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            placeholder="Enter medium problems count"
            type="number"
            min="0"
            value={mediumCount}
            onChange={(e) => setMediumCount(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Hard Problems Solved</label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="Enter hard problems count"
            type="number"
            min="0"
            value={hardCount}
            onChange={(e) => setHardCount(e.target.value)}
          />
        </div>
        <div className="pt-8">
          <button
            onClick={handleUpdateLeetcodeStats}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105"
            disabled={!selectedKaId}
          >
            Update Leetcode Stats
          </button>
        </div>
      </div>
    </div>
  );
}
