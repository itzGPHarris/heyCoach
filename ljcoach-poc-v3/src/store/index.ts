import { create } from 'zustand';
import { StoreState, StoreActions, Pitch, PitchVersion, Feedback, PitchAnalysis, ChatMessage } from './types';
import { MockAPIClient } from '../api/mockServices';

const mockClient = new MockAPIClient();

const initialPitches: Record<string, Pitch> = {
  'demo-pitch-1': {
    id: 'demo-pitch-1',
    title: 'RadiantHue - Initial Pitch',
    description: 'Sustainable smart lighting with AI-driven efficiency.',
    score: 85,
    likes: 5,
    comments: [],
    timestamp: '2025-01-01T10:00:00Z',
    feedback: [],
    history: [
      {
        id: 'demo-pitch-1-v1',
        version: '1.0',
        title: 'RadiantHue - Initial Pitch',
        description: 'Sustainable smart lighting with AI-driven efficiency.',
        score: 70,
        likes: 2,
        comments: 1,
        timestamp: '2025-01-01T10:00:00Z',
        playbackId: 'YYtQ34SRyksieH026qohfbOhBNd02LQAK3Fgt8wk5J8tM',
        transcript: "Hi, I'm Harper...",
        metrics: { clarity: 60, engagement: 55, pacing: 58, structure: 65 },
        aiCoachSummary: "A good start, but needs improvement in clarity.",
        feedback: [
          {
            id: 'feedback-1',
            userId: 'user-123',
            author: 'Coach Alex',
            role: 'AI Coach',
            text: 'Your pace is a bit fast—try slowing down for better clarity.',
            timestamp: '2025-01-02T12:00:00Z',
            pitchId: 'demo-pitch-1'
          },
          {
            id: 'feedback-2',
            userId: 'user-456',
            author: 'Professor Martinez',
            role: 'Professor',
            text: 'Good concept, but you need to explain the problem more clearly.',
            timestamp: '2025-01-03T15:30:00Z',
            pitchId: 'demo-pitch-1'
          }
        ]
      },
      {
        id: 'demo-pitch-1-v2',
        version: '2.0',
        title: 'RadiantHue - Improved Pitch',
        description: 'Sustainable lighting with AI-driven efficiency and eco-friendliness.',
        score: 78,
        likes: 3,
        comments: 2,
        timestamp: '2025-01-05T14:30:00Z',
        playbackId: 'abc123',
        transcript: "Hi, I'm Harper, and this is RadiantHue...",
        metrics: { clarity: 72, engagement: 68, pacing: 70, structure: 75 },
        aiCoachSummary: "Better structure, but pacing could improve.",
        feedback: [
          {
            id: 'feedback-3',
            userId: 'user-789',
            author: 'Mentor Sarah',
            role: 'Mentor',
            text: 'Great improvements! Try adding a compelling hook at the beginning.',
            timestamp: '2025-01-06T10:00:00Z',
            pitchId: 'demo-pitch-1'
          },
          {
            id: 'feedback-4',
            userId: 'user-321',
            author: 'Classmate John',
            role: 'Classmate',
            text: 'Your delivery is much smoother now!',
            timestamp: '2025-01-06T11:20:00Z',
            pitchId: 'demo-pitch-1'
          }
        ]
      },
      {
        id: 'demo-pitch-1-v3',
        version: '3.0',
        title: 'RadiantHue - Stronger Pitch',
        description: 'AI-powered sustainable lighting for modern spaces.',
        score: 85,
        likes: 5,
        comments: 3,
        timestamp: '2025-01-10T10:45:00Z',
        playbackId: 'xyz456',
        transcript: "RadiantHue brings sustainability to your home...",
        metrics: { clarity: 80, engagement: 78, pacing: 79, structure: 85 },
        aiCoachSummary: "Solid improvements! Engagement is much stronger.",
        feedback: [
          {
            id: 'feedback-5',
            userId: 'user-123',
            author: 'Coach Alex',
            role: 'AI Coach',
            text: 'Your clarity is excellent now! Work on emphasizing key takeaways.',
            timestamp: '2025-01-11T08:45:00Z',
            pitchId: 'demo-pitch-1'
          },
          {
            id: 'feedback-6',
            userId: 'user-789',
            author: 'Mentor Sarah',
            role: 'Mentor',
            text: 'Your tone is much more confident—great progress!',
            timestamp: '2025-01-11T09:30:00Z',
            pitchId: 'demo-pitch-1'
          }
        ]
      },
      {
        id: 'demo-pitch-1-v4',
        version: '4.0',
        title: 'RadiantHue - Final Pitch',
        description: 'The future of smart, AI-driven sustainable lighting.',
        score: 92,
        likes: 8,
        comments: 4,
        timestamp: '2025-01-15T17:00:00Z',
        playbackId: 'final789',
        transcript: "RadiantHue is the future of smart lighting...",
        metrics: { clarity: 90, engagement: 88, pacing: 87, structure: 92 },
        aiCoachSummary: "Great work! This is a highly polished pitch.",
        feedback: [
          {
            id: 'feedback-7',
            userId: 'user-123',
            author: 'Coach Alex',
            role: 'AI Coach',
            text: 'This pitch is well-structured and engaging—fantastic job!',
            timestamp: '2025-01-16T12:30:00Z',
            pitchId: 'demo-pitch-1'
          },
          {
            id: 'feedback-8',
            userId: 'user-321',
            author: 'Classmate John',
            role: 'Classmate',
            text: 'Your best version yet! Very polished and persuasive.',
            timestamp: '2025-01-16T13:00:00Z',
            pitchId: 'demo-pitch-1'
          },
          {
            id: 'feedback-9',
            userId: 'user-456',
            author: 'Professor Martinez',
            role: 'Professor',
            text: 'Your problem-solution clarity is excellent now—well done!',
            timestamp: '2025-01-16T14:20:00Z',
            pitchId: 'demo-pitch-1'
          }
        ]
      }
    ]
  }
};

const useStore = create<StoreState & StoreActions>((set, get) => ({
  // ✅ Store State
  activeTab: 'feed',
  expandedCard: null,
  showAICoach: false,
  showNewPitchModal: false,
  showTeamModal: false,
  pitches: initialPitches,
  selectedPitch: null,
  messages: [] as (Feedback | ChatMessage)[],
  coachMessages: [],
  themeMode: 'light',
  notifications: [],
  userProfile: { name: 'Guest User', avatar: undefined },
  isLoading: false,
  error: null,
  competition: null,
  competitions: [],
  pitchAnalyses: {},
  currentUser: null,

  // ✅ Store Actions (Fixing Missing Methods)
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

  setActiveTab: (tab: string) => set({ activeTab: tab }),
  toggleAICoach: () => set((state) => ({ showAICoach: !state.showAICoach })),
  setShowNewPitchModal: (show: boolean) => set({ showNewPitchModal: show }),
  setShowTeamModal: (show: boolean) => set({ showTeamModal: show }),
  setThemeMode: (mode: 'light' | 'dark') => set({ themeMode: mode }),

  updatePitch: async (pitchId: string, updates: Partial<PitchVersion>) => {
    try {
      set({ isLoading: true });

      const state = get();
      const currentPitch = state.pitches[pitchId];

      if (!currentPitch) {
        console.error(`Pitch ID ${pitchId} not found.`);
        set({ isLoading: false, error: 'Pitch not found.' });
        return;
      }

      const lastVersion = currentPitch.history[currentPitch.history.length - 1];

      // ✅ Preserve feedback
      const mergedFeedback = updates.feedback ?? lastVersion.feedback ?? [];

      const newVersion: PitchVersion = {
        ...lastVersion,
        id: `${pitchId}-v${currentPitch.history.length + 1}`,
        version: `v${currentPitch.history.length + 1}`,
        timestamp: new Date().toISOString(),
        feedback: mergedFeedback
      };

      set({
        isLoading: false,
        pitches: {
          ...state.pitches,
          [pitchId]: {
            ...currentPitch,
            history: [...currentPitch.history, newVersion],
            feedback: mergedFeedback
          },
        },
      });

    } catch (error) {
      console.error(`Error updating pitch ${pitchId}:`, error);
      set({ isLoading: false, error: 'Failed to update pitch.' });
    }
  },

  getMessagesForPitch: (pitchId: string): Feedback[] => {
    const state = get();
    return state.messages.filter((message): message is Feedback => 'pitchId' in message && message.pitchId === pitchId);
  },

  fetchCompetition: async () => {
    set({ isLoading: true });
    try {
      const competitionData = await mockClient.getCompetitions();
      set({ isLoading: false, competitions: competitionData });
    } catch (error) {
      console.error('Error fetching competitions:', error);
      set({ isLoading: false, error: 'Failed to load competitions.' });
    }
  },

  fetchPitchAnalysis: async (pitchId: string) => {
    set({ isLoading: true, error: null });
    try {
      const analysis = await mockClient.analyzePitch(pitchId);
      set(state => ({
        pitchAnalyses: { ...state.pitchAnalyses, [pitchId]: analysis as unknown as PitchAnalysis },
        isLoading: false
      }));
    } catch (error) {
      console.error(`Error fetching pitch analysis for ${pitchId}:`, error);
      set({ error: 'Failed to fetch pitch analysis', isLoading: false });
    }
  },

  addMessage: (message: ChatMessage) => {
    set(state => ({
      messages: [...state.messages, message]
    }));
  }
}));

export default useStore;
