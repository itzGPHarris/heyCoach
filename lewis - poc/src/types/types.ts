
/* types/types.ts */
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
  quickReplies?: string[];
  onQuickReply?: (reply: string) => void;
  isFormatted?: boolean; // ✅ Ensure this exists
  isVideo?: boolean;  // Add this flag

}

export interface StoreActions {
  setActiveTab: (tab: string) => void;
  toggleAICoach: () => void;
  setCoachMessages: (messages: ChatMessage[]) => void; // ✅ Ensure this is included
}



export interface ChatMessage {
  id: string;
  content: string; // ✅ This is required for AICoach
  timestamp: Date;
  fromAI: boolean; // ✅ Required for AI/user distinction
  sender: "user" | "coach";
  pitchId?: string; // Added pitchId property

}
// Submission types
export interface Submission {
  id: string;
  name: string;
  competitionId: string;
  competitionName: string;
  description: string;
  date: string;
  status: 'draft' | 'submitted' | 'accepted' | 'rejected';
  teamSize: number;
  createdAt: string;
  updatedAt: string;
  video: {
    url: string;
    thumbnailUrl?: string;
    duration?: number;
  };
  documents: Document[];
  team: TeamMember[];
}

export interface Document {
  id?: string;
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'ppt' | 'other';
  size?: number;
  uploadedAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
}

// Submission form data
export interface SubmissionData {
  title: string;
  description: string;
  video: File | null;
  videoPreview?: string;
  website?: string;
  team: TeamMember[];
  categories?: string[];
  links?: {
    [key: string]: string;
  };
}
