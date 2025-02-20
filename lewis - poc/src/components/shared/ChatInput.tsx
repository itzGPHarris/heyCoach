// src/components/shared/ChatInput.tsx
import React, { useState } from "react";
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

  return (
    <Box sx={{ 
      display: "flex", 
      alignItems: "center", 
      backgroundColor: "#0090f2", 
      padding: 2, 
      borderRadius: "16px 16px 0 0",
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <IconButton 
        onClick={onOpenMediaDialog} 
        sx={{ color: "#fff" }}
      >
        <CirclePlus size={36} />
      </IconButton>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Hi Harper! What can I help you with?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ 
          backgroundColor: "#fff", 
          borderRadius: "12px", 
          "& fieldset": { border: "none" } 
        }}
      />

      <IconButton
        onClick={handleSend}
        sx={{ color: "#fff" }}
      >
        <ArrowUp size={32} />
      </IconButton>
    </Box>
  );
};

export default ChatInput;