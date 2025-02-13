/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message } from "../types/types";

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
  pitches: Record<string, unknown>;
  activePitchVersion: number;
  selectedPitch: string | null;
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
}
