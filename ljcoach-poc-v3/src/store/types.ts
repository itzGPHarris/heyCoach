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

export interface PitchVersion {
  version: string;
  timestamp: string;
  changes: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  fromAI: boolean;
  timestamp: Date;
  pitchId?: string;
}

export interface Feedback {
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
  comments: number;
  transcript?: string;
  timestamp: string;
  history: PitchVersion[];
  feedback: Feedback[];
}

export interface PitchStore {
  // UI State
  activeTab: ViewType;
  expandedCard: string | null;
  showAICoach: boolean;
  showNewPitchModal: boolean;
  showTeamModal: boolean;
  
  // Pitch Data
  pitches: Record<string, Pitch>;
  selectedPitch: string | null;
  
  // Notifications & User
  notifications: Notification[];
  userProfile: UserProfile;
  
  // AI Coach State
  messages: ChatMessage[];
  coachMessages: ChatMessage[];  
  
  // Theme
  themeMode: 'light' | 'dark';
  
  // Actions
  setActiveTab: (tab: ViewType) => void;
  toggleAICoach: () => void;
  setShowNewPitchModal: (show: boolean) => void;
  setShowTeamModal: (show: boolean) => void;
  addPitch: (pitch: Pitch) => void;
  updatePitch: (id: string, updates: Partial<Pitch>) => void;
  addMessage: (message: Omit<ChatMessage, 'id'>) => void;
  selectPitch: (id: string | null) => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  getMessagesForPitch: (pitchId: string) => ChatMessage[];
}