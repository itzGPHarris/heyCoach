import axios from 'axios';
import { ApiPitchVersion, Feedback, Competition } from './types';

// Ensure BASE_URL is properly loaded from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

console.log('Loaded environment variables:', import.meta.env);
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('Resolved BASE_URL:', BASE_URL);

class ApiClient {
  private client;

  constructor() {
    if (!BASE_URL) {
      console.error('API base URL is not defined. Check your .env file.');
      throw new Error('API base URL is not defined.');
    }

    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('ApiClient initialized with baseURL:', BASE_URL);
    
    // Bind methods to prevent context issues
    this.getCurrentCompetition = this.getCurrentCompetition.bind(this);
    this.getCompetitions = this.getCompetitions.bind(this);
  }

  async getPitchVersions(projectId: string): Promise<ApiPitchVersion[]> {
    try {
      const response = await this.client.get(`/projects/${projectId}/versions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pitch versions:', error);
      throw error;
    }
  }

  async getProjectFeedback(projectId: string): Promise<Feedback[]> {
    try {
      const response = await this.client.get(`/projects/${projectId}/feedback`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project feedback:', error);
      throw error;
    }
  }

  async getCurrentCompetition(): Promise<Competition> {
    try {
      const response = await this.client.get('/competitions/current');
      return response.data;
    } catch (error) {
      console.error('Error fetching current competition:', error);
      throw error;
    }
  }

  async enterCompetition(competitionId: string): Promise<void> {
    try {
      await this.client.post(`/competitions/${competitionId}/enter`);
    } catch (error) {
      console.error('Error entering competition:', error);
      throw error;
    }
  }

  async getCompetitions(): Promise<Competition[]> {
    console.log('Current this context:', this);
    console.log('this.client:', this.client);
  
    try {
      const response = await this.client.get('/competitions/current');
      return response.data;
    } catch (error) {
      console.error('Error fetching competitions:', error);
      throw error;
    }
  }
}

export default new ApiClient();
