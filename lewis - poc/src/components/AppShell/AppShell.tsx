/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AppShell/AppShell.tsx
import React from "react";
import { CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../../styles/theme';
import { useAppShell } from "./useAppShell";
import SimplifiedFeedView from "../../features/feed/simplifiedFeedview"; // Import the simplified view
import AppHeader from "../shared/AppHeader";
import { Dialogs } from "./Dialogs";

function AppShell() {
  const theme = getTheme('light');
  
  const {
    dialogs,
    handleSendVideo,
    handleProfileClick,
    handleMenuClose,
    handleCommand,
    anchorEl
  } = useAppShell();

  // Make sure the dialog state is correctly structured
  const dialogStates = {
    submissionDashboard: dialogs.submissionDashboard,
    dashboard: dialogs.dashboard,
    profile: dialogs.profile,
    settings: dialogs.settings,
    media: dialogs.media,
    competition: dialogs.competition,
    versions: dialogs.versions,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AppHeader 
          setSubmissionDashboardOpen={dialogs.submissionDashboard.setOpen}
          setProfileOpen={dialogs.profile.setOpen}
          setSettingsOpen={dialogs.settings.setOpen}
          anchorEl={anchorEl}
          handleProfileClick={handleProfileClick}
          handleMenuClose={handleMenuClose}
        />

        <Box sx={{ 
          flexGrow: 1, 
          overflow: "auto", // Changed from "hidden" to "auto" for better scrolling
          backgroundColor: "background.default", 
          position: "relative", 
          display: "flex", 
          flexDirection: "column", 
          marginTop: "56px"
          // Removed paddingBottom to allow SimplifiedFeedView to control its own padding
        }}>
          {/* Use the SimplifiedFeedView for testing */}
          <SimplifiedFeedView onCommand={(action: string) => handleCommand(action as any)} />
          </Box>

        {/* Keep the dialogs for now, but we'll eventually refactor this */}
        <Dialogs 
          dialogStates={dialogStates} 
          onSendVideo={handleSendVideo} 
        />
      </Box>
    </ThemeProvider>
  );
}

export default AppShell;