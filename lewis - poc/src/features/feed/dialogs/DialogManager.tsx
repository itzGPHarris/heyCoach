/* eslint-disable @typescript-eslint/no-unused-vars */
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
  competitionHub: DialogState;  // Updated to competitionHub
  versions: DialogState;
  profile: DialogState;
  media: DialogState;
  submissionDashboard: DialogState;
  submissionForm: DialogState;


}

interface CommandResponse {
  message: string;
  quickReplies?: string[];
  action?: CommandAction;
}

export const useDialogManager = () => {
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [improvementsOpen, setImprovementsOpen] = useState(false);
  const [teamFeedbackOpen, setTeamFeedbackOpen] = useState(false);
  const [competitionHubOpen, setCompetitionHubOpen] = useState(false);
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [submissionDashboardOpen, setSubmissionDashboardOpen] = useState(false);
  const [submissionFormOpen, setSubmissionFormOpen] = useState(false);



  const dialogStates: DialogStates = {
    analysis: { isOpen: analysisOpen, setOpen: setAnalysisOpen },
    improvements: { isOpen: improvementsOpen, setOpen: setImprovementsOpen },
    teamFeedback: { isOpen: teamFeedbackOpen, setOpen: setTeamFeedbackOpen },
    competitionHub: { isOpen: competitionHubOpen, setOpen: setCompetitionHubOpen },
    versions: { isOpen: versionsOpen, setOpen: setVersionsOpen },
    profile: { isOpen: profileOpen, setOpen: setProfileOpen },
    media: { isOpen: mediaOpen, setOpen: setMediaOpen },
    submissionDashboard: { 
      isOpen: submissionDashboardOpen, 
      setOpen: (open) => {
        console.log(`🟢 SubmissionDashboard is now: ${open}`);
        setSubmissionDashboardOpen(open);
      } 
    },
    
    submissionForm: { 
      isOpen: submissionFormOpen, 
      setOpen: (open) => {
        console.log(`🟢 SubmissionForm is now: ${open}`);
        setSubmissionFormOpen(open);
      } 
    },
  
  };

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

  const handleCommandAction = useCallback((action: CommandAction) => {
    console.log('💡 DialogManager - Handling action:', action);
    
    const actionMap: Record<CommandAction, () => void> = {
      openMediaDialog: () => {
        console.log('Opening media dialog');
        setMediaOpen(true);
      },
      openSubmissionForm: () => {
        console.log('Opening submission form');
        setSubmissionFormOpen(true);
      },
  
      openTeamFeedback: () => {
        console.log('Opening team feedback');
        setTeamFeedbackOpen(true);
      },
      openImprovements: () => {
        console.log('Opening improvements');
        setImprovementsOpen(true);
      },
      openCompetitionHub: () => {
        console.log('Opening competition hub');
        setCompetitionHubOpen(true);
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
      },
      openSubmissionDashboard: () => {
        console.log('Opening submission dashboard');
        setSubmissionDashboardOpen(true);
      },
      openDashboard: function (): void {
        throw new Error('Function not implemented.');
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

  useEffect(() => {
      console.log('Dialog states updated:', {
      analysis: analysisOpen,
      improvements: improvementsOpen,
      teamFeedback: teamFeedbackOpen,
      competitionHub: competitionHubOpen,
      versions: versionsOpen,
      profile: profileOpen,
      media: mediaOpen,
      submissionDashboard: submissionDashboardOpen,
      submissionForm: submissionFormOpen


    });
  }, [
    analysisOpen,
    improvementsOpen,
    teamFeedbackOpen,
    competitionHubOpen,
    versionsOpen,
    profileOpen,
    mediaOpen,
    submissionDashboardOpen,
    submissionFormOpen


  ]);

  return {
    dialogStates,
    processCommand,
    handleCommandAction
  };
};

export type { DialogState, DialogStates, CommandResponse };
