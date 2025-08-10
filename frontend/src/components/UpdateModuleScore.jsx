import { Edit3 } from "lucide-react";

export default function UpdateModuleScore({
  selectedKaId,
  updateModuleNumber,
  setUpdateModuleNumber,
  updateScoreValue,
  setUpdateScoreValue,
  handleUpdateScore,
}) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center space-x-2">
        <Edit3 className="w-5 h-5 text-green-500" />
        <span>Update Module Score</span>
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Module Number</label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Enter module number"
            value={updateModuleNumber}
            onChange={(e) => setUpdateModuleNumber(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">New Score</label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Enter new score"
            type="number"
            value={updateScoreValue}
            onChange={(e) => setUpdateScoreValue(e.target.value)}
          />
        </div>
        <div className="pt-8">
          <button
            onClick={handleUpdateScore}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105"
            disabled={!selectedKaId}
          >
            Update Score
          </button>
        </div>
      </div>
    </div>
  );
}
