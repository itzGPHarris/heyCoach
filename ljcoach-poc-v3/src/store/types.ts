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

export interface Pitch {
  id: string;
  title: string;
  description: string; 
  playbackId: string;
  score: number;
  metrics: Metrics;
  likes: number;
  comments: number;
  transcript?: string;
  history: PitchVersion[];
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
}

export interface PitchStore {
  // UI State
  activeTab: 'feed' | 'dashboard' | 'collaborate' | 'profile';
  expandedCard: string | null;
  showAICoach: boolean;
  showNewPitchModal: boolean;
  showTeamModal: boolean;
  notifications: Notification[];
  userProfile: UserProfile;
  
  // Pitch Data
  pitches: Record<string, Pitch>;
  selectedPitch: string | null;
  
  // AI Coach State
  messages: ChatMessage[];
  coachMessages: ChatMessage[];  
  
  // Theme
  themeMode: 'light' | 'dark';
  
  // Actions
  setActiveTab: (tab: PitchStore['activeTab']) => void;
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