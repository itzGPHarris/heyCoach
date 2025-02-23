// src/components/shared/ChatInput.tsx
import React, { useState, KeyboardEvent } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { CirclePlus, ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onOpenMediaDialog: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onOpenMediaDialog 
}) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ 
      display: "flex", 
      alignItems: "flex-end", // Changed from center to flex-end to align with growing TextField
      backgroundColor: "#0090f2", 
      padding: 2, 
      borderRadius: "16px 16px 0 0",
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
      minHeight: "76px", // Added to maintain minimum height
    }}>
      <IconButton 
        onClick={onOpenMediaDialog} 
        sx={{ 
          color: "#fff",
          mb: 0.5 // Added margin bottom to align with text field
        }}
      >
        <CirclePlus size={36} />
      </IconButton>

      <TextField
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
        placeholder="Hi Harper! What can I help you with?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{ 
          backgroundColor: "#fff", 
          borderRadius: "12px",
          "& fieldset": { border: "none" },
          "& .MuiInputBase-root": {
            maxHeight: "120px", // Limit maximum height
            overflowY: "auto"   // Enable scrolling for very long content
          }
        }}
      />

      <IconButton
        onClick={handleSend}
        sx={{ 
          color: "#fff",
          mb: 0.5 // Added margin bottom to align with text field
        }}
      >
        <ArrowUp size={32} />
      </IconButton>
    </Box>
  );
};

export default ChatInput;