import { Plus } from "lucide-react";

export default function AddModuleAccordion({
  selectedKaId,
  addModuleNumber,
  setAddModuleNumber,
  addModuleName,
  setAddModuleName,
  addScore,
  setAddScore,
  handleAddModule,
}) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl p-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Plus className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-slate-800">Add Module</h2>
      </div>

      {/* Form Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Module Number
          </label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter module number"
            value={addModuleNumber}
            onChange={(e) => setAddModuleNumber(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Module Name
          </label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter module name"
            value={addModuleName}
            onChange={(e) => setAddModuleName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Score
          </label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter score"
            type="number"
            value={addScore}
            onChange={(e) => setAddScore(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddModule}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105"
          disabled={!selectedKaId}
        >
          Add Module
        </button>
      </div>
    </div>
  );
}