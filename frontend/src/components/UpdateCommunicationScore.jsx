export default function UpdateCommunicationScore({
  selectedKaId,
  grammar,
  setGrammar,
  proactiveness,
  setProactiveness,
  fluency,
  setFluency,
  handleUpdateCommunicationScore,
}) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Update Communication Scores</h2>

      <div className="flex flex-col space-y-4">
        {/* Grammar */}
        <input
          type="number"
          placeholder="Grammar (out of 20)"
          value={grammar}
          onChange={(e) => setGrammar(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Proactiveness */}
        <input
          type="number"
          placeholder="Proactiveness (out of 20)"
          value={proactiveness}
          onChange={(e) => setProactiveness(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Fluency */}
        <input
          type="number"
          placeholder="Fluency (out of 10)"
          value={fluency}
          onChange={(e) => setFluency(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={() => handleUpdateCommunicationScore()}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          disabled={
            !selectedKaId ||
            grammar === "" ||
            proactiveness === "" ||
            fluency === ""
          }
        >
          Update Communication Scores
        </button>
      </div>
    </div>
  );
}
