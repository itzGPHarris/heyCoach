import { StateCreator } from 'zustand';
import { Pitch } from '../types';
import { MockAPIClient } from '../../api/mockServices';

const mockClient = new MockAPIClient();

export interface PitchState {
  pitches: Record<string, Pitch>;
  selectedPitch: Pitch | null;
  activePitchVersion: number;
  pitchAnalyses: Record<string, unknown>;
}

export interface PitchActions {
  fetchPitches: () => Promise<void>;
  fetchPitchAnalysis: (pitchId: string) => Promise<void>;
  updatePitch: (pitchId: string, updates: Partial<Pitch>) => Promise<void>;
  addPitch: (pitch: Pitch) => void;
  selectPitch: (id: string | null) => void;
  setActivePitchVersion: (version: number) => void;
}

export type PitchSlice = PitchState & PitchActions;

const createPitchSlice: StateCreator<PitchSlice> = (set, get) => ({
  // Initial state
  pitches: {},
  selectedPitch: null,
  activePitchVersion: 0,
  pitchAnalyses: {},

  // Actions
  fetchPitches: async () => {
    try {
      const fetchedPitches = await mockClient.getPitchesMock();
      set({ pitches: fetchedPitches });
    } catch (error) {
      console.error("Error fetching pitches:", error);
    }
  },

  fetchPitchAnalysis: async (pitchId) => {
    try {
      const analysis = await mockClient.analyzePitch(pitchId);
      set((state) => ({
        pitchAnalyses: {
          ...state.pitchAnalyses,
          [pitchId]: {
            ...analysis,
            analysis: analysis.aiSummary || "No analysis available",
            score: (
              (analysis.metrics?.clarity || 0) +
              (analysis.metrics?.engagement || 0) +
              (analysis.metrics?.pacing || 0) +
              (analysis.metrics?.structure || 0)
            ) / 4,
          },
        },
      }));
    } catch (error) {
      console.error(`Error fetching pitch analysis for ${pitchId}:`, error);
    }
  },

  updatePitch: async (pitchId, updates) => {
    try {
      const state = get();
      const updatedPitches = { ...state.pitches };
      if (updatedPitches[pitchId]) {
        updatedPitches[pitchId] = { ...updatedPitches[pitchId], ...updates };
      }
      set({ pitches: updatedPitches });
    } catch (error) {
      console.error(`Error updating pitch ${pitchId}:`, error);
    }
  },

  addPitch: (pitch) => 
    set((state) => ({ 
      pitches: { ...state.pitches, [pitch.id]: pitch } 
    })),

  selectPitch: (id) => {
    if (!id) {
      set({ selectedPitch: null });
      return;
    }
    const state = get();
    const pitch = state.pitches[id];
    if (!pitch) {
      console.error(`Pitch ID ${id} not found.`);
      return;
    }
    set({ selectedPitch: pitch });
  },

  setActivePitchVersion: (version) => 
    set({ activePitchVersion: version }),
});

export default createPitchSlice;