import { LogOut } from "lucide-react";

export default function AdminHeader({ onLogout }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-lg h-lg rounded-xl flex items-center justify-center">
              <img
                src="https://kanini.com/wp-content/uploads/2022/06/Kanini-Logo.svg"
                alt="Kanini Logo"
                className="w-32 h-auto object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
