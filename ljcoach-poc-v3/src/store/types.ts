export interface Feedback {
  id: string;
  userId: string;
  author: string;
  role?: string;
  text: string;
  timestamp: string;
  pitchId: string; // Ensuring pitchId is always present
}

export interface Metrics {
  clarity: number;
  engagement: number;
  pacing: number;
  structure: number;
}

export interface PitchAnalysis {
  id: string;
  pitchId: string;
  analysis: string;
  score: number;
  timestamp: string;
}

export interface PitchVersion {
  id: string;
  version: string;
  title: string;
  description: string;
  score: number;
  likes: number;
  comments: number;
  timestamp: string;
  playbackId?: string;
  transcript?: string;
  metrics?: Metrics;
  aiCoachSummary?: string;
  feedback: Feedback[]; // ✅ Ensuring feedback exists at the version level
}

export interface Pitch {
  id: string;
  title: string;
  description: string;
  score: number;
  likes: number;
  comments: number;
  timestamp: string;
  feedback: Feedback[]; // ✅ Fixed: Ensuring feedback is properly typed
  playbackId?: string;
  transcript?: string;
  history: PitchVersion[];
  metrics?: Metrics;
  aiCoachSummary?: string;
}

export type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  fromAI: boolean;
  content: string;
  pitchId: string;
};

export type ViewType = 'feed' | 'dashboard' | 'profile' | 'settings';

export interface Notification {
  id: string;
  message: string;
  read: boolean;
}

export type StoreState = {
  activeTab: string;
  expandedCard: string | null;
  showAICoach: boolean;
  showNewPitchModal: boolean;
  showTeamModal: boolean;
  pitches: Record<string, Pitch>;
  selectedPitch: PitchVersion | null;
  messages: (Feedback | ChatMessage)[];
  coachMessages: ChatMessage[];
  themeMode: 'light' | 'dark';
  notifications: Notification[];
  userProfile: { name: string; avatar: string | undefined };
  isLoading: boolean;
  error: string | null;
  competition: { id: string; name: string; date: string } | null;
  competitions: { id: string; name: string; date: string }[];
  pitchAnalyses: Record<string, PitchAnalysis>;
  currentUser: { id: string; name: string; email: string } | null;
};

export type StoreActions = {
  updatePitch: (pitchId: string, updates: Partial<PitchVersion>) => Promise<void>;
  selectPitch: (id: string | null) => void;
  setActiveTab: (tab: string) => void;
  toggleAICoach: () => void;
  setShowNewPitchModal: (show: boolean) => void;
  setShowTeamModal: (show: boolean) => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  getMessagesForPitch: (pitchId: string) => Feedback[];
  fetchCompetition: () => Promise<void>;
  fetchPitchAnalysis: (pitchId: string) => Promise<void>;
  addMessage: (message: ChatMessage) => void;
};
