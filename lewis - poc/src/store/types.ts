import { Metrics } from "../api/types";
import { TeamMember } from "../components/competitions/types";

export interface BaseMessage {
    id: string;
    content: string;
    timestamp: Date;
    fromAI: boolean;
  }
  
  // Regular message in the main feed
  export interface Message extends BaseMessage {
    sender: "user" | "coach";
    pitchId: string;
    text?: string;
    quickReplies?: string[];
  }
  
  // AI Coach specific message
  export interface ChatMessage extends BaseMessage {
    sender: "user" | "coach";  // Add sender
    pitchId: string;          // Add pitchId
    parentId?: string;
    quickReplies?: string[];
  }

  export interface Pitch {
    id: string;
    title: string;
    description: string;
    playbackId: string;
    score: number;
    likes: number;
    comments: string[];
    transcript: string;
    timestamp: string;
    metrics: Metrics; // Define the Metrics interface or type
    aiCoachSummary: string;
    history: string[];
    videoUrl: string;
    isPortrait: boolean;
    createdAt: string;
    updatedAt: string;
    isPublic: boolean;
    isDeleted: boolean;
    isFlagged: boolean;
    isReviewed: boolean;
  }
  
  export type ViewType = "feed" | "profile" | "settings"; // Add this line to export ViewType

  export interface Message {
    id: string;
    sender: 'user' | 'coach';
    timestamp: Date;
    pitchId: string;
    content: string;
    fromAI: boolean;
    quickReplies?: string[];
    parentId?: string;
    isVideo?: boolean;  // Add this flag

  
  }

  export interface PitchVersion {
    id: string;
    name: string;
    date: string;
    // add other properties as needed
  }

  export interface CompetitionState {
    competitions: Competition[];
    submissions: Submission[];
    drafts: Submission[];
  }

  interface PrizeInfo {
    amount: number;
    currency: string;
    description?: string;
  }
  interface Competition {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    prizeDetails: PrizeInfo;
    requirements: string[];
    status: 'upcoming' | 'active' | 'completed';
  }
  
  interface Submission {
    id: string;
    competitionId: string;
    name: string;
    description: string;
    video: VideoInfo;
    website?: string;
    documents: Document[];
    teammates: TeamMember[];
    status: 'draft' | 'submitted' | 'accepted' | 'rejected';
  }
  
  interface VideoInfo {
    url: string;
    thumbnail: string;
    length: number;
  }  