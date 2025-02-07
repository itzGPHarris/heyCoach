const getAvailableCompetitions = async () => {
  console.log("🏆 Fetching available competitions...");
  return Promise.resolve([
    { id: 1, name: "Startup Pitch Challenge", deadline: "2025-03-01" },
    { id: 2, name: "Global Founder’s Summit", deadline: "2025-04-15" },
  ]);
};

const submitPitchToCompetition = async (competitionId: number, pitchId: number) => {
  console.log(`📨 Submitting pitch ${pitchId} to competition ${competitionId}...`);
  return Promise.resolve({ success: true, message: "Pitch submitted successfully!" });
};

// ✅ Correctly export the module as default
export default { getAvailableCompetitions, submitPitchToCompetition };
