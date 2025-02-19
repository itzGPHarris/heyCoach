/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
{/* views */}
import FeedView from "../../views/FeedView";
import ChatInput from "../../components/shared/ChatInput";
import getAIResponse from '../../components/shared/getAIResponse';
import VideoUploadHandler from "../../components/handlers/VideoUploadHandler";
import AppHeader from "../../components/shared/AppHeader";

{/* utilities */}
import { generateUUID } from '../../utils/uuid';
import { COACH_COMMANDS, getCommandFromTrigger, CommandAction } from '../../utils/constants';
import { Message } from "../../types/types";
import { getTheme } from "../../styles/theme";

{/* dialogs */}
import CompetitionsDialog from "../shared/dialogs/CompetitionDialog";
import PitchVersionsDialog from '../shared/dialogs/PitchVersionsDialog';
import MediaUploadDialog from "../../views/MediaUploadDialog";
import SettingsDialog from "../../views/SettingsDialog";
import DashboardView from "../../views/DashboardView";
import ProfileView from "../../views/ProfileView";






function AppShell() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [competitionDialogOpen, setCompetitionDialogOpen] = useState(false);
  const [isVersionsDialogOpen, setIsVersionsDialogOpen] = useState(false);

  // Handle the "pitch versions" command
  const handleVersionsCommand = () => {
    setIsVersionsDialogOpen(true);
  }

  

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const executeCommand = (action: CommandAction) => {
    const actionMap: Record<CommandAction, () => void> = {
      'openMediaDialog': () => setMediaDialogOpen(true),
      'openDashboard': () => setDashboardOpen(true),
      'openTeamFeedback': () => {}, // Add appropriate handler
      'openImprovements': () => {}, // Add appropriate handler
      'openCompetitions': () => setCompetitionDialogOpen(true) ,
      'openPitchVersions': () => setIsVersionsDialogOpen(true) ,
    };

    actionMap[action]();
  };
  /** Handle user text messages with improved AI response handling */
  const handleSendMessage = async (input: string) => {
    // Check if input matches any command
    const commandMatch = getCommandFromTrigger(input);
    
    // Add user message
    const userMessage: Message = {
      id: generateUUID(),
      sender: "user",
      text: input,
      timestamp: new Date(),
      pitchId: "",
      content: input,
      fromAI: false
    };
    setMessages(prev => [...prev, userMessage]);

    if (commandMatch) {
      // Execute the command
      executeCommand(commandMatch.action);
      
      // Add AI response for the command
      const commandResponse = COACH_COMMANDS[commandMatch.command];
      const aiMessage: Message = {
        id: generateUUID(),
        sender: "coach",
        text: commandResponse.responses[0], // Use first response
        timestamp: new Date(),
        pitchId: "",
        content: commandResponse.responses[0],
        fromAI: true,
        quickReplies: 'quickReplies' in commandResponse ? commandResponse.quickReplies.slice() : []
      };
      setMessages(prev => [...prev, aiMessage]);
      return;
    }

    // If not a command, proceed with normal AI response
    try {
      const response = await getAIResponse(input);
      const aiMessage: Message = {
        id: generateUUID(),
        sender: "coach",
        text: response.text,
        parentId: userMessage.id,
        timestamp: new Date(),
        pitchId: "",
        content: response.text,
        fromAI: true,
        quickReplies: response.quickReplies
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  /** Handle video uploads with proper message creation */
  const handleSendVideo = (fileUrl: string, isPortrait: boolean) => {
    console.log("📹 AppShell - Handling video upload");
    VideoUploadHandler({ 
      fileUrl, 
      isPortrait, 
      setMessages: (updater) => {
        setMessages((prev) => {
          const newMessages = typeof updater === 'function' 
            ? updater(prev) 
            : updater;
          console.log("🎥 AppShell - Updated messages after video:", newMessages);
          return newMessages;
        });
      }, 
      isVersionUpload: false 
    });
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AppHeader 
          setDashboardOpen={setDashboardOpen} 
          setProfileOpen={setProfileOpen} 
          setSettingsOpen={setSettingsOpen} 
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
          <FeedView 
            messages={messages} 
            setMessages={setMessages} 
          />
        </Box>

        {/* Dialog Modals */}
        <DashboardView open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
        <ProfileView open={profileOpen} onClose={() => setProfileOpen(false)} />
        <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} /> 
        <CompetitionsDialog open={competitionDialogOpen} onClose={() => setCompetitionDialogOpen(false)} />
        <PitchVersionsDialog open={isVersionsDialogOpen} onClose={() => setIsVersionsDialogOpen(false)}
      />


        <MediaUploadDialog 
          open={mediaDialogOpen} 
          onClose={() => setMediaDialogOpen(false)} 
          onSendVideo={handleSendVideo} 
          isVersionUpload={false} 
        />

        {/* Fixed Chat Input */}
        <Box sx={{ 
          position: "fixed", 
          bottom: 0, 
          width: "100%", 
          backgroundColor: "white", 
          zIndex: 10, 
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)" 
        }}>
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