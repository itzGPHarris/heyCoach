// pitchService.ts
const getUserPitches = async () => {
    console.log("📜 Fetching user pitches...");
    return Promise.resolve([
      { id: 1, title: "Radiant Hue - Inclusive Beauty for All", description: "A pitch for inclusive beauty products.", score: 92 },
    ]);
  };
  
  const createNewPitch = async (title: string, description: string) => {
    console.log("✨ Creating new pitch:", title);
    return Promise.resolve({ id: Date.now(), title, description, score: 0 });
  };
  
  export default { getUserPitches, createNewPitch };
  