import { ChevronDown, Star } from "lucide-react";

export default function SortDropdown({ 
  sortBy, 
  isDropdownOpen, 
  setIsDropdownOpen, 
  sortOptions, 
  currentSortLabel, 
  onSortChange, 
  internCount 
}) {
  return (
    <div className="bg-gradient-to-r from-[#B3D334] via-[#00AEEF] to-[#0077C8] p-4 text-white rounded-lg px-6 py-4">
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">Rankings</h2>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20 cursor-pointer"
            >
              <span className="text-sm font-medium">Sort by: {currentSortLabel}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onSortChange(option.value)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        sortBy === option.value
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5" />
          <span className="text-sm">{internCount} Interns</span>
        </div>
      </div>
    </div>
  );
}
