// src/features/dialogs/DialogManager.tsx
import { useState, useCallback, useEffect } from 'react';
import { COACH_COMMANDS, CommandAction } from '../../../utils/constants';

interface DialogState {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
  }
  
  interface DialogStates {
    analysis: DialogState;
    improvements: DialogState;
    teamFeedback: DialogState;
    competition: DialogState;
    versions: DialogState;
    dashboard: DialogState;
    profile: DialogState;
    media: DialogState;
  }
  
  interface CommandResponse {
    message: string;
    quickReplies?: string[];
    action?: CommandAction;
  }
  
  export const useDialogManager = () => {
    // Individual dialog states
    const [analysisOpen, setAnalysisOpen] = useState(false);
    const [improvementsOpen, setImprovementsOpen] = useState(false);
    const [teamFeedbackOpen, setTeamFeedbackOpen] = useState(false);
    const [competitionOpen, setCompetitionOpen] = useState(false);
    const [versionsOpen, setVersionsOpen] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [mediaOpen, setMediaOpen] = useState(false);
  
    // Combine dialog states into a single object
    const dialogStates: DialogStates = {
      analysis: { isOpen: analysisOpen, setOpen: setAnalysisOpen },
      improvements: { isOpen: improvementsOpen, setOpen: setImprovementsOpen },
      teamFeedback: { isOpen: teamFeedbackOpen, setOpen: setTeamFeedbackOpen },
      competition: { isOpen: competitionOpen, setOpen: setCompetitionOpen },
      versions: { isOpen: versionsOpen, setOpen: setVersionsOpen },
      dashboard: { isOpen: dashboardOpen, setOpen: setDashboardOpen },
      profile: { isOpen: profileOpen, setOpen: setProfileOpen },
      media: { isOpen: mediaOpen, setOpen: setMediaOpen }
    };
  
    // Process command and get response
    const processCommand = useCallback((input: string): CommandResponse | null => {
      const normalizedInput = input.toLowerCase().trim();
      
      for (const command of Object.values(COACH_COMMANDS)) {
        if (command.triggers.some(trigger => normalizedInput.includes(trigger))) {
          const randomResponse = command.responses[
            Math.floor(Math.random() * command.responses.length)
          ];
          
          return {
            message: randomResponse,
            quickReplies: command.quickReplies ? [...command.quickReplies] : undefined,
            action: command.action
          };
        }
      }
      return null;
    }, []);
  
    // Handle command action
    const handleCommandAction = useCallback((action: CommandAction) => {
      console.log('💡 DialogManager - Handling action:', action);
      
      const actionMap: Record<CommandAction, () => void> = {
        openMediaDialog: () => {
          console.log('Opening media dialog');
          setMediaOpen(true);
        },
        openDashboard: () => {
          console.log('Opening dashboard');
          setDashboardOpen(true);
        },
        openTeamFeedback: () => {
          console.log('Opening team feedback');
          setTeamFeedbackOpen(true);
        },
        openImprovements: () => {
          console.log('Opening improvements');
          setImprovementsOpen(true);
        },
        openCompetitions: () => {
          console.log('Opening competitions');
          setCompetitionOpen(true);
        },
        openPitchVersions: () => {
          console.log('Opening pitch versions');
          setVersionsOpen(true);
        },
        openAnalysis: () => {
          console.log('Opening analysis');
          setAnalysisOpen(true);
        },
        openProfile: () => {
          console.log('Opening profile');
          setProfileOpen(true);
        }
      };
  
      try {
        if (actionMap[action]) {
          actionMap[action]();
        } else {
          console.warn('Unknown action:', action);
        }
      } catch (error) {
        console.error('Error handling action:', action, error);
      }
    }, []);
  
    // Debug logging for state changes
    useEffect(() => {
      console.log('Dialog states updated:', {
        analysis: analysisOpen,
        improvements: improvementsOpen,
        teamFeedback: teamFeedbackOpen,
        competition: competitionOpen,
        versions: versionsOpen,
        dashboard: dashboardOpen,
        profile: profileOpen,
        media: mediaOpen
      });
    }, [
      analysisOpen,
      improvementsOpen,
      teamFeedbackOpen,
      competitionOpen,
      versionsOpen,
      dashboardOpen,
      profileOpen,
      mediaOpen
    ]);
  
    return {
      dialogStates,
      processCommand,
      handleCommandAction
    };
  };
  
  // Export dialog component types
  export type { DialogState, DialogStates, CommandResponse };
  