import axios, { AxiosInstance } from 'axios';
import { CompetitionSubmission, PitchFeedback, Competition, PitchAnalysis, User } from './types';

class APIClient {
  private client: AxiosInstance;
  
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for authentication
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Competition endpoints
  async getCompetitions(): Promise<Competition[]> {
    const response = await this.client.get<Competition[]>('/competitions');
    return response.data;
  }

  async getCompetition(id: string): Promise<Competition> {
    const response = await this.client.get<Competition>(`/competitions/${id}`);
    return response.data;
  }

  async submitToCompetition(
    competitionId: string, 
    submission: Omit<CompetitionSubmission, 'id' | 'rank'>
  ): Promise<CompetitionSubmission> {
    const response = await this.client.post<CompetitionSubmission>(
      `/competitions/${competitionId}/submissions`,
      submission
    );
    return response.data;
  }

  // Pitch analysis endpoints
  async analyzePitch(pitchId: string): Promise<PitchAnalysis> {
    const response = await this.client.post<PitchAnalysis>(
      `/pitches/${pitchId}/analyze`
    );
    return response.data;
  }

  async getPitchAnalysis(pitchId: string): Promise<PitchAnalysis> {
    const response = await this.client.get<PitchAnalysis>(
      `/pitches/${pitchId}/analysis`
    );
    return response.data;
  }

  async addPitchFeedback(
    pitchId: string,
    feedback: Omit<PitchFeedback, 'id' | 'timestamp'>
  ): Promise<PitchFeedback> {
    const response = await this.client.post<PitchFeedback>(
      `/pitches/${pitchId}/feedback`,
      feedback
    );
    return response.data;
  }

  // User endpoints
  async getCurrentUser(): Promise<User> {
    const response = await this.client.get<User>('/users/me');
    return response.data;
  }
}

// Create and export API client instance
export const api = new APIClient(import.meta.env.VITE_API_BASE_URL);
