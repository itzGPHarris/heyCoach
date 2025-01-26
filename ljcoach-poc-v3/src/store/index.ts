import { create } from 'zustand';
import { PitchStore } from './types';

const initialPitches = {
  'demo-pitch-1': {
    id: 'demo-pitch-1',
    title: 'RadiantHue',
    description: 'Sustainable smart lighting solution that reduces energy consumption by 75% while improving workplace productivity.',
    timestamp: 'Just now',
    playbackId: 'your-mux-playback-id',
    score: 92,
    metrics: {
      clarity: 90,
      engagement: 85,
      pacing: 86,
      structure: 89
    },
    likes: 12,
    comments: 2,
    transcript: "Hi, I'm Harper Lewis\nMarket Problem\nSolution Overview\nTechnology Demo\nMarket Size & Opportunity\nFinancial Projections\nCall to Action",
    history: [
      {
        version: '2.1',
        timestamp: 'Jan 15, 2025',
        changes: 'Updated market positioning'
      }
    ]
  }
};

const useStore = create<PitchStore>(
  (set, get) => ({
    // UI State
    activeTab: 'feed',
    expandedCard: null,
    showAICoach: false,
    showNewPitchModal: false,
    showTeamModal: false,
    pitches: initialPitches,
    selectedPitch: null,
    messages: [],
    coachMessages: [],
    themeMode: 'light',
    notifications: [],
    userProfile: {
      name: 'Guest User',
      avatar: undefined
    },

    // Actions
    setActiveTab: (tab) => set({ activeTab: tab }),
    toggleAICoach: () => set((state) => ({ showAICoach: !state.showAICoach })),
    setShowNewPitchModal: (show) => set({ showNewPitchModal: show }),
    setShowTeamModal: (show) => set({ showTeamModal: show }),
    addPitch: (pitch) => 
      set((state) => ({
        pitches: { ...state.pitches, [pitch.id]: pitch }
      })),
    updatePitch: (id, updates) =>
      set((state) => ({
        pitches: {
          ...state.pitches,
          [id]: { ...state.pitches[id], ...updates }
        }
      })),
    addMessage: (message) =>
      set((state) => ({
        messages: [...state.messages, { ...message, id: Date.now().toString() }]
      })),
    selectPitch: (id) => set({ selectedPitch: id }),
    setThemeMode: (mode) => set({ themeMode: mode }),
    getMessagesForPitch: (pitchId) => {
      const { messages } = get();
      return messages.filter(message => message.pitchId === pitchId);
    },
  })
);

export default useStore;