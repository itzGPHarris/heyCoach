import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
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
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100vw", maxWidth: "100%", p: 3, boxSizing: "border-box", height: "100vh", position: "relative", overflowY: "auto" }}>
      <MessageList messages={messages} />
      <IconButton onClick={() => setMediaDialogOpen(true)} color="primary" sx={{ position: "fixed", bottom: 80, right: 20 }}>
        <Add fontSize="large" />
      </IconButton>
      <MediaUploadDialog open={mediaDialogOpen} onClose={() => setMediaDialogOpen(false)} />
      <ChatInput onSendMessage={handleSendMessage} onSendVideo={handleSendVideo} />
      </Box>
  );
};

export default FeedView;
