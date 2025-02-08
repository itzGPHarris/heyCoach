import { Competition, PitchAnalysis, User, PitchFeedback } from './types';
import { Pitch, Metrics } from '../store/types'; // ✅ Import `Pitch` from `store/types.ts`

export const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Weekly Pitch Challenge',
    description: 'Compete in this week\'s exciting competition!',
    startDate: '2025-01-20T00:00:00Z',
    endDate: '2025-01-27T00:00:00Z',
    prize: '$500',
    status: 'active',
    participants: 25,
    submissions: [],
    name: '',
    date: ''
  }
];

export class MockAPIClient {
  async getCompetitions(): Promise<Competition[]> {
    console.log('Mock getCompetitions called');
    return Promise.resolve(mockCompetitions);
  }

  async getPitchesMock(): Promise<Record<string, Pitch>> {
    console.log('Mock getPitchesMock called');
    return Promise.resolve({}); // ✅ Update this to return mock pitch data
  }

  async updatePitch(pitchId: string, updates: Partial<Pitch>): Promise<Pitch> {
    console.log(`Mock updatePitch called for ${pitchId} with updates:`, updates);
    
    const defaultMetrics: Metrics = {
      clarity: 0,
      engagement: 0,
      pacing: 0,
      structure: 0,
    };

    const updatedPitch: Pitch = {
      id: pitchId,
      title: updates.title || 'Untitled Pitch',
      description: updates.description || 'No description available',
      playbackId: updates.playbackId || '',
      score: updates.score || 0,
      likes: updates.likes || 0,
      comments: Array.isArray(updates.comments) ? updates.comments : [] as never[],
      transcript: updates.transcript || '',
      timestamp: updates.timestamp || new Date().toISOString(),
      feedback: updates.feedback || [],
      metrics: updates.metrics || defaultMetrics, // ✅ Ensured metrics are always defined
      aiCoachSummary: updates.aiCoachSummary || 'No AI feedback available', // ✅ Added missing aiCoachSummary field
      history: updates.history || [],
      
      // ✅ Add missing required fields
      videoUrl: updates.videoUrl || "https://mock.video.url/sample.mp4", // Use a mock video URL
      isPortrait: updates.isPortrait ?? false,
      userId: updates.userId || 'mock-user-id',
      createdAt: updates.createdAt || new Date().toISOString(),
      updatedAt: updates.updatedAt || new Date().toISOString(),
      pitchAnalysisId: updates.pitchAnalysisId || undefined,
      pitchAnalysis: updates.pitchAnalysis || undefined,
      competitionId: updates.competitionId || undefined,
      competition: updates.competition || undefined,
      user: updates.user || undefined,
      isPublic: updates.isPublic ?? false,
      isDeleted: updates.isDeleted ?? false,
      isFlagged: updates.isFlagged ?? false,
      isReviewed: updates.isReviewed ?? false,
    };
    
    return Promise.resolve(updatedPitch);
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
      feedback: [],
      createdAt: new Date().toISOString(),
    });
  }

  async getPitchAnalysis(pitchId: string): Promise<PitchAnalysis> {
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
      feedback: [],
      createdAt: new Date().toISOString(),
    });
  }

  async addPitchFeedback(
    pitchId: string,
    feedback: Omit<PitchFeedback, 'id' | 'timestamp'>
  ): Promise<PitchFeedback> {
    return Promise.resolve({
      id: `${pitchId}_feedback_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...feedback,
    });
  }

  async getCurrentUser(): Promise<User> {
    return Promise.resolve({
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
    });
  }
}
