import { create } from "zustand";
import { MockAPIClient } from "../api/mockServices";
import { StoreState, StoreActions } from "./types";

const mockClient = new MockAPIClient();

export const useStore = create<StoreState & StoreActions>((set, get) => ({
  activeTab: "feed", // ✅ Ensure activeTab is initialized
  setActiveTab: (tab) => set({ activeTab: tab }), // ✅ Function to update activeTab

  pitches: {},
  activePitchVersion: 0,
  selectedPitch: null,
  messages: [],
  coachMessages: [],
  showAICoach: false,
  themeMode: "light",
  notifications: [],
  isLoading: true,
  error: null,
  competition: null,
  competitions: [],
  pitchAnalyses: {},
  currentUser: null,
  expandedCard: null,
  showNewPitchModal: false,
  showTeamModal: false,
  activeCompetition: null,

  setActivePitchVersion: (version) => set({ activePitchVersion: version }),

  fetchPitches: async () => {
    set({ isLoading: true });
    try {
      const fetchedPitches = await mockClient.getPitchesMock();
      set({ pitches: fetchedPitches, isLoading: false });
    } catch (error) {
      console.error("Error fetching pitches:", error);
      set({ isLoading: false, error: "Failed to load pitches." });
    }
  },

  fetchPitchAnalysis: async (pitchId: string) => {
    set({ isLoading: true, error: null });
    try {
      const analysis = await mockClient.analyzePitch(pitchId);
      set((state) => ({
        pitchAnalyses: { 
          ...state.pitchAnalyses, 
          [pitchId]: {
            ...analysis,
            analysis: analysis.aiSummary || "No analysis available",
            score:
              (analysis.metrics?.clarity || 0 +
                analysis.metrics?.engagement || 0 +
                analysis.metrics?.pacing || 0 +
                analysis.metrics?.structure || 0) /
              4,
          },
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error(`Error fetching pitch analysis for ${pitchId}:`, error);
      set({ error: "Failed to fetch pitch analysis", isLoading: false });
    }
  },

  updatePitch: async (pitchId: string, updates: Partial<unknown>) => {
    set({ isLoading: true });
    try {
      const state = get();
      const updatedPitches = { ...state.pitches };
      if (updatedPitches[pitchId]) {
        updatedPitches[pitchId] = { ...updatedPitches[pitchId], ...updates, id: pitchId };
      }
      set({ pitches: updatedPitches, isLoading: false });
    } catch (error) {
      console.error(`Error updating pitch ${pitchId}:`, error);
      set({ isLoading: false, error: "Failed to update pitch." });
    }
  },

  addPitch: (pitch) => set((state) => ({ pitches: { ...state.pitches, [pitch.id]: pitch } })),
  
  selectPitch: (id) => {
    if (!id) {
      set({ selectedPitch: null });
      return;
    }
    const state = get();
    const pitch = state.pitches[id];
    if (pitch) {
      //set({ selectedPitch: pitch.history[pitch.history.length - 1] });
    } else {
      console.error(`Pitch ID ${id} not found.`);
    }
  },

  toggleAICoach: () => set((state) => ({ showAICoach: !state.showAICoach })),
  setThemeMode: (mode) => set({ themeMode: mode }),
  getMessagesForPitch: (pitchId) => get().messages.filter((message) => message.pitchId === pitchId),
  setActiveCompetition: (competitionId) => set({ activeCompetition: competitionId }),
  setShowNewPitchModal: (show) => set({ showNewPitchModal: show }),
  setShowTeamModal: (show) => set({ showTeamModal: show }),
}));

export default useStore;
