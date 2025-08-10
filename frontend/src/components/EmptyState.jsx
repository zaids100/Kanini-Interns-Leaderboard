import { User } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No interns found</h3>
      <p className="text-gray-600">Check back later for leaderboard updates.</p>
    </div>
  );
}
