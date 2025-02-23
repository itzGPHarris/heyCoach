// src/components/AppShell/AppShell.tsx
import React from "react";
import { CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { useAppShell } from "./useAppShell";
import FeedView from "../../features/feed/FeedView";
import AppHeader from "../shared/AppHeader";
import { Dialogs } from "./Dialogs";

function AppShell() {
  const {
    dialogs,
    handleSendVideo,
    handleProfileClick,
    handleMenuClose,
    handleCommand,  // Added command handler
    anchorEl
  } = useAppShell();

  return (
    <ThemeProvider>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AppHeader 
          setDashboardOpen={dialogs.dashboard.setOpen}
          setProfileOpen={dialogs.profile.setOpen}
          setSettingsOpen={dialogs.settings.setOpen}
          anchorEl={anchorEl}
          handleProfileClick={handleProfileClick}
          handleMenuClose={handleMenuClose}
        />

        <Box sx={{ 
          flexGrow: 1, 
          overflow: "hidden", 
          backgroundColor: "background.default", 
          position: "relative", 
          display: "flex", 
          flexDirection: "column", 
          marginTop: "56px", 
          paddingBottom: "70px" 
        }}>
          <FeedView onCommand={handleCommand} />
        </Box>

        <Dialogs 
          dialogStates={dialogs} 
          onSendVideo={handleSendVideo} 
        />


      </Box>
    </ThemeProvider>
  );
}

export default AppShell;
