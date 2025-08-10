import { LogOut } from "lucide-react";

export default function LeaderboardHeader({ user, onLogout, onProfileClick }) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <img
                src="https://kanini.com/wp-content/uploads/2022/06/Kanini-Logo.svg"
                alt="Kanini Logo"
                className="h-10 w-auto"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Intern Leaderboard</h1>
              <p className="text-sm text-gray-600">Track certifications and scores</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">

            {/* Profile Button */}
            <button
              onClick={onProfileClick}
              className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 transition-colors cursor-pointer"
            >
              <img
                src={user?.profilePic || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover"
              />
              <span>My Profile</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
