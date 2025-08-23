export default function UpdateCommunicationScore({
  selectedKaId,
  communicationScore,
  setCommunicationScore,
  handleUpdateCommunicationScore,
}) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Update Communication Score</h2>
      
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter communication score (A1-C2)"
          value={communicationScore}
          onChange={(e) => setCommunicationScore(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={() => handleUpdateCommunicationScore()}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          disabled={!selectedKaId || communicationScore === ""}
        >
          Update Communication Score
        </button>
      </div>
    </div>
  );
}