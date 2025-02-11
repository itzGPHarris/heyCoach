// 📌 Fully Updated store/index.ts with Fixes for Errors
import { create } from 'zustand';
import { MockAPIClient } from '../api/mockServices';
import { StoreState, StoreActions, ChatMessage, ViewType, Notification, PitchAnalysis, Pitch, PitchVersion } from './types';

const mockClient = new MockAPIClient();

export const useStore = create<StoreState & StoreActions>((set, get) => ({
  pitches: {},
  activePitchVersion: 0,
  selectedPitch: null,
  messages: [] as ChatMessage[],
  coachMessages: [] as ChatMessage[],
  showAICoach: false,
  themeMode: 'light',
  notifications: [] as Notification[],
  isLoading: true,
  error: null,
  competition: null,
  competitions: [],
  pitchAnalyses: {},
  currentUser: null,
  expandedCard: null,
  showNewPitchModal: false,
  showTeamModal: false,
  activeTab: 'feed' as ViewType,
  activeCompetition: null,

  setActivePitchVersion: (version) => set({ activePitchVersion: version }),

  fetchPitches: async () => {
    set({ isLoading: true });
    try {
      const fetchedPitches = await mockClient.getPitchesMock(); // ✅ Fixed API call
      set({ pitches: fetchedPitches, isLoading: false });
    } catch (error) {
      console.error("Error fetching pitches:", error);
      set({ isLoading: false, error: "Failed to load pitches." });
    }
  },

  fetchPitchAnalysis: async (pitchId: string) => {
    set({ isLoading: true, error: null });
    try {
      const analysis = (await mockClient.analyzePitch(pitchId)) as PitchAnalysis;
      set((state) => ({
        pitchAnalyses: { ...state.pitchAnalyses, [pitchId]: {
          ...analysis,
          analysis: analysis.aiSummary || 'No analysis available',
          score: analysis.metrics && 
          typeof analysis.metrics.clarity === 'number' &&
          typeof analysis.metrics.engagement === 'number' &&
          typeof analysis.metrics.pacing === 'number' &&
          typeof analysis.metrics.structure === 'number'
     ? (analysis.metrics.clarity + analysis.metrics.engagement + 
        analysis.metrics.pacing + analysis.metrics.structure) / 4
     : 0,
           }},
        isLoading: false,
      }));
    } catch (error) {
      console.error(`Error fetching pitch analysis for ${pitchId}:`, error);
      set({ error: 'Failed to fetch pitch analysis', isLoading: false });
    }
  },

  updatePitch: async (pitchId: string, updates: Partial<PitchVersion>) => {
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
      set({ isLoading: false, error: 'Failed to update pitch.' });
    }
  },

  addPitch: (pitch: Pitch) => set((state) => ({ pitches: { ...state.pitches, [pitch.id]: pitch } })),
  
  selectPitch: (id: string | null) => {
    if (!id) {
      set({ selectedPitch: null });
      return;
    }
    const state = get();
    const pitch = state.pitches[id];
    if (pitch) {
      set({ selectedPitch: pitch.history[pitch.history.length - 1] });
    } else {
      console.error(`Pitch ID ${id} not found.`);
    }
  },

  toggleAICoach: () => set((state) => ({ showAICoach: !state.showAICoach })),
  setThemeMode: (mode: 'light' | 'dark') => set({ themeMode: mode }),
  getMessagesForPitch: (pitchId: string) => get().messages.filter((message) => message.pitchId === pitchId),
  setActiveCompetition: (competitionId: string) => set({ activeCompetition: competitionId }),
  setShowNewPitchModal: (show: boolean) => set({ showNewPitchModal: show }),
  setShowTeamModal: (show: boolean) => set({ showTeamModal: show }),
}));

export default useStore;
