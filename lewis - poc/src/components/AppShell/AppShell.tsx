import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { getTheme } from "../../styles/theme";
import useStore from "../../store";
import FeedView from "../../views/FeedView";
import DashboardView from "../../views/DashboardView";
import ProfileView from "../../views/ProfileView";
import ChatInput from "../../components/shared/ChatInput";
import { Message } from "../../types/types";
import AppHeader from "../../components/shared/AppHeader";
import MediaUploadDialog from "../../views/MediaUploadDialog"; 

function AppShell() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const store = useStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const notifications = store.notifications || [];
  const activeTab = store.activeTab || "feed";

  // State for dialogs
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [dashboardDialogOpen, setDashboardDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Functions to open dialogs
  const handleOpenProfileDialog = () => {
    setProfileDialogOpen(true);
    handleMenuClose();
  };

  const handleOpenDashboardDialog = () => {
    setDashboardDialogOpen(true);
    handleMenuClose();
  };

  const handleOpenSettingsDialog = () => {
    setSettingsDialogOpen(true);
    handleMenuClose();
  };

  // Function to close all dialogs
  const handleCloseDialogs = () => {
    setProfileDialogOpen(false);
    setDashboardDialogOpen(false);
    setSettingsDialogOpen(false);
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        {/* App Header with updated props */}
        <AppHeader 
          notifications={notifications} 
          anchorEl={anchorEl} 
          handleProfileClick={handleProfileClick} 
          handleMenuClose={handleMenuClose}
          handleOpenProfileDialog={handleOpenProfileDialog}
          handleOpenDashboardDialog={handleOpenDashboardDialog}
          handleOpenSettingsDialog={handleOpenSettingsDialog}
        />

        <Box sx={{ flexGrow: 1, overflow: "hidden", backgroundColor: "background.default", display: "flex", justifyContent: "center" }}>
          {activeTab === "feed" ? (
            <FeedView messages={messages} setMessages={setMessages} />
          ) : activeTab === "dashboard" ? (
            <DashboardView />
          ) : (
            <ProfileView />
          )}
        </Box>

        {/* Media Upload Dialog */}
        <MediaUploadDialog open={mediaDialogOpen} onClose={() => setMediaDialogOpen(false)} onSendVideo={() => {}} isVersionUpload={false} />

        {/* Profile Dialog */}
        <Dialog open={profileDialogOpen} onClose={handleCloseDialogs}>
          <DialogTitle>Profile</DialogTitle>
          <DialogContent>
            <ProfileView />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogs}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Dashboard Dialog */}
        <Dialog open={dashboardDialogOpen} onClose={handleCloseDialogs}>
          <DialogTitle>Dashboard</DialogTitle>
          <DialogContent>
            <DashboardView />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogs}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Account Settings Dialog */}
        <Dialog open={settingsDialogOpen} onClose={handleCloseDialogs}>
          <DialogTitle>Account Settings</DialogTitle>
          <DialogContent>
            <p>Settings coming soon...</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogs}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Chat Input */}
        <Box sx={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "white", zIndex: 10, boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)" }}>
          <ChatInput onSendMessage={() => {}} onOpenMediaDialog={() => setMediaDialogOpen(true)} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AppShell;
