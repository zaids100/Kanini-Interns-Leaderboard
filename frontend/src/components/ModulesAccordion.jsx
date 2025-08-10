import { useState } from "react";
import { GraduationCap, ChevronDown, ChevronUp } from "lucide-react";

export default function ModulesAccordion({ selectedIntern }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl p-6">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-green-500" />
          <span>Modules & Scores</span>
        </h2>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500" />
        )}
      </div>

      {/* Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[1000px] mt-6" : "max-h-0"
        }`}
      >
        {!selectedIntern ? (
          <div className="text-center py-8">
            <p className="text-slate-500">No intern selected.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedIntern.score?.length ? (
              selectedIntern.score.map((module, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg border border-slate-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                      {module.moduleNumber}
                    </div>
                    <span className="font-medium text-slate-800">{module.moduleName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">{module.score}</span>
                    <span className="text-sm text-slate-500 font-medium">pts</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No modules assigned yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}