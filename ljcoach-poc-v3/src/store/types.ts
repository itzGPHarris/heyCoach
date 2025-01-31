// 📌 Fully Corrected store/types.ts

export interface UserProfile {
  avatar?: string;
  name: string;
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
  metrics?: Metrics; // ✅ Ensure metrics is optional but available
  transcript: string;
  aiSummary: string;
  analysis: string; // ✅ Ensure analysis is defined
  score: number; // ✅ Ensure score is defined
  feedback: Feedback[];
  createdAt: string;
}


export interface PitchVersion {
  id: string;
  title: string;
  description: string;
  playbackId?: string;
  timestamp: string;
  score: number;
  likes: number;
  feedback: Feedback[];
  transcript?: string;
  aiCoachSummary?: string;
  metrics?: Metrics;
}

export interface ChatMessage {
  id: string;
  content: string;
  fromAI: boolean;
  timestamp: Date;
  pitchId?: string;
  userId?: string;
  author?: string;
  role?: string;

}

export interface Feedback {
  userId: string;
  author: string;
  role?: string;
  text: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
}

export type ViewType = 'feed' | 'dashboard' | 'collaborate' | 'profile' | 'settings';

export interface Pitch {
  id: string;
  title: string;
  description: string;
  playbackId: string;
  score: number;
  metrics: Metrics;
  aiCoachSummary: string;
  likes: number;
  comments: ChatMessage[];
  transcript?: string;
  timestamp: string;
  history: PitchVersion[];
  feedback: Feedback[];
}

export interface StoreState {
  pitches: Record<string, Pitch>;
  activePitchVersion: number;
  selectedPitch: PitchVersion | null;
  messages: ChatMessage[];
  coachMessages: ChatMessage[];
  showAICoach: boolean;
  themeMode: 'light' | 'dark';
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  competition: Competition | null;
  competitions: Competition[];
  pitchAnalyses: Record<string, PitchAnalysis>;
  currentUser: UserProfile | null;
  expandedCard: string | null;
  showNewPitchModal: boolean;
  showTeamModal: boolean;
  activeTab: ViewType;
    activeCompetition: string | null; // ✅ Added to fix store/index.ts error

}

export interface StoreActions {
  setActivePitchVersion: (version: number) => void;
  updatePitch: (pitchId: string, updates: Partial<PitchVersion>) => Promise<void>;
  selectPitch: (id: string | null) => void;
  toggleAICoach: () => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  addPitch: (pitch: Pitch) => void;
  getMessagesForPitch: (pitchId: string) => ChatMessage[];
  setActiveCompetition: (competitionId: string) => void;
  fetchPitchAnalysis: (pitchId: string) => Promise<void>;
  setShowNewPitchModal: (show: boolean) => void;
  setShowTeamModal: (show: boolean) => void;
}

export interface Competition {
  id: string;
  name: string;
  date: string;
  participants: number;
}

export interface PitchAnalysis {
  id: string;
  pitchId: string;
  analysis: string;
  score: number;
}