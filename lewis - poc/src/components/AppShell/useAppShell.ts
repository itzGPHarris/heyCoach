// src/components/AppShell/useAppShell.ts
import { useState, useCallback } from 'react';
import useStore from '../../store';
import VideoUploadHandler from '../handlers/VideoUploadHandler';


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
    dashboardOpen,
    profileOpen,
    settingsOpen,
    showMediaDialog,
    showCompetitionDialog,
    isVersionsDialogOpen
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


  return {
    dialogs: {
      dashboard: { 
        isOpen: dashboardOpen, 
        setOpen: setDashboardOpen 
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
    anchorEl
  };
};

export default useAppShell;