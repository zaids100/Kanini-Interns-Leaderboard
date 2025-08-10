import { User } from "lucide-react";

export default function InternsSidebar({ interns, selectedKaId, onSelectIntern }) {
  return (
    <aside className="lg:col-span-4 xl:col-span-3">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-800">Interns</h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
              {interns.length}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {interns.map((intern) => (
              <button
                key={intern.ka_id}
                onClick={() => onSelectIntern(intern.ka_id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selectedKaId === intern.ka_id
                    ? "bg-blue-50 border-blue-200 shadow-md scale-[1.02]"
                    : "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md hover:scale-[1.01]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={intern.profilePic}
                      alt={intern.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{intern.name}</p>
                    <p className="text-xs text-slate-500 truncate">{intern.ka_id}</p>
                    <p className="text-xs text-blue-600 font-medium">{intern.role}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
