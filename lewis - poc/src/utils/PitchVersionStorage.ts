import { PitchVersion } from "../store/types";


export const PITCH_STORAGE_KEY = "pitch_versions";

/** ✅ Get all stored pitch versions */
export const getPitchVersions = (): PitchVersion[] => {
  const storedPitches = localStorage.getItem(PITCH_STORAGE_KEY);
  return storedPitches ? JSON.parse(storedPitches) : [];
};

/** ✅ Save a new pitch version */
export const savePitchVersion = (newVersion: PitchVersion) => {
  const storedPitches = getPitchVersions();
  storedPitches.push(newVersion);
  localStorage.setItem(PITCH_STORAGE_KEY, JSON.stringify(storedPitches));
};

/** ✅ Get the most recent pitch version */
export const getLastPitchVersion = (): PitchVersion | null => {
  const storedPitches = getPitchVersions();
  return storedPitches.length > 1 ? storedPitches[storedPitches.length - 2] : null;
};
