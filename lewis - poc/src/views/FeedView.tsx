/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import MessageComponent from "./MessageComponent";
import { Message } from "../types/types";
import DetailedAnalysisDialog from "../components/shared/DetailedAnalysisDialog";
import ImprovementsDialog from "../components/shared/ImprovementsDialog";
import TeamFeedbackDialog from "../components/shared/TeamFeedbackDialog";
import CompetitionDialog from "../components/shared/dialogs/CompetitionDialog";  {/* competitions */}
import MediaUploadDialog from "../views/MediaUploadDialog";
import VideoUploadHandler from "../components/handlers/VideoUploadHandler";
import ChatInput from "../components/shared/ChatInput";
import emptyStateImage from "../assets/coachlogo.svg";
import emptyArrowImage from "../assets/arrow.svg";
import TeamFeedbackCard from "../components/shared/teamFeedbackCard";
import harperthumb1 from '../assets/harperthumb1.png';
import harperthumb2 from '../assets/harperthumb2.png';
import harperthumb3 from '../assets/harperthumb3.png';
import { generateUUID } from '../utils/uuid';


interface FeedViewProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const FeedView: React.FC<FeedViewProps> = ({ messages, setMessages }) => {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [improvementsDialogOpen, setImprovementsDialogOpen] = useState(false);
  const [teamFeedbackDialogOpen, setTeamFeedbackDialogOpen] = useState(false);
  const [competitionDialogOpen, setCompetitionDialogOpen] = useState(false);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [isVersionUpload, setIsVersionUpload] = useState(false);

  // Enhanced team feedback data with additional properties
  const [teamFeedback, setTeamFeedback] = useState([
    {
      user: "John",
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
      user: "Alex",
      comment: "Great energy! Maybe slow down just a bit.",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "11:45 AM",
      videoThumbnail: harperthumb3
    },
    // Additional team members to demonstrate the stack effect
    {
      user: "Sarah",
      comment: "The product demo section was very clear!",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "12:30 PM",
      videoThumbnail: "/api/placeholder/240/160"
    },
    {
      user: "Michael",
      comment: "Good use of data to support your points.",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "1:15 PM",
      videoThumbnail: "/api/placeholder/240/160"
    },
    {
      user: "Lisa",
      comment: "The market analysis was well-researched.",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "2:00 PM",
      videoThumbnail: "/api/placeholder/240/160"
    },
    {
      user: "David",
      comment: "Consider adding more competitor analysis.",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "2:45 PM",
      videoThumbnail: "/api/placeholder/240/160"
    }
  ]);

  useEffect(() => {
    console.log("🔥🔥🔥 Messages state updated:", messages);
    const feed = feedRef.current;
    if (feed) {
      feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const handleQuickReply = (reply: string) => {
    console.log("Quick Reply Clicked:", reply);
    processUserCommand(reply.trim().toLowerCase());
  };

  const handleReaction = (type: string) => {
    console.log("Reaction:", type);
    // Handle reaction logic here
  };

  const handleUserInput = (input: string) => {
    console.log("🔥 handleUserInput CALLED with:", input);
    
    setMessages((prev) => {
      const newMessages = [...prev, {
        id: generateUUID(),
        pitchId: "defaultPitchId",
        sender: "user" as const,
        text: input,
        timestamp: new Date(),
        content: input,
        fromAI: false
      }];

      setTimeout(() => {
        processUserCommand(input.trim().toLowerCase());
      }, 0);

      return newMessages;
    });
  };

  const processUserCommand = async (input: string) => {
    console.log("🎯🎯🎯🎯 processUserCommand executing with input:", input);    
    const commandMap: Record<string, () => void> = {
      "see detailed breakdown": () => setDialogOpen(true),
      "see analysis": () => setDialogOpen(true),
      "upload a new version": () => { setIsVersionUpload(true); setMediaDialogOpen(true); },
      "upload new version": () => { setIsVersionUpload(true); setMediaDialogOpen(true); },
      "show specific improvements": () => setImprovementsDialogOpen(true),
      "get team feedback": () => setTeamFeedbackDialogOpen(true),
      "enter a competition": () => setCompetitionDialogOpen(true),
      "new pitch": () => { setIsVersionUpload(true); setMediaDialogOpen(true); },
    };

    if (commandMap[input]) {
      console.log(`Opening Dialog for Command: ${input}`);
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
      const matchedKeyword = Object.keys(staticResponses).find((keyword) => lowerMessage.includes(keyword));
      
      return matchedKeyword 
        ? staticResponses[matchedKeyword][Math.floor(Math.random() * staticResponses[matchedKeyword].length)] 
        : "That's an interesting point! Could you clarify what you need help with?";
    };
    
    setTimeout(() => {
      const aiMessage = findAIResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: generateUUID(),
          pitchId: "defaultPitchId",
          sender: "coach",
          text: aiMessage,
          timestamp: new Date(),
          content: aiMessage,
          fromAI: true,
        },
      ]);
    }, 1500);
  };

  const handleSendVideo = (fileUrl: string, isPortrait: boolean) => {
    VideoUploadHandler({ fileUrl, isPortrait, setMessages, isVersionUpload });
    setIsVersionUpload(false);
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
        paddingBottom: "16px" 
      }}
    >
      
      <Box sx={{ maxWidth: "100%", pt: 4, px: 2 }}>
        <TeamFeedbackCard 
          feedbackData={teamFeedback}
          onQuickReply={handleQuickReply}
          onReaction={handleReaction}
        />
      </Box>

      {messages.length === 0 && (
        <Box sx={{ 
          height: "100%", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "flex-end", 
          alignItems: "center", 
          width: "100%", 
          pb: 2, 
          px: 3 
        }}> 
          <img src={emptyStateImage} alt="No messages" style={{ maxWidth: "100%", width: "300px" }} />
          <Box sx={{ marginTop: 4, textAlign: "center" }}>
            <Typography variant="h2" color="text.secondary">Ready to Jump?</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
              Upload or record your first pitch video, and I'll help you refine it!
            </Typography>
            <img src={emptyArrowImage} alt="Arrow indicator" style={{ maxWidth: "100%", width: "600px" }} />
          </Box>
        </Box>
      )}

      {messages.map((message) => (
        <MessageComponent 
          key={message.id} 
          message={message} 
          onQuickReply={handleQuickReply} 
        />
      ))}

      <ChatInput 
        onSendMessage={handleUserInput} 
        onOpenMediaDialog={() => setMediaDialogOpen(true)} 
      />

      {/* Dialogs */}
      <DetailedAnalysisDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
      />
      <ImprovementsDialog 
        open={improvementsDialogOpen} 
        onClose={() => setImprovementsDialogOpen(false)} 
        improvementsText="" 
      />
      <TeamFeedbackDialog 
        open={teamFeedbackDialogOpen} 
        onClose={() => setTeamFeedbackDialogOpen(false)} 
      />
      <CompetitionDialog 
        open={competitionDialogOpen} 
        onClose={() => setCompetitionDialogOpen(false)} 
      />
      <MediaUploadDialog 
        open={mediaDialogOpen} 
        onClose={() => setMediaDialogOpen(false)} 
        onSendVideo={handleSendVideo} 
        isVersionUpload={isVersionUpload} 
      />
    </Box>
  );
};

export default FeedView;