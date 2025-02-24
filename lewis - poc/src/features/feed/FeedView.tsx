/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Box, Fade, Slide } from "@mui/material";
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
//import { SAMPLE_PITCH_DATA } from '../../utils/constants';
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
  
  // Add state for controlling the animation
  const [showFeedback, setShowFeedback] = useState(false);

  // Trigger animation after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeedback(true);
    }, 300); // Small delay for better visual effect

    return () => clearTimeout(timer);
  }, []);

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
    dialogStates.media.setOpen(false);
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

      {/* Fixed Chat Input */}
      <Box sx={{ 
        position: "fixed", 
        bottom: 0, 
        left: 0,
        width: "100%", 
        zIndex: 10
      }}>
        <ChatInput 
          onSendMessage={handleUserInput}
          onOpenMediaDialog={() => dialogStates.media.setOpen(true)}
        />
      </Box>

      {/* Dialogs */}
      <DialogContainer 
        dialogStates={dialogStates}
        onSendVideo={handleSendVideo}
      />
    </Box>
  );
};

export default FeedView;