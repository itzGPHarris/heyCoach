/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Box, Fade, Slide, Button, Typography, Divider, ClickAwayListener } from "@mui/material";
import MessageComponent from "./components/MessageComponent";
import { DialogContainer } from "../../features/feed/dialogs/DialogContainer";
import ChatInput from "../../components/shared/ChatInput";
import { EmptyState } from "./components/EmptyState";
import TeamFeedbackCard from "../../components/shared/teamFeedbackCard";
import VideoUploadHandler from "../../components/handlers/VideoUploadHandler";
import useStore from "../../store";
import { useDialogManager } from "../../features/feed/dialogs/DialogManager";
import { generateUUID } from '../../utils/uuid';
import { CommandAction } from '../../utils/constants';
import { useVideoUpload } from "../../hooks/useVideoUpload";
import harperthumb1 from './../../assets/harperthumb1.png';
import harperthumb2 from './../../assets/harperthumb2.png';
import harperthumb3 from './../../assets/harperthumb3.png';

interface FeedViewProps {
  onCommand?: (action: CommandAction) => void;
}

const FeedView: React.FC<FeedViewProps> = ({ onCommand }) => {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const { messages, addMessage } = useStore();
  const { dialogStates, processCommand, handleCommandAction } = useDialogManager();
  
  // Add state for controlling animations
  const [showFeedback, setShowFeedback] = useState(false);
  const [mediaMenuOpen, setMediaMenuOpen] = useState(false);
  
  // Reference to the plus button in ChatInput for positioning
  const mediaButtonRef = useRef<HTMLElement | null>(null);

  // Trigger animation after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeedback(true);
    }, 300); // Small delay for better visual effect

    return () => clearTimeout(timer);
  }, []);

  // Handler for opening the media menu
  const handleToggleMediaMenu = () => {
    setMediaMenuOpen(prev => !prev);
    
    // Find the media button element and store its reference
    setTimeout(() => {
      const mediaButton = document.querySelector('[data-testid="media-button"]');
      if (mediaButton) {
        mediaButtonRef.current = mediaButton as HTMLElement;
        console.log("Found media button:", mediaButton);
      } else {
        console.log("Could not find media button");
      }
    }, 0);
  };
  
  // Handler for closing the media menu
  const handleCloseMediaMenu = () => {
    setMediaMenuOpen(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("📤 FeedView - File selected:", file.name);
  
      // Use the VideoUploadHandler
      const { handleVideoUpload } = useVideoUpload();
      handleVideoUpload(file, (fileUrl: string, isPortrait: boolean) => {
        console.log("📤 FeedView - Upload complete:", { fileUrl, isPortrait });
        handleSendVideo(fileUrl, isPortrait);
        setMediaMenuOpen(false);
      });
    }
  };

  // Mock team feedback data
  const teamFeedback = [
    {
      user: "Dewey Brown",
      comment: "Your ending is strong, but the middle felt rushed.",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "10:30 AM",
      videoThumbnail: harperthumb1
    },
    {
      user: "Maria",
      comment: "Try making the call-to-action more direct.",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "11:15 AM",
      videoThumbnail: harperthumb2
    },
    {
      user: "Kevin Keeker",
      comment: "Great energy! Maybe slow down just a bit.",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "11:45 AM",
      videoThumbnail: harperthumb3
    }
  ];

  // ... (keeping all your existing handlers)
  const handleQuickReply = (reply: string) => {
    console.log('🎯 FeedView - Quick reply clicked:', reply);
    
    addMessage({
      id: generateUUID(),
      pitchId: "defaultPitchId",
      sender: "user",
      text: reply,
      timestamp: new Date(),
      content: reply,
      fromAI: false
    });

    const command = processCommand(reply);
    console.log('📦 FeedView - Processed command:', command);
    
    if (command) {
      setTimeout(() => {
        addMessage({
          id: generateUUID(),
          pitchId: "defaultPitchId",
          sender: "coach",
          text: command.message,
          timestamp: new Date(),
          content: command.message,
          quickReplies: command.quickReplies,
          fromAI: true
        });

        if (command.action) {
          console.log('🎬 FeedView - Executing action:', command.action);
          handleCommandAction(command.action);
        }
      }, 1000);
    } else {
      console.log('⚠️ FeedView - No command found for reply:', reply);
    }
  };

  const handleUserInput = (input: string) => {
    addMessage({
      id: generateUUID(),
      pitchId: "defaultPitchId",
      sender: "user",
      text: input,
      timestamp: new Date(),
      content: input,
      fromAI: false
    });

    const command = processCommand(input);
    
    setTimeout(() => {
      if (command) {
        addMessage({
          id: generateUUID(),
          pitchId: "defaultPitchId",
          sender: "coach",
          text: command.message,
          timestamp: new Date(),
          content: command.message,
          quickReplies: command.quickReplies,
          fromAI: true
        });
      } else {
        addMessage({
          id: generateUUID(),
          pitchId: "defaultPitchId",
          sender: "coach",
          text: "I understand you want to improve your pitch. What would you like help with?",
          timestamp: new Date(),
          content: "I understand you want to improve your pitch. What would you like help with?",
          quickReplies: ["See analysis", "Get feedback", "Compare pitches", "New recording"],
          fromAI: true
        });
      }
    }, 1500);
  };

  const handleSendVideo = (fileUrl: string, isPortrait: boolean) => {
    console.log("🎥 FeedView - handleSendVideo called with:", { fileUrl, isPortrait });
    VideoUploadHandler({ 
      fileUrl, 
      isPortrait, 
      setMessages: addMessage,
      isVersionUpload: false 
    });
  };

  return (
    <Box 
      sx={{ 
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative"
      }}
    >
      {/* Main Feed Container */}
      <Box 
        ref={feedRef} 
        sx={{ 
          flexGrow: 1, 
          overflowY: "auto", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          width: "100%", 
          maxWidth: 800, 
          margin: "0 auto", 
          height: "calc(100vh - 56px - 72px)", 
          paddingBottom: "12px",
          mb: 2,
          pl: 2, pr: 2
        }}
      >
        {/* Team Feedback Section with Animation */}
        <Box sx={{ maxWidth: "100%", mt:-2, px: 1, borderRadius: 32 }}>
          <Slide 
            direction="down" 
            in={showFeedback} 
            timeout={700}
          >
            <Box>
              <Fade
                in={showFeedback}
                timeout={1000}
              >
                <Box>
                  <TeamFeedbackCard 
                    feedbackData={teamFeedback}
                    onQuickReply={handleQuickReply}
                    onReaction={(type) => console.log("Reaction:", type)}
                  />
                </Box>
              </Fade>
            </Box>
          </Slide>
        </Box>

        {/* Messages Section */}
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <Box sx={{ width: "100%", px: 2 }}>
            {messages.map((message) => (
              <MessageComponent 
                key={message.id} 
                message={message} 
                onQuickReply={handleQuickReply} 
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Fixed Chat Input and Media Menu Container */}
      <ClickAwayListener onClickAway={handleCloseMediaMenu}>
      <Box sx={{ 
            position: "fixed", 
            bottom: 0, 
            left: 0,
            width: "100%", 
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
            }}>
            <Box sx={{ 
                display: "flex", 
                alignItems: "flex-end",
                width: "100%",
                maxWidth: "600px",
                margin: "0 auto",
              }}>
            
              {/* Media Menu */}
                {mediaMenuOpen && (
                  <Box sx={{ 
                    width: "180px", 
                    alignSelf: "flex-start", 
                    ml: 3, // Align with the plus button in ChatInput
                    mb: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.52)",
                    borderRadius: "12px 12px 0 0",
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                    overflow: "hidden",
                  }}>
                    <Box sx={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      gap: 0.5, 
                      p: 1.5, 
                      bgcolor: "white" 
                    }}>
                      <Button 
                        variant="contained" 
                        sx={{ bgcolor: "#0090f2", cursor: "pointer", textAlign: "left" }} 
                        component="label"
                      >
                        <input 
                          type="file" 
                          accept="video/*" 
                          hidden 
                          onChange={handleFileUpload}
                        />
                        <Typography variant="body2">Upload video</Typography>
                      </Button>
                      <Button disabled><Typography variant="body2">Record video</Typography></Button>
                      <Button disabled><Typography variant="body2">Upload PDF</Typography></Button>
                      <Divider sx={{my: 0.75}} />
                      <Button disabled><Typography variant="body2">Choose a coach</Typography></Button>
                    </Box>
                  </Box>
                )}
                </Box>

          {/* Chat Input */}
          <ChatInput 
            onSendMessage={handleUserInput}
            onOpenMediaMenu={handleToggleMediaMenu}
          />
          
        </Box>
      </ClickAwayListener>

      {/* Other Dialogs (excluding media dialog) */}
      <DialogContainer 
        dialogStates={{
          ...dialogStates,
          // Remove media dialog as we're handling it directly in ChatInput
          media: { 
            isOpen: false, 
            setOpen: () => {} 
          }
        }}
        onSendVideo={handleSendVideo}
      />
    </Box>
  );
};

export default FeedView;