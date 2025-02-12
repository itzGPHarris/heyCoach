import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import MessageComponent from "./MessageComponent";
import { Message } from "../types/types";
import getAIResponse from "../components/shared/getAIResponse";
import DetailedAnalysisDialog from "../components/shared/DetailedAnalysisDialog";
import ImprovementsDialog from "../components/shared/ImprovementsDialog";
import TeamFeedbackDialog from "../components/shared/TeamFeedbackDialog";
import CompetitionsDialog from "../components/shared/CompetitionsDialog";
import MediaUploadDialog from "../views/MediaUploadDialog";
//import { getLastPitchVersion } from "../utils/PitchVersionStorage";
import VideoUploadHandler from "../components/handlers/VideoUploadHandler";
import ChatInput from "../components/shared/ChatInput";
import emptyStateImage from "../assets/jumper.svg";

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

  /** Auto-scroll to bottom when new messages arrive */
  useEffect(() => {
    const feed = feedRef.current;
    if (feed) {
      feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  /** ✅ Handles Quick Replies */
  const handleQuickReply = (reply: string) => {
    console.log("Quick Reply Clicked:", reply); // ✅ Debugging log
    processUserCommand(reply); // ✅ Ensure dialog opens immediately
  };
  

  /** ✅ Handles User Input (Detects Commands or Normal Messages) */
  const handleUserInput = (input: string) => {
    const normalizedInput = input.toLowerCase().trim();
    console.log("Processing User Input:", normalizedInput); // ✅ Debugging log
  
    processUserCommand(normalizedInput);
    
    // ✅ Add user message to feed immediately
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: input, timestamp: new Date().toLocaleTimeString() }
    ]);
  };
  

  /** ✅ Process Commands from Both Quick Replies & Chat Input */
  const processUserCommand = async (input: string) => {
    const normalizedInput = input.toLowerCase().trim();
    console.log("Processing Command:", normalizedInput); // ✅ Debugging log
  
    const commandMap: Record<string, () => void> = {
      "see detailed breakdown": () => setDialogOpen(true),
      "see analysis": () => setDialogOpen(true),
      "upload a new version": () => { setIsVersionUpload(true); setMediaDialogOpen(true); },
      "upload new version": () => { setIsVersionUpload(true); setMediaDialogOpen(true); },
      "show specific improvements": () => setImprovementsDialogOpen(true),
      "get team feedback": () => setTeamFeedbackDialogOpen(true),
      "enter a competition": () => setCompetitionsDialogOpen(true),
    };
  
    if (commandMap[normalizedInput]) {
      console.log(`Opening Dialog for Command: ${normalizedInput}`); // ✅ Debugging log
      commandMap[normalizedInput](); // ✅ Calls the correct function
      return; // ✅ Exits function to prevent AI processing
    }
  
    console.log("No match found, sending to AI."); // ✅ Debugging log
  
    // ✅ Only update messages if the input is NOT a recognized command
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: input, timestamp: new Date().toLocaleTimeString() }]);
  
    setTimeout(async () => {
      const response: string = await getAIResponse(input);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "coach", text: response, timestamp: new Date().toLocaleTimeString() }]);
    }, 1500);
  };
    
  
  

  /** ✅ Handle Video Upload */
  const handleSendVideo = (fileUrl: string, isPortrait: boolean) => {
    VideoUploadHandler({ fileUrl, isPortrait, setMessages, isVersionUpload });
    setIsVersionUpload(false);
  };

  return (
    <Box ref={feedRef} sx={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 800, height: "calc(100vh - 56px - 72px)", paddingBottom: "16px" }}>
      
      <img src={emptyStateImage} alt="No messages" style={{ maxWidth: "80%", marginBottom: 16 }} />

      {/* ✅ Render messages using MessageComponent */}
      {messages.map((message) => (
        <MessageComponent key={message.id} message={message} onQuickReply={handleQuickReply} />
      ))}

      {/* ✅ User Chat Input */}
      <ChatInput
  onSendMessage={handleUserInput} // ✅ Ensures user input is processed correctly
  onOpenMediaDialog={() => setMediaDialogOpen(true)}
  onUserInput={handleUserInput} // ✅ Fixes "Function not implemented" error
/>


      {/* ✅ Dialogs */}
      <DetailedAnalysisDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <ImprovementsDialog open={improvementsDialogOpen} onClose={() => setImprovementsDialogOpen(false)} improvementsText={""} />
      <TeamFeedbackDialog open={teamFeedbackDialogOpen} onClose={() => setTeamFeedbackDialogOpen(false)} />
      <CompetitionsDialog open={competitionsDialogOpen} onClose={() => setCompetitionsDialogOpen(false)} />
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
