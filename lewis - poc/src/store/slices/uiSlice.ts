import { StateCreator } from "zustand";
import { ViewType } from "../types";

export interface UIState {
  // Existing states
  activeTab: ViewType;
  showAICoach: boolean;
  dashboardOpen: boolean;
  profileOpen: boolean;
  settingsOpen: boolean;
  showMediaDialog: boolean;
  showAnalysisDialog: boolean;
  showImprovementsDialog: boolean;
  showTeamFeedbackDialog: boolean;
  showCompetitionDialog: boolean;
  isVersionsDialogOpen: boolean;
  isLoading: boolean;
  error: string | null;
  submissionDashboardOpen: boolean;
  
  // Add this new state
  submissionFormOpen: boolean;
}

export interface UIActions {
  // Existing actions
  setActiveTab: (tab: ViewType) => void;
  toggleAICoach: () => void;
  setDashboardOpen: (open: boolean) => void;
  setProfileOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setShowMediaDialog: (show: boolean) => void;
  setShowAnalysisDialog: (show: boolean) => void;
  setShowImprovementsDialog: (show: boolean) => void;
  setShowTeamFeedbackDialog: (show: boolean) => void;
  setShowCompetitionDialog: (show: boolean) => void;
  setVersionsDialogOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSubmissionDashboardOpen: (open: boolean) => void;
  
  // Add this new action
  setSubmissionFormOpen: (open: boolean) => void;
}

export type UISlice = UIState & UIActions;

const createUISlice: StateCreator<UISlice> = (set) => ({
  // Initial state
  activeTab: "feed",
  showAICoach: false,
  dashboardOpen: false,
  profileOpen: false,
  settingsOpen: false,
  showMediaDialog: false,
  showAnalysisDialog: false,
  showImprovementsDialog: false,
  showTeamFeedbackDialog: false,
  showCompetitionDialog: false,
  isVersionsDialogOpen: false,
  isLoading: false,
  error: null,
  submissionDashboardOpen: false,
  
  // Add initial state for submissionFormOpen
  submissionFormOpen: false,

  // Actions
  setSubmissionDashboardOpen: (open) => set({ submissionDashboardOpen: open }),
  
  // Add action for submissionFormOpen
  setSubmissionFormOpen: (open) => set({ submissionFormOpen: open }),

  // Rest of the existing actions remain the same
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleAICoach: () => set((state) => ({ showAICoach: !state.showAICoach })),
  setDashboardOpen: (open) => set({ dashboardOpen: open }),
  setProfileOpen: (open) => set({ profileOpen: open }),
  setSettingsOpen: (open) => set({ settingsOpen: open }),
  setShowMediaDialog: (show) => set({ showMediaDialog: show }),
  setShowAnalysisDialog: (show) => set({ showAnalysisDialog: show }),
  setShowImprovementsDialog: (show) => set({ showImprovementsDialog: show }),
  setShowTeamFeedbackDialog: (show) => set({ showTeamFeedbackDialog: show }),
  setShowCompetitionDialog: (show) => set({ showCompetitionDialog: show }),
  setVersionsDialogOpen: (open) => set({ isVersionsDialogOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
});

export default createUISlice;