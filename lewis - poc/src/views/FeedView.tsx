/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import MessageComponent from "./MessageComponent";
import { Message } from "../types/types";
import getAIResponse from "../components/shared/getAIResponse";
import DetailedAnalysisDialog from "../components/shared/DetailedAnalysisDialog";
import ImprovementsDialog from "../components/shared/ImprovementsDialog";
import TeamFeedbackDialog from "../components/shared/TeamFeedbackDialog";
import CompetitionsDialog from "../components/shared/CompetitionsDialog";
import MediaUploadDialog from "../views/MediaUploadDialog";
import VideoUploadHandler from "../components/handlers/VideoUploadHandler";
import ChatInput from "../components/shared/ChatInput";
import emptyStateImage from "../assets/coachlogo.svg";
import emptyArrowImage from "../assets/arrow.svg";
import topArrowImage from "../assets/arrow-top.svg";
import TeamFeedbackCard from "../components/shared/teamFeedbackCard";

interface FeedViewProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const FeedView: React.FC<FeedViewProps> = ({ messages, setMessages }) => {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [improvementsDialogOpen, setImprovementsDialogOpen] = useState(false);
  const [teamFeedbackDialogOpen, setTeamFeedbackDialogOpen] = useState(false);
  const [competitionsDialogOpen, setCompetitionsDialogOpen] = useState(false);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [isVersionUpload, setIsVersionUpload] = useState(false);

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

  const handleUserInput = (input: string) => {
    console.log("🔥 handleUserInput CALLED with:", input);
    
    setMessages((prev) => {
      console.log("🥰 Updating messages:", prev);
      const newMessages = [...prev, { id: crypto.randomUUID(), pitchId: "defaultPitchId", sender: "user", text: input, timestamp: new Date().toLocaleTimeString() }];
      console.log("😎😎😎 New messages array:", newMessages);

      // ✅ Ensure `processUserCommand` is always called after `setMessages`
      setTimeout(() => {
        console.log("🚀 Calling processUserCommand...");
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
      "enter a competition": () => setCompetitionsDialogOpen(true),
    };

    if (commandMap[input]) {
      console.log(`Opening Dialog for Command: ${input}`);
      commandMap[input]();
      return;
    }

    console.log("No match found, sending to AI.");
    setTimeout(async () => {
      const response: string = await getAIResponse(input);
      setMessages((prev) => {
        console.log("🤖 Adding AI response to messages:", prev);
        return [...prev, { id: crypto.randomUUID(), pitchId: "defaultPitchId", sender: "coach", text: response, timestamp: new Date().toLocaleTimeString() }];
      });
    }, 1500);
  };
  const [teamFeedback, setTeamFeedback] = useState([
    { user: "John", comment: "Your ending is strong, but the middle felt rushed." },
    { user: "Maria", comment: "Try making the call-to-action more direct." },
    { user: "Alex", comment: "Great energy! Maybe slow down just a bit." },
  ]);
  
  
  const handleSendVideo = (fileUrl: string, isPortrait: boolean) => {
    VideoUploadHandler({ fileUrl, isPortrait, setMessages, isVersionUpload });
    setIsVersionUpload(false);
  };

  return (
    <Box ref={feedRef} sx={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: 800, margin: "0 auto", height: "calc(100vh - 56px - 72px)", paddingBottom: "16px" }}>
          <Box sx={{  maxWidth: "100%", width: "600" , justifyContent: "flex-top", pt: 2, pl: 3, pr: 3 }}>
            <TeamFeedbackCard feedbackData={teamFeedback} onQuickReply={handleQuickReply} />
        </Box>
      
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", width: "100%", pb: 2, pl: 3, pr: 3 }}> 
      <img src={emptyStateImage} alt="No messages" style={{ maxWidth: "100%", width: "300px" }} />
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Typography variant="h2" color="text.secondary">Ready to Jump?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>Upload or record your first pitch video, and I'll help you refine it!</Typography>
          <img src={emptyArrowImage} alt="No messages" style={{ maxWidth: "100%", width: "600px" }} />
        </Box>
      </Box>
      {messages.map((message) => (
        <MessageComponent key={message.id} message={message} onQuickReply={handleQuickReply} />
      ))}
      <ChatInput onSendMessage={handleUserInput} onOpenMediaDialog={() => setMediaDialogOpen(true)} />
      <DetailedAnalysisDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <ImprovementsDialog open={improvementsDialogOpen} onClose={() => setImprovementsDialogOpen(false)} improvementsText={""} />
      <TeamFeedbackDialog open={teamFeedbackDialogOpen} onClose={() => setTeamFeedbackDialogOpen(false)} />
      <CompetitionsDialog open={competitionsDialogOpen} onClose={() => setCompetitionsDialogOpen(false)} />
      <MediaUploadDialog open={mediaDialogOpen} onClose={() => setMediaDialogOpen(false)} onSendVideo={handleSendVideo} isVersionUpload={isVersionUpload} />
    </Box>
    
  );
};

export default FeedView;
