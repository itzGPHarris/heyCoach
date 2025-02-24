// src/components/shared/ChatInput.tsx
import React, { useState, KeyboardEvent } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { CirclePlus, ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onOpenMediaMenu: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onOpenMediaMenu
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
      alignItems: "flex-end",
      backgroundColor: "#0090f2", 
      padding: 2, 
      borderRadius: "16px 16px 0 0",
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
      minHeight: "76px",
    }}>
      <IconButton 
        onClick={onOpenMediaMenu}
        sx={{ 
          color: "#fff",
          mb: 0.5
        }}
        data-testid="media-button"
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
            maxHeight: "120px",
            overflowY: "auto"
          }
        }}
      />

      <IconButton
        onClick={handleSend}
        sx={{ 
          color: "#fff",
          mb: 0.5
        }}
      >
        <ArrowUp size={32} />
      </IconButton>
    </Box>
  );
};

export default ChatInput;