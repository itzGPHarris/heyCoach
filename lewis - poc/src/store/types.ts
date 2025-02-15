/* eslint-disable @typescript-eslint/no-explicit-any */
//import { Message } from "../types/types";

export interface UserProfile {
  avatar?: string;
  name: string;
}

export interface VideoUploadHandlerProps {
  fileUrl: string;
  isPortrait: boolean;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isVersionUpload: boolean;
}

export interface Metrics {
  clarity: number;
  engagement: number;
  pacing: number;
  structure: number;
}

export type ViewType = "feed" | "dashboard" | "profile"; // ✅ Define allowed view types

export interface StoreState {
  activeTab: ViewType; // ✅ Ensure `activeTab` exists in StoreState
  pitches: Record<string, Pitch>; // ✅ Ensures `pitches` is correctly typed
  selectedPitch: Pitch | null; // ✅ Ensures selectedPitch has the correct type
  activePitchVersion: number;
  messages: Message[];
  coachMessages: Message[];
  showAICoach: boolean;
  themeMode: "light" | "dark";
  notifications: any[];
  isLoading: boolean;
  error: string | null;
  competition: any | null;
  competitions: any[];
  pitchAnalyses: Record<string, unknown>;
  currentUser: any | null;
  expandedCard: any | null;
  showNewPitchModal: boolean;
  showTeamModal: boolean;
  activeCompetition: string | null;
}

export interface StoreActions {
  setActiveTab: (tab: ViewType) => void; // ✅ Add missing setActiveTab function
  setActivePitchVersion: (version: number) => void;
  fetchPitches: () => Promise<void>;
  fetchPitchAnalysis: (pitchId: string) => Promise<void>;
  updatePitch: (pitchId: string, updates: Partial<any>) => Promise<void>;
  addPitch: (pitch: any) => void;
  selectPitch: (id: string | null) => void;
  toggleAICoach: () => void;
  setThemeMode: (mode: "light" | "dark") => void;
  getMessagesForPitch: (pitchId: string) => Message[];
  setActiveCompetition: (competitionId: string | null) => void;
  setShowNewPitchModal: (show: boolean) => void;
  setShowTeamModal: (show: boolean) => void;
  setCoachMessages: (messages: ChatMessage[]) => void;

}

export type Pitch = {
  id: string;
  title: string;
  description: string;
  playbackId: string;
  score: number;
  likes: number;
  comments: string[];
  transcript: string;
  timestamp: string;
  feedback: string[];
  metrics: Metrics;
  aiCoachSummary: string;
  history: string[];
  videoUrl: string;
  isPortrait: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  pitchAnalysisId?: string;
  pitchAnalysis?: string;
  competitionId?: string;
  competition?: string;
  user?: string;
  isPublic: boolean;
  isDeleted: boolean;
  isFlagged: boolean;
  isReviewed: boolean;
};

export interface PitchVersion {
  id: string;
  version: number;
  content: string;
}

export interface ChatMessage {
  id: string;
  content: string; // ✅ This is required for AICoach
  timestamp: Date;
  fromAI: boolean; // ✅ Required for AI/user distinction
  sender?: "user" | "coach";
  pitchId?: string; // Added pitchId property

}

export interface Message {
  content: string; // ✅ Change 'text' to 'content' to match ChatMessage
  fromAI: boolean; // ✅ Ensure 'fromAI' is a boolean, not a function
  pitchId: string;
  id: string;
  sender: "user" | "coach";
  text?: string;
  component?: JSX.Element;
  timestamp: Date;
  parentId?: string;
  quickReplies?: string[]; // ✅ Make quickReplies optional
  isFormatted?: boolean; // ✅ Ensure this exists

}
export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isPublic: boolean;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}
