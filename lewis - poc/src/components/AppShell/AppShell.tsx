/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { getTheme } from "../../styles/theme";
import useStore from "../../store";
import FeedView from "../../views/FeedView";
import DashboardView from "../../views/DashboardView";
import ProfileView from "../../views/ProfileView";
import ChatInput from "../../components/shared/ChatInput";
import getAIResponse from '../../components/shared/getAIResponse';
import { Message } from "../../types/types";
import VideoUploadHandler from "../../components/handlers/VideoUploadHandler";
import AppHeader from "../../components/shared/AppHeader";
import MediaUploadDialog from "../../views/MediaUploadDialog";
import SettingsDialog from "../../views/SettingsDialog";

function AppShell() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const store = useStore();

  // ✅ Manage state for modals
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);

  const notifications = store.notifications || [];

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /** ✅ Handles user text messages */
  const handleSendMessage = async (input: string) => {
    const timestamp = new Date();
    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text: input,
      timestamp,
      pitchId: "",
      content: input,
      fromAI: false
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response: string = await getAIResponse(input);
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        sender: "coach",
        text: response,
        parentId: newUserMessage.id,
        timestamp: new Date(),
        pitchId: "",
        content: "",
        fromAI: false
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  /** ✅ Handles video uploads using VideoUploadHandler */
  const handleSendVideo = (fileUrl: string, isPortrait: boolean) => {
    VideoUploadHandler({ fileUrl, isPortrait, setMessages, isVersionUpload: false });
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        
        {/* ✅ Use AppHeader with modal controls */}
        <AppHeader 
          setDashboardOpen={setDashboardOpen} 
          setProfileOpen={setProfileOpen} 
          setSettingsOpen={setSettingsOpen} 
          anchorEl={anchorEl} 
          handleProfileClick={handleProfileClick} 
          handleMenuClose={handleMenuClose} 
        />

        <Box sx={{ flexGrow: 1, overflow: "hidden", backgroundColor: "background.default", position: "relative", display: "flex", flexDirection: "column", marginTop: "56px", paddingBottom: "70px" }}>
          <FeedView messages={messages} setMessages={setMessages} />
        </Box>

        {/* ✅ Dialog Modals */}
        <DashboardView open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
        <ProfileView open={profileOpen} onClose={() => setProfileOpen(false)} />
        <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} /> 
        <MediaUploadDialog open={mediaDialogOpen} onClose={() => setMediaDialogOpen(false)} onSendVideo={handleSendVideo} isVersionUpload={false} />
        {/* ✅ Fixed Chat Input Always Above Content */}
        <Box sx={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "white", zIndex: 10, boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)" }}>
          <ChatInput
            onSendMessage={handleSendMessage}
            onOpenMediaDialog={() => setMediaDialogOpen(true)}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AppShell;
