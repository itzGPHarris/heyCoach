import { PitchVersion } from "../store/types";


export const PITCH_STORAGE_KEY = "pitch_versions";

/** ✅ Get all stored pitch versions */
export const getPitchVersions = (): PitchVersion[] => {
  const storedPitches = localStorage.getItem(PITCH_STORAGE_KEY);
  const parsedPitches = storedPitches ? JSON.parse(storedPitches) : [];
  
  console.log("✅ Retrieved Pitch Versions from Storage:", parsedPitches); // ✅ Debug log
  return parsedPitches;
};

/** ✅ Save a new pitch version */
export const savePitchVersion = (newVersion: PitchVersion) => {
  const storedPitches = getPitchVersions();
  storedPitches.push(newVersion);
  
  console.log("✅ Saving New Pitch Version:", newVersion); // ✅ Debug log
  localStorage.setItem(PITCH_STORAGE_KEY, JSON.stringify(storedPitches));
};

/** ✅ Get the most recent pitch version */
export const getLastPitchVersion = (): PitchVersion | null => {
  const storedPitches = getPitchVersions();
  const lastVersion = storedPitches.length > 1 ? storedPitches[storedPitches.length - 2] : null;
  
  console.log("✅ Last Pitch Version Retrieved:", lastVersion); // ✅ Debug log
  return lastVersion;
};
