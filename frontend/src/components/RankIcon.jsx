import { Crown, Medal, Award } from "lucide-react";

export default function RankIcon({ rank }) {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Award className="w-6 h-6 text-orange-500" />;
    default:
      return (
        <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
          {rank}
        </div>
      );
  }
}
