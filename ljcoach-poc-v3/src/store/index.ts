import { create } from 'zustand';
import { StoreState, StoreActions, Pitch, PitchVersion, PitchAnalysis, ChatMessage } from './types';
import { MockAPIClient } from '../api/mockServices';

const mockClient = new MockAPIClient();

const initialPitches: Record<string, Pitch> = {
  'demo-pitch-1': {
    id: 'demo-pitch-1',
    pitchId: 'demo-pitch-1',
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
        comments: [1],
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
        comments: [2],
        timestamp: '2025-01-05T14:30:00Z',
        playbackId: 'abc123',
        transcript: "Hi, I'm Harper, and this is RadiantHue...",
        metrics: { clarity: 72, engagement: 68, pacing: 70, structure: 75 },
        aiCoachSummary: "Better structure, but pacing could improve.",
        feedback: [
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
  messages:[] as ChatMessage[],
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
        feedback: mergedFeedback,
        comments: updates.comments ?? lastVersion.comments, // Ensure this is a number

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

   // ✅ AI Coach Actions
   setShowAICoach: (show: boolean) => set({ showAICoach: show }),
   toggleAICoach: () => set((state) => ({ showAICoach: !state.showAICoach })),
   
   

   getMessagesForPitch: (pitchId: string): ChatMessage[] => {
    const state = get();
    return state.messages.filter(
      (message): message is ChatMessage =>
        'sender' in message && 'fromAI' in message && 'content' in message && message.pitchId === pitchId
    );
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
    messages: [...state.messages, message] // ✅ Ensures type consistency
  }));
},
setMessages: (messages: ChatMessage[]) => {
  set({ messages }); // ✅ Ensures only ChatMessage[] is assigned
}
}));


export default useStore;
