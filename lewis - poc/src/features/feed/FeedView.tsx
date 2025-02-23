/* eslint-disable @typescript-eslint/no-unused-vars */
// src/features/feed/FeedView.tsx
import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
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


interface FeedViewProps {
  onCommand?: (action: CommandAction) => void;
}

const FeedView: React.FC<FeedViewProps> = ({ onCommand }) => {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const { messages, addMessage } = useStore();
  const { dialogStates, processCommand, handleCommandAction } = useDialogManager();

  // Mock team feedback data - In production, this would come from your backend
  const teamFeedback = [
    {
      user: "John",
      comment: "Your ending is strong, but the middle felt rushed.",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "10:30 AM",
      videoThumbnail: "/api/placeholder/240/160"
    },
    {
      user: "Maria",
      comment: "Try making the call-to-action more direct.",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "11:15 AM",
      videoThumbnail: "/api/placeholder/240/160"
    },
    {
      user: "Alex",
      comment: "Great energy! Maybe slow down just a bit.",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "11:45 AM",
      videoThumbnail: "/api/placeholder/240/160"
    }
  ];

  useEffect(() => {
    const feed = feedRef.current;
    if (feed) {
      feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const handleQuickReply = (reply: string) => {
    console.log('🎯 FeedView - Quick reply clicked:', reply);
    
    // Add user's quick reply to the feed
    addMessage({
      id: generateUUID(),
      pitchId: "defaultPitchId",
      sender: "user",
      text: reply,
      timestamp: new Date(),
      content: reply,
      fromAI: false
    });

    // Process the command
    const command = processCommand(reply);
    console.log('📦 FeedView - Processed command:', command);
    
    if (command) {
      setTimeout(() => {
        // Add AI's response
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

        // Execute any associated action
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
    // Add user's message to the feed
    addMessage({
      id: generateUUID(),
      pitchId: "defaultPitchId",
      sender: "user",
      text: input,
      timestamp: new Date(),
      content: input,
      fromAI: false
    });

    // Process the command to get relevant quick replies
    const command = processCommand(input);
    
    setTimeout(() => {
      // Always respond with a coach message and quick replies
      // If we have a command match, use its response and quick replies
      // Otherwise use a default response
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
        // Default response with common actions
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
          paddingBottom: "72px"
        }}
      >
        {/* Team Feedback Section */}
        <Box sx={{ maxWidth: "100%", pt: 4, px: 2 }}>
          <TeamFeedbackCard 
            feedbackData={teamFeedback}
            onQuickReply={handleQuickReply}
            onReaction={(type) => console.log("Reaction:", type)}
          />
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
