/* store/index.ts - Zustand Store */

import { create } from "zustand";
import { MockAPIClient } from "../api/mockServices";
import { StoreState, StoreActions, ChatMessage, ViewType, Pitch } from "./types";

const mockClient = new MockAPIClient();

export const useStore = create<StoreState & StoreActions>((set, get) => ({
  activeTab: "feed" as ViewType,
  setActiveTab: (tab) => set({ activeTab: tab }),

  showAICoach: false,
  toggleAICoach: () => set((state) => ({ showAICoach: !state.showAICoach })),

  coachMessages: [],
  setCoachMessages: (messages: ChatMessage[]) => {
    set({ 
      coachMessages: messages.map(message => ({
        ...message,
        timestamp: message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp),
        sender: message.sender || "unknown"  // ✅ Ensure 'sender' is always included
      })) 
    });
  },

  // ✅ Ensure all required properties from StoreState are initialized
  messages: [],
  notifications: [],
  isLoading: false,
  error: null,
  competition: null,
  competitions: [],
  pitchAnalyses: {},
  currentUser: null,
  expandedCard: null,
  showNewPitchModal: false,
  showTeamModal: false,
  activeCompetition: null,

  pitches: {} as Record<string, Pitch>,  // ✅ Ensures TypeScript knows `pitches` contains Pitch objects
  activePitchVersion: 0,
  selectedPitch: null as Pitch | null,
  themeMode: "light",
  setThemeMode: (mode) => set({ themeMode: mode }),

  // ✅ Restore missing methods in StoreActions
  setActivePitchVersion: (version) => set({ activePitchVersion: version }),
  getMessagesForPitch: (pitchId) => get().messages.filter((message) => message.pitchId === pitchId),
  setActiveCompetition: (competitionId) => set({ activeCompetition: competitionId }),
  setShowNewPitchModal: (show) => set({ showNewPitchModal: show }),
  setShowTeamModal: (show) => set({ showTeamModal: show }),

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

  fetchPitchAnalysis: async (pitchId) => {
    set({ isLoading: true, error: null });
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
        isLoading: false,
      }));
    } catch (error) {
      console.error(`Error fetching pitch analysis for ${pitchId}:`, error);
      set({ error: "Failed to fetch pitch analysis", isLoading: false });
    }
  },

  updatePitch: async (pitchId, updates) => {
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

  selectPitch: (id: string | null) => {
    if (!id) {
      set({ selectedPitch: null });
      return;
    }
    const state = get();
    
    const pitch = state.pitches[id]; // ✅ TypeScript now infers this as Pitch | undefined
  
    if (!pitch) {
      console.error(`Pitch ID ${id} not found.`);
      return;
    }
  
    set({ selectedPitch: pitch }); // ✅ Correctly assigns the full pitch object
  },
  
    
}));

export default useStore;
