// src/features/feed/FeedView.tsx
import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import MessageComponent from "./components/MessageComponent";
import DetailedAnalysisDialog from "../../components/shared/dialogs/DetailedAnalysisDialog";
import ImprovementsDialog from "../../components/shared/dialogs/ImprovementsDialog";
import TeamFeedbackDialog from "../../components/shared/dialogs/TeamFeedbackDialog";
import CompetitionDialog from "../../components/shared/dialogs/CompetitionDialog";
import MediaUploadDialog from "../../components/shared/dialogs/MediaUploadDialog";
import VideoUploadHandler from "../../components/handlers/VideoUploadHandler";
import ChatInput from "../../components/shared/ChatInput";
import { EmptyState } from "./components/EmptyState";
import TeamFeedbackCard from "../../components/shared/teamFeedbackCard";
import useStore from "../../store";
import { generateUUID } from '../../utils/uuid';

const FeedView: React.FC = () => {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const { 
    messages, 
    addMessage,
    showMediaDialog,
    setShowMediaDialog,
    showAnalysisDialog,
    setShowAnalysisDialog,
    showImprovementsDialog,
    setShowImprovementsDialog,
    showTeamFeedbackDialog,
    setShowTeamFeedbackDialog,
    showCompetitionDialog,
    setShowCompetitionDialog
  } = useStore();

  // Mock team feedback data
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
    processUserCommand(reply.trim().toLowerCase());
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
    

    setTimeout(() => {
      processUserCommand(input.trim().toLowerCase());
    }, 0);
  };

  const processUserCommand = (input: string) => {
    const commandMap: Record<string, () => void> = {
      "see detailed breakdown": () => setShowAnalysisDialog(true),
      "see analysis": () => setShowAnalysisDialog(true),
      "upload a new version": () => setShowMediaDialog(true),
      "upload new version": () => setShowMediaDialog(true),
      "show specific improvements": () => setShowImprovementsDialog(true),
      "get team feedback": () => setShowTeamFeedbackDialog(true),
      "enter a competition": () => setShowCompetitionDialog(true),
      "new pitch": () => setShowMediaDialog(true),
    };

    if (commandMap[input]) {
      commandMap[input]();
      return;
    }

    // AI response handling
    const staticResponses: Record<string, string[]> = {
      "confidence": [
        "Confidence comes with practice. Try recording yourself multiple times and reviewing your progress.",
        "A strong stance and clear voice projection can help you appear more confident.",
        "Would you like some specific techniques to build confidence in your delivery?"
      ],
      "filler words": [
        "Minimizing 'uh' and 'you know' makes your pitch sound more polished. Try pausing instead of using fillers.",
        "Recording and reviewing your speech can help you identify and reduce filler words.",
        "Would you like exercises to help eliminate filler words from your speech?"
      ],
    };
    
    const findAIResponse = (input: string) => {
      const lowerMessage = input.toLowerCase();
      const matchedKeyword = Object.keys(staticResponses).find(keyword => 
        lowerMessage.includes(keyword)
      );
      
      return matchedKeyword 
        ? staticResponses[matchedKeyword][Math.floor(Math.random() * staticResponses[matchedKeyword].length)] 
        : "That's an interesting point! Could you clarify what you need help with?";
    };
    
    setTimeout(() => {
      const aiMessage = findAIResponse(input);
      addMessage({
        id: generateUUID(),
        pitchId: "defaultPitchId",
        sender: "coach",
        text: aiMessage,
        timestamp: new Date(),
        content: aiMessage,
        fromAI: true,
      });
    }, 1500);
  };

  const handleSendVideo = (fileUrl: string, isPortrait: boolean) => {
    console.log("🎥 FeedView - handleSendVideo called with:", { fileUrl, isPortrait });
    VideoUploadHandler({ 
      fileUrl, 
      isPortrait, 
      setMessages: addMessage,  // Using store's addMessage
      isVersionUpload: false 
    });
    setShowMediaDialog(false);
};



  return (
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
      <Box sx={{ maxWidth: "100%", pt: 4, px: 2 }}>
        <TeamFeedbackCard 
          feedbackData={teamFeedback}
          onQuickReply={handleQuickReply}
          onReaction={(type) => console.log("Reaction:", type)}
        />
      </Box>

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

      {/* Fixed Chat Input */}
      <Box sx={{ 
        position: "fixed", 
        bottom: 0, 
        left: 0,
        width: "100%", 
        backgroundColor: "white", 
        zIndex: 10, 
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)" 
      }}>
        <ChatInput 
          onSendMessage={handleUserInput}
          onOpenMediaDialog={() => setShowMediaDialog(true)}
        />
      </Box>

      {/* Dialogs */}
      <DetailedAnalysisDialog 
        open={showAnalysisDialog} 
        onClose={() => setShowAnalysisDialog(false)} 
      />
      <ImprovementsDialog 
        open={showImprovementsDialog} 
        onClose={() => setShowImprovementsDialog(false)} 
        improvementsText="" 
      />
      <TeamFeedbackDialog 
        open={showTeamFeedbackDialog} 
        onClose={() => setShowTeamFeedbackDialog(false)} 
      />
      <CompetitionDialog 
        open={showCompetitionDialog} 
        onClose={() => setShowCompetitionDialog(false)} 
      />
      <MediaUploadDialog 
        open={showMediaDialog} 
        onClose={() => setShowMediaDialog(false)} 
        onSendVideo={handleSendVideo} 
        isVersionUpload={false} 
      />
    </Box>
  );
};

export default FeedView;