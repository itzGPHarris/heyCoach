// 📌 Fully Updated api/types.ts for Compatibility

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  }
  
  export interface Metrics {
    clarity: number;
    engagement: number;
    pacing: number;
    structure: number;
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
  
  export interface Competition {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    prize: string;
    status: 'active' | 'completed' | 'upcoming';
    participants: number;
    submissions: CompetitionSubmission[];
    name: string;
    date: string;
  }
  
  export interface CompetitionSubmission {
    id: string;
    userId: string;
    userName: string;
    submissionName: string;
    description: string;
    points: number;
    rank: number;
    submittedAt: string;
  }
  
  export interface Pitch {
    id: string;
    title: string;
    description: string;
    playbackId?: string;
    score: number;
    likes: number;
    comments: ChatMessage[];
    transcript?: string;
    timestamp: string;
    feedback: Feedback[];
    history: PitchVersion[];
  }
  
  export interface PitchAnalysis {
    id: string;
    pitchId: string;
    metrics: Metrics;
    transcript: string;
    aiSummary: string;
    feedback: Feedback[];
    createdAt: string;
  }
  
  export interface PitchFeedback {
    id: string;
    userId: string;
    author: string;
    role?: string;
    text: string;
    timestamp: string;
  }
  export interface StoreActions {
    setActiveTab: (tab: string) => void;
    toggleAICoach: () => void;
    setCoachMessages: (messages: ChatMessage[]) => void; // ✅ Ensure this is included
  }
  