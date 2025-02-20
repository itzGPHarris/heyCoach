// Base interfaces for our domain entities
export interface Pitch {
    id: string;
    title: string;
    description: string;
    playbackId: string;
    score: number;
    transcript: string;
    videoUrl: string;
    isPortrait: boolean;
    metrics: {
      clarity: number;
      engagement: number;
      pacing: number;
      structure: number;
    };
    createdAt: string;
    updatedAt: string;
    isPublic: boolean;
    aiCoachSummary: string;
    timestamp: string;
    likes: number;
    comments: Comment[];
    history: PitchHistory[];
    isDeleted: boolean;
    isFlagged: boolean;
    isReviewed: boolean;

  }
  
  export interface PitchHistory {
    id: string;
    pitchId: string;
    changes: string;
    timestamp: string;
  }

  export interface Message {
    id: string;
    content: string;
    timestamp: Date;
    sender: "user" | "coach";
    pitchId: string;
    fromAI: boolean;
    quickReplies?: string[];
    isVideo?: boolean;  // Add this flag

  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  export type ViewType = "feed" | "analysis" | "improvements" | "teamFeedback" | "competition";
  export type ThemeMode = "light" | "dark";

  export interface PitchVersion {
    id: string;
    name: string;
    date: string;
    // add other properties as needed
  }