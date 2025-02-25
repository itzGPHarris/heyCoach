/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/store/slices/submissionSlice.ts
import { StateCreator } from 'zustand';
import { Submission, SubmissionData } from '../types';

export interface SubmissionState {
  submissions: Record<string, Submission>;
  selectedSubmission: Submission | null;
  submissionDetailOpen: boolean;
  submissionSuccessOpen: boolean;
  submissionFormOpen: boolean;
  submissionDashboardOpen: boolean;
}

export interface SubmissionActions {
  fetchSubmissions: (competitionId: string) => Promise<void>;
  submitToCompetition: (competitionId: string, data: SubmissionData) => Promise<void>;
  updateSubmission: (submissionId: string, updates: Partial<Submission>) => Promise<void>;
  deleteSubmission: (submissionId: string) => Promise<void>;
  
  setSelectedSubmission: (submission: Submission | null) => void;
  setSubmissionDetailOpen: (open: boolean) => void;
  setSubmissionSuccessOpen: (open: boolean) => void;
  setSubmissionFormOpen: (open: boolean) => void;
  setSubmissionDashboardOpen: (open: boolean) => void;
}

export type SubmissionSlice = SubmissionState & SubmissionActions;

const createSubmissionSlice: StateCreator<SubmissionSlice> = (set, get) => ({
  // Initial state
  submissions: {},
  selectedSubmission: null,
  submissionDetailOpen: false,
  submissionSuccessOpen: false,
  submissionFormOpen: false,
  submissionDashboardOpen: false,

  // Data fetching actions
  fetchSubmissions: async (competitionId) => {
    try {
      // Replace with actual API call
      const mockSubmissions: any[] = [
        // Your mock data here
      ];
      
      // Convert array to record for efficient lookups
      const submissionsRecord = mockSubmissions.reduce((acc, submission) => {
        acc[submission.id] = submission;
        return acc;
      }, {} as Record<string, Submission>);
      
      set({ submissions: submissionsRecord });
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  },
  
  submitToCompetition: async (competitionId, data) => {
    try {
      // Replace with actual API call
      const newSubmission: Submission = {
        id: Date.now().toString(),
        competitionId,
        name: data.title,
        competitionName: "Competition Name", // This would come from your API
        description: data.description,
        date: new Date().toISOString(),
        status: 'submitted',
        teamSize: data.team.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        video: {
          url: data.videoPreview || '',
          thumbnailUrl: data.videoPreview,
          duration: 0 // Would be calculated from the actual video
        },
        documents: [],
        team: data.team
      };
      
      set((state) => ({
        submissions: {
          ...state.submissions,
          [newSubmission.id]: newSubmission
        },
        selectedSubmission: newSubmission,
        submissionSuccessOpen: true
      }));
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error submitting to competition:", error);
      throw error;
    }
  },
  
  updateSubmission: async (submissionId, updates) => {
    try {
      const state = get();
      if (!state.submissions[submissionId]) {
        throw new Error(`Submission ${submissionId} not found`);
      }
      
      const updatedSubmission = {
        ...state.submissions[submissionId],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      set((state) => ({
        submissions: {
          ...state.submissions,
          [submissionId]: updatedSubmission
        },
        selectedSubmission: state.selectedSubmission?.id === submissionId 
          ? updatedSubmission 
          : state.selectedSubmission
      }));
      
      return Promise.resolve();
    } catch (error) {
      console.error(`Error updating submission ${submissionId}:`, error);
      throw error;
    }
  },
  
  deleteSubmission: async (submissionId) => {
    try {
      const state = get();
      const { [submissionId]: _, ...restSubmissions } = state.submissions;
      
      set({
        submissions: restSubmissions,
        selectedSubmission: state.selectedSubmission?.id === submissionId 
          ? null 
          : state.selectedSubmission
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error(`Error deleting submission ${submissionId}:`, error);
      throw error;
    }
  },
  
  // UI state actions
  setSelectedSubmission: (submission) => set({ selectedSubmission: submission }),
  setSubmissionDetailOpen: (open) => set({ submissionDetailOpen: open }),
  setSubmissionSuccessOpen: (open) => set({ submissionSuccessOpen: open }),
  setSubmissionFormOpen: (open) => set({ submissionFormOpen: open }),
  setSubmissionDashboardOpen: (open) => set({ submissionDashboardOpen: open })
});

export default createSubmissionSlice;