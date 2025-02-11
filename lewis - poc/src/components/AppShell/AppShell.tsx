import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { getTheme } from "../../styles/theme";
import useStore from "../../store";
import FeedView from "../../views/FeedView";
import DashboardView from "../../views/DashboardView";
import ProfileView from "../../views/ProfileView";
import ChatInput from "../../components/shared/ChatInput";
import getAIResponse from "../../components/shared/getAIResponse"; 
import { Message } from "../../types/types";
import VideoUploadHandler from "../../components/handlers/VideoUploadHandler"; // ✅ Import new handler
import AppHeader from "../../components/shared/AppHeader"; // ✅ Import header component
import MediaUploadDialog from "../../views/MediaUploadDialog"; // ✅ Import media dialog

function AppShell() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const store = useStore();

  // ✅ Manage messages state in AppShell
  const [messages, setMessages] = useState<Message[]>([]);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);

  const notifications = store.notifications || [];
  const activeTab = store.activeTab || 'feed';

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /** ✅ Handles user text messages */
  const handleSendMessage = async (input: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp,
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response: string = await getAIResponse(input);
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "coach",
        text: response,
        parentId: newUserMessage.id,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  /** ✅ Handles video uploads using VideoUploadHandler */
  const handleSendVideo = (fileUrl: string, isPortrait: boolean) => {
    VideoUploadHandler({ fileUrl, isPortrait, setMessages, isVersionUpload: false }); // ✅ Calls refactored handler
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        
        {/* ✅ Use AppHeader Component */}
        <AppHeader 
          mode={mode} 
          setMode={setMode} 
          notifications={notifications} 
          anchorEl={anchorEl} 
          handleProfileClick={handleProfileClick} 
          handleMenuClose={handleMenuClose} 
        />

<Box sx={{ flexGrow: 1, overflow: "hidden", backgroundColor: "background.default", position: "relative", display: "flex", flexDirection: "column", marginTop: "56px", paddingBottom: "70px" }}>
  {activeTab === 'feed' ? (
    <FeedView messages={messages} setMessages={setMessages} /> // ✅ Fix: Pass setMessages
  ) : activeTab === 'dashboard' ? (
    <DashboardView />
  ) : (
    <ProfileView />
  )}
</Box>


        {/* ✅ Media Upload Dialog */}
        <MediaUploadDialog open={mediaDialogOpen} onClose={() => setMediaDialogOpen(false)} onSendVideo={handleSendVideo} isVersionUpload={false} />

        {/* ✅ Fixed Chat Input Always Above Content */}
        <Box sx={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "white", zIndex: 10, boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)" }}>
          <ChatInput onSendMessage={handleSendMessage} onOpenMediaDialog={() => setMediaDialogOpen(true)} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AppShell;
