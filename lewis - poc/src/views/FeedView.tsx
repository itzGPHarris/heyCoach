// Updated FeedView.tsx - Integrates useVideoUpload Hook & VideoMessage Component
import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import MessageBubble from "../components/shared/MessageBubble";
import getAIResponse from "../components/shared/AIResponseHandler";
import ChatInput from "../components/shared/ChatInput";
import NewIdeaForm from "../components/shared/NewIdeaForm";
import VideoMessage from "../components/shared/VideoMessage";
//import { useVideoUpload } from "./../hooks/useVideoUpload";
//import { Message } from "./../types/types";


interface Message {
  id: number;
  sender: "user" | "coach";
  text?: string;
  component?: JSX.Element;
  expandedComponent?: JSX.Element | null;
  timestamp?: string;
}

  const FeedView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isNewIdeaOpen, setIsNewIdeaOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
 // const { handleVideoUpload } = useVideoUpload();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const jumpToMessage = (query: string): string | null => {
    const targetMessage = messages.find((msg) => msg.text?.toLowerCase().includes(query.toLowerCase()));
    if (targetMessage) {
      const element = document.getElementById(`message-${targetMessage.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return `message-${targetMessage.id}`;
    }
    return null;
  };

  const handleSendMessage = (input: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const userMessage: Message = { id: messages.length + 1, sender: "user", text: input, timestamp };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const aiResponse = getAIResponse(input, setMessages, setIsNewIdeaOpen, jumpToMessage);
      setMessages((prev) => [...prev, { id: prev.length + 2, sender: "coach", ...aiResponse, timestamp }]);
    }, 1000);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        maxWidth: "100%",
        p: 3,
        boxSizing: "border-box",
        height: "100vh",
        position: "relative",
        overflowY: "auto"
      }}>
      <Box sx={{ width: "100%", maxWidth: 800, display: "flex", flexDirection: "column", gap: 2, flexGrow: 1, minHeight: "0px", paddingBottom: "120px" }}>
        {messages.map((msg) => (
          <Box key={msg.id} id={`message-${msg.id}`} sx={{ width: "100%" }}>
            <Typography variant="caption" sx={{ textAlign: "center", display: "block", mb: 1, color: "gray" }}>{msg.timestamp}</Typography>
            <MessageBubble sender={msg.sender} text={msg.text} component={msg.component} />
            {msg.expandedComponent && (
              <Button onClick={() => setDialogContent(msg.expandedComponent || null)}>View More</Button>
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <ChatInput onSendMessage={handleSendMessage} onSendVideo={handleSendVideo} />

      {isNewIdeaOpen && (
        <NewIdeaForm
          open={isNewIdeaOpen}
          onClose={() => setIsNewIdeaOpen(false)}
          onSubmit={(data) => {
            setIsNewIdeaOpen(false);
            setMessages((prev) => [...prev, {
              id: prev.length + 1,
              sender: "coach",
              component: <MessageBubble sender="coach" text={`New idea created: ${data.title}`} />,
            }]);
          }}
        />
      )}

      <Dialog open={!!dialogContent} onClose={() => setDialogContent(null)}>
        <DialogTitle>Detailed View</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
      </Dialog>
    </Box>
  );
};

export default FeedView;
// Compare this snippet from lewis%20-%20poc/src/views/FeedView.tsx: