// Updated FeedView.tsx - Fixes ChatInput Type Mismatch
import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import ChatInput from "../components/shared/ChatInput";
import MessageList from "./MessageList";
import MediaUploadDialog from "./MediaUploadDialog";
import { handleAIResponse } from "../components/shared/AIResponseHandler";
import { Message } from "../types/types";
import VideoMessage from "../components/shared/VideoMessage";

const FeedView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  const handleSendMessage = (input: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages((prev) => [...prev, { id: prev.length + 1, sender: "user", text: input, timestamp }]);
    handleAIResponse(input, setMessages);
  };

  const handleSendVideo = (fileUrl: string, isPortrait: boolean) => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        component: <VideoMessage fileUrl={fileUrl} timestamp={new Date().toLocaleTimeString()} isPortrait={isPortrait} />,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };
  
  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      width: "100vw", 
      maxWidth: "100%", 
      p: 2, 
      mt:6,
      boxSizing: "border-box", 
      height: "100vh",  
      position: "relative", 
      overflowY: "auto" 
    }}>
      <MessageList messages={messages} />
      <MediaUploadDialog
        open={mediaDialogOpen}
        onClose={() => setMediaDialogOpen(false)}
        onSendVideo={handleSendVideo}
        dialogStyles={{
          position: "fixed",
          bottom: 70, // Positioned above ChatInput
          left: 20, // Aligns to bottom left
          bgcolor: "transparent",
          boxShadow: "none",
        }}
      />  

      <ChatInput onSendMessage={handleSendMessage} onOpenMediaDialog={() => setMediaDialogOpen(true)} />
        </Box>

  );
};

export default FeedView;
