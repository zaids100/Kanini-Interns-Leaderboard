import AddModuleAccordion from "./AddModuleAccordion";
import UpdateModuleScore from "./UpdateModuleScore";
import AddCertification from "./AddCertification";
import UpdateLeetcodeStats from "./UpdateLeetcodeStats";
import UpdateCommunicationScore from "./UpdateCommunicationScore";

export default function AdminForms({
  selectedKaId,
  addModuleNumber,
  setAddModuleNumber,
  addModuleName,
  setAddModuleName,
  addScore,
  setAddScore,
  handleAddModule,
  updateModuleNumber,
  setUpdateModuleNumber,
  updateScoreValue,
  setUpdateScoreValue,
  handleUpdateScore,
  certificationName,
  setCertificationName,
  certificateLink,
  setCertificateLink,
  handleAddCertification,
  easyCount,
  setEasyCount,
  mediumCount,
  setMediumCount,
  hardCount,
  setHardCount,
  handleUpdateLeetcodeStats,
  communicationScore,
  setCommunicationScore,
  handleUpdateCommunicationScore
}) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <AddModuleAccordion
        selectedKaId={selectedKaId}
        addModuleNumber={addModuleNumber}
        setAddModuleNumber={setAddModuleNumber}
        addModuleName={addModuleName}
        setAddModuleName={setAddModuleName}
        addScore={addScore}
        setAddScore={setAddScore}
        handleAddModule={handleAddModule}
      />
      <UpdateModuleScore
        selectedKaId={selectedKaId}
        updateModuleNumber={updateModuleNumber}
        setUpdateModuleNumber={setUpdateModuleNumber}
        updateScoreValue={updateScoreValue}
        setUpdateScoreValue={setUpdateScoreValue}
        handleUpdateScore={handleUpdateScore}
      />
      <AddCertification
        selectedKaId={selectedKaId}
        certificationName={certificationName}
        setCertificationName={setCertificationName}
        certificateLink={certificateLink}
        setCertificateLink={setCertificateLink}
        handleAddCertification={handleAddCertification}
      />
      <UpdateLeetcodeStats
        selectedKaId={selectedKaId}
        easyCount={easyCount}
        setEasyCount={setEasyCount}
        mediumCount={mediumCount}
        setMediumCount={setMediumCount}
        hardCount={hardCount}
        setHardCount={setHardCount}
        handleUpdateLeetcodeStats={handleUpdateLeetcodeStats}
      />
      <UpdateCommunicationScore
        selectedKaId={selectedKaId}
        communicationScore={communicationScore}
        setCommunicationScore={setCommunicationScore}
        handleUpdateCommunicationScore={handleUpdateCommunicationScore}
      />
    </div>
  );
}
