/* eslint-disable @typescript-eslint/no-unused-vars */
// src/services/mockServices.ts
import { Pitch, Message } from '../store/types';

// Add Metrics interface since it's not exported from store
interface Metrics {
  clarity: number;
  engagement: number;
  pacing: number;
  structure: number;
}

// Mock initial pitch data
const mockPitches: Record<string, Pitch> = {
  'pitch1': {
    id: 'pitch1',
    title: 'RadiantHue Initial Pitch',
    description: 'Beauty industry startup pitch focusing on inclusivity',
    playbackId: 'v3Y602TiLPaUfsZN9VfumowhaC3IWCA200tCMWvg2AkPo',
    score: 75,
    transcript: "Hi, I'm Harper Lewis, founder of Radiant Hue...",
    videoUrl: "https://stream.mux.com/v3Y602TiLPaUfsZN9VfumowhaC3IWCA200tCMWvg2AkPo/high.mp4",
    isPortrait: false,
    metrics: {
      clarity: 78,
      engagement: 72,
      pacing: 80,
      structure: 70
    },
    createdAt: '2025-02-19T10:00:00Z',
    updatedAt: '2025-02-19T10:00:00Z',
    timestamp: '2025-02-19T10:00:00Z',
    aiCoachSummary: 'Good initial pitch with clear value proposition. Consider improving pacing.',
    likes: 5,
    comments: [],
    history: [],
    isPublic: true,
    isDeleted: false,
    isFlagged: false,
    isReviewed: true
  }
};

export interface PitchAnalysis {
  id: string;
  pitchId: string;
  metrics: Metrics;
  transcript: string;
  aiSummary: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prize: string;
  status: 'active' | 'upcoming' | 'completed';
  participants: number;
  submissions: string[];
  name: string;
  date: string;
}

export class MockAPIClient {
  async getCompetitions(): Promise<Competition[]> {
    return Promise.resolve(mockCompetitions);
  }

  async getPitchesMock(): Promise<Record<string, Pitch>> {
    return Promise.resolve(mockPitches);
  }

  async analyzePitch(pitchId: string): Promise<PitchAnalysis> {
    return Promise.resolve({
      id: `analysis_${pitchId}`,
      pitchId,
      metrics: {
        clarity: 85,
        engagement: 78,
        pacing: 92,
        structure: 88,
      },
      transcript: 'Sample pitch transcript...',
      aiSummary: 'AI-generated summary of the pitch...',
      createdAt: new Date().toISOString(),
    });
  }

  async updatePitch(pitchId: string, updates: Partial<Pitch>): Promise<Pitch> {
    const existingPitch = mockPitches[pitchId];
    
    const updatedPitch: Pitch = {
      ...existingPitch,
      ...updates,
      id: pitchId,
      updatedAt: new Date().toISOString(),
      metrics: {
        ...existingPitch?.metrics,
        ...updates.metrics
      }
    };

    mockPitches[pitchId] = updatedPitch;
    return Promise.resolve(updatedPitch);
  }

  async createPitch(pitchData: Partial<Pitch>): Promise<Pitch> {
    const newPitchId = `pitch_${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    const newPitch: Pitch = {
      id: newPitchId,
      title: pitchData.title || 'Untitled Pitch',
      description: pitchData.description || '',
      playbackId: pitchData.playbackId || '',
      score: 0,
      transcript: '',
      videoUrl: pitchData.videoUrl || '',
      isPortrait: pitchData.isPortrait || false,
      metrics: {
        clarity: 0,
        engagement: 0,
        pacing: 0,
        structure: 0
      },
      createdAt: timestamp,
      updatedAt: timestamp,
      aiCoachSummary: '',
      likes: 0,
      comments: [],
      history: [],
      isPublic: false,
      isDeleted: false,
      isFlagged: false,
      isReviewed: false,
      timestamp: timestamp,
      ...pitchData
    };

    mockPitches[newPitchId] = newPitch;
    return Promise.resolve(newPitch);
  }

  async getCurrentUser(): Promise<User> {
    return Promise.resolve({
      id: 'user1',
      name: 'Harper Lewis',
      email: 'harper@example.com',
      avatar: '/api/placeholder/32/32'
    });
  }
}

export const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Weekly Pitch Challenge',
    description: 'Compete in this week\'s exciting competition!',
    startDate: '2025-02-20T00:00:00Z',
    endDate: '2025-02-27T00:00:00Z',
    prize: '$500',
    status: 'active',
    participants: 25,
    submissions: [],
    name: 'Weekly Challenge',
    date: '2025-02-20'
  }
];