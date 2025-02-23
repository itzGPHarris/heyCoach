// src/components/AppShell/useAppShell.ts
import { useState, useCallback } from 'react';
import useStore from '../../store';
import VideoUploadHandler from '../handlers/VideoUploadHandler';
import { CommandAction } from '../../utils/constants';

export const useAppShell = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const { 
    addMessage,
    setDashboardOpen,
    setProfileOpen,
    setSettingsOpen,
    setShowMediaDialog,
    setShowCompetitionDialog,
    setVersionsDialogOpen,
    //dashboardOpen,
    profileOpen,
    settingsOpen,
    showMediaDialog,
    showCompetitionDialog,
    isVersionsDialogOpen,
    submissionDashboardOpen,
    setSubmissionDashboardOpen

  } = useStore();

  const handleProfileClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSendVideo = useCallback((fileUrl: string, isPortrait: boolean) => {
    console.log("📹 AppShell - Handling video upload", { fileUrl, isPortrait });
    VideoUploadHandler({ 
      fileUrl, 
      isPortrait, 
      setMessages: addMessage,
      isVersionUpload: false 
    });
    setShowMediaDialog(false);
  }, [addMessage, setShowMediaDialog]);

  // Handle coach commands
  const handleCommand = useCallback((action: CommandAction) => {
    switch (action) {
      case 'openMediaDialog':
        setShowMediaDialog(true);
        break;
      case 'openCompetitionHub':
        setShowCompetitionDialog(true);
        break;
      case 'openDashboard':
        // When opening dashboard from commands, ensure competition dialog is closed
        setShowCompetitionDialog(false);
        setDashboardOpen(true);
        break;
      case 'openProfile':
        setProfileOpen(true);
        break;
      case 'openPitchVersions':
        setVersionsDialogOpen(true);
        break;
      // Add other command handlers as needed
    }
  }, [
    setShowMediaDialog, 
    setShowCompetitionDialog, 
    setDashboardOpen, 
    setProfileOpen, 
    setVersionsDialogOpen
  ]);

  // Handle navigation between competition and submission views
  const handleCompetitionNavigation = useCallback((view: 'competition' | 'submissions') => {
    if (view === 'competition') {
      setSubmissionDashboardOpen(false);
      setShowCompetitionDialog(true);
    } else {
      setShowCompetitionDialog(false);
      setSubmissionDashboardOpen(true);
    }
  }, [setDashboardOpen, setShowCompetitionDialog]);

  return {
    dialogs: {
      submissionDashboard: { 
        isOpen: submissionDashboardOpen, 
        setOpen: setSubmissionDashboardOpen 
      },
      dashboard: { 
        isOpen: submissionDashboardOpen, 
        setOpen: setSubmissionDashboardOpen 
      },
      profile: { 
        isOpen: profileOpen, 
        setOpen: setProfileOpen 
      },
      settings: { 
        isOpen: settingsOpen, 
        setOpen: setSettingsOpen 
      },
      media: { 
        isOpen: showMediaDialog, 
        setOpen: setShowMediaDialog 
      },
      competition: { 
        isOpen: showCompetitionDialog, 
        setOpen: setShowCompetitionDialog 
      },
      versions: { 
        isOpen: isVersionsDialogOpen, 
        setOpen: setVersionsDialogOpen 
      }
    },
    addMessage,
    handleSendVideo,
    handleProfileClick,
    handleMenuClose,
    handleCommand,
    handleCompetitionNavigation,  // Added for better navigation control
    anchorEl
  };
};

export default useAppShell;