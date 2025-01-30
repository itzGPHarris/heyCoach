// src/api/mockServices.ts
import { Competition, PitchAnalysis, User, CompetitionSubmission, PitchFeedback } from './types';
import { Pitch } from '../store/types'; // ✅ Import `Pitch` from `store/types.ts`

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
    submissions: [
      {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        submissionName: 'AI-Driven Healthcare',
        description: 'Revolutionary healthcare solution using AI',
        points: 95,
        rank: 1,
        submittedAt: '2025-01-22T15:30:00Z'
      }
    ],
    name: '',
    date: ''
  }
];

export const mockPitchAnalysis: PitchAnalysis = {
  id: '1',
  userId: 'user1',
  pitchId: 'pitch1',
  metrics: {
    clarity: 85,
    engagement: 78,
    pacing: 92,
    structure: 88
  },
  transcript: 'Sample pitch transcript...',
  aiSummary: 'AI-generated summary of the pitch...',
  feedback: [
    {
      id: 'feedback1',
      userId: 'coach1',
      author: 'Coach Sarah',
      role: 'Pitch Expert',
      text: 'Great delivery! Consider adding more market statistics.',
      timestamp: '2025-01-22T16:00:00Z'
    }
  ],
  createdAt: '2025-01-22T15:45:00Z'
};

export class MockAPIClient {
  async getCompetitions(): Promise<Competition[]> {
    console.log('Mock getCompetitions called');
    return Promise.resolve(mockCompetitions);
  }

  async updatePitch(pitchId: string, updates: Partial<Pitch>): Promise<Pitch> {
    console.log(`Mock updatePitch called for ${pitchId} with updates:`, updates);

    // Simulate finding the pitch in a real database
    const updatedPitch: Pitch = {
      id: pitchId,
      title: updates.title || '',
      description: updates.description || '',
      score: updates.score || 0,
      likes: updates.likes || 0,
      comments: updates.comments || [],
      timestamp: updates.timestamp || new Date().toISOString(),
      feedback: updates.feedback || [],
      history: updates.history || []
    };

    return Promise.resolve(updatedPitch);
  }


  async analyzePitch(pitchId: string): Promise<PitchAnalysis> {
    return Promise.resolve({
      ...mockPitchAnalysis,
      id: `analysis_${pitchId}`,
      pitchId
    });
  }

  async submitToCompetition(
    competitionId: string,
    submission: Omit<CompetitionSubmission, 'id' | 'rank'>
  ): Promise<CompetitionSubmission> {
    const mockSubmission: CompetitionSubmission = {
      id: `${competitionId}_${Date.now()}`,
      rank: mockCompetitions[0].submissions.length + 1,
      ...submission,
      submittedAt: new Date().toISOString()
    };
    return Promise.resolve(mockSubmission);
  }

  async getPitchAnalysis(pitchId: string): Promise<PitchAnalysis> {
    return Promise.resolve({
      ...mockPitchAnalysis,
      id: `analysis_${pitchId}`,
      pitchId
    });
  }

  async addPitchFeedback(
    pitchId: string,
    feedback: Omit<PitchFeedback, 'id' | 'timestamp'>
  ): Promise<PitchFeedback> {
    const mockFeedback: PitchFeedback = {
      id: `${pitchId}_feedback_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...feedback
    };
    return Promise.resolve(mockFeedback);
  }

  async getCurrentUser(): Promise<User> {
    return Promise.resolve({
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user'
    });
  }
}