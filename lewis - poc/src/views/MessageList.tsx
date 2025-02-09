import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import MessageBubble from "../components/shared/MessageBubble"; // Component to render text messages
import { Message } from "../types/types"; // Type definition for messages

interface MessageListProps {
  messages: Message[]; // Array of messages to display
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box 
      sx={{ 
        width: "100%", 
        maxWidth: 800, 
        display: "flex", 
        flexDirection: "column", 
        gap: 2, 
        flexGrow: 1, 
        minHeight: "0px", 
        paddingBottom: "120px" // Ensures space at the bottom for scrolling
      }}
    >
      {messages.map((msg) => (
        <Box key={msg.id} id={`message-${msg.id}`} sx={{ width: "100%", display: "flex", justifyContent: msg.sender === "coach" ? "flex-start" : "flex-end" }}>
          {/* Displays the timestamp of the message at the top */}
          <Typography variant="caption" sx={{ textAlign: "center", display: "block", mb: 1, color: "gray" }}>
            {msg.timestamp}
          </Typography>
          {/* AI Coach Message Design Enhancements */}
          {msg.sender === "coach" ? (
            <Paper 
              sx={{ 
                p: 2, 
                backgroundColor: "#F5F7FB", 
                borderRadius: "12px", 
                maxWidth: "75%", 
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" 
              }}
            >
              <Typography variant="body1" sx={{ color: "#333", fontWeight: 500 }}>
                {msg.text}
              </Typography>
            </Paper>
          ) : msg.component ? (
            msg.component // Render video or other components if available
          ) : msg.text ? (
            <MessageBubble sender={msg.sender} text={msg.text} /> // Render text message
          ) : (
            // Display a placeholder message if neither text nor component is available
            <Typography variant="body2" sx={{ textAlign: "center", color: "gray" }}>
              (Message Missing Content)
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;
