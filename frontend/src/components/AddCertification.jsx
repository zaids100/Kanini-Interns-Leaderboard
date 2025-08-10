import { Award } from "lucide-react";

export default function AddCertification({
  selectedKaId,
  certificationName,
  setCertificationName,
  certificateLink,
  setCertificateLink,
  handleAddCertification,
}) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center space-x-2">
        <Award className="w-5 h-5 text-green-500" />
        <span>Add Certification</span>
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Certification Name</label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Enter certification name"
            value={certificationName}
            onChange={(e) => setCertificationName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Certificate Link</label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Enter certificate URL"
            value={certificateLink}
            onChange={(e) => setCertificateLink(e.target.value)}
          />
        </div>
        <div className="pt-8">
          <button
            onClick={handleAddCertification}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105"
            disabled={!selectedKaId || !certificationName || !certificateLink}
          >
            Add Certification
          </button>
        </div>
      </div>
    </div>
  );
}
