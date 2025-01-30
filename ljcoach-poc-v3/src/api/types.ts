// src/api/types.ts

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'coach';
}

export interface Competition {
  id: string;
  name: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  date: string; // ✅ Align with store type
  prize: string;
  status: 'upcoming' | 'active' | 'completed';
  participants: number;
  submissions: CompetitionSubmission[];
}

export interface CompetitionSubmission {
  id: string;
  userId: string;
  userName: string;
  submissionName: string;
  description: string;
  points: number;
  rank?: number;
  thumbnail?: string;
  playbackId?: string;
  submittedAt: string;
}

export interface PitchFeedback {
  id: string;
  userId: string;
  author: string;
  role?: string;
  text: string;
  timestamp: string;
}

export interface PitchAnalysis {
  id: string;
  userId: string;
  pitchId: string;
  metrics: {
    clarity: number;
    engagement: number;
    pacing: number;
    structure: number;
  };
  transcript: string;
  aiSummary: string;
  feedback: PitchFeedback[];
  createdAt: string;
}

// ✅ Unified with store Feedback type
export interface Feedback {
  id: string;
  userId: string;
  author: string;
  role?: string;
  text: string;
  timestamp: string;
}

export interface ApiPitchVersion {
  id: string;
  version: string;
  playbackId: string;
  transcript: string;
  metrics: {
    clarity: number;
    engagement: number;
    pacing: number;
    structure: number;
  };
  aiCoachSummary: string;
  feedback: PitchFeedback[];
}

export interface ApiPitch {
  _id: string; // ✅ Matches backend structure
  title: string;
  description: string;
  createdAt: string; // ✅ Matches backend timestamp
  score: number;
  likes: number;
  comments: number;
  history: ApiPitchVersion[]; // ✅ Matches store type but prefixed as ApiPitchVersion
  playbackId?: string;
  transcript?: string;
  metrics?: {
    clarity: number;
    engagement: number;
    pacing: number;
    structure: number;
  };
  aiCoachSummary?: string;
  feedback?: PitchFeedback[];
}
