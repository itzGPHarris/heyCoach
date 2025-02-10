import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import MessageBubble from "../components/shared/MessageBubble"; 
import { Message } from "../types/types"; 

interface MessageListProps {
  messages: Message[];
  onQuickReply: (reply: string) => void; // ✅ Added to handle quick-reply clicks
}

const MessageList: React.FC<MessageListProps> = ({ messages, onQuickReply }) => {
  return (
    <Box 
      sx={{ 
        width: "100%", 
        maxWidth: 800, 
        display: "flex", 
        flexDirection: "column", 
        gap: "12px",
        flexGrow: 1,
        padding: "8px 16px",
      }}
    >
      {messages.map((msg) => (
        <Box 
          key={msg.id} 
          id={`message-${msg.id}`} 
          sx={{ 
            width: "100%", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: msg.sender === "coach" ? "flex-start" : "flex-end",
          }}
        >
          {msg.sender === "user" && (
            <>
              <Typography variant="caption" sx={{ color: "gray", mb: 1 }}>
                {msg.timestamp}
              </Typography>
              {msg.component ? msg.component : <MessageBubble sender={msg.sender} text={msg.text || ""} />}
            </>
          )}

          {msg.sender === "coach" && (
            <Paper 
              sx={{ 
                p: 2, 
                mt: 1, 
                backgroundColor: "#F5F7FB", 
                borderRadius: "12px", 
                maxWidth: "75%", 
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" 
              }}
            >
              <Typography variant="body1" sx={{ color: "#333", fontWeight: 500 }}>
                {msg.text}
              </Typography>

              {msg.quickReplies && msg.quickReplies.length > 0 && (
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  {msg.quickReplies.map((reply, index) => (
                    <Button 
                      key={index} 
                      variant="outlined" 
                      size="small" 
                      onClick={() => onQuickReply(reply)} // ✅ Ensure quick reply function runs
                    >
                      {reply}
                    </Button>
                  ))}
                </Box>
              )}


            </Paper>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;
