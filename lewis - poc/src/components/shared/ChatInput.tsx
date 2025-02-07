// Updated on - 2025-02-05, Time: Pacific Time (PT), 15:10

// Updated ChatInput - Allows Enter/Return Key to Send Messages
import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // ✅ Prevents adding a new line
      handleSend();
    }
  };

  return (
    <Box sx={{ backgroundColor: "#333", padding: 3, width: "95vw", maxWidth: "600px", display: "flex", gap: 1, position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", borderRadius: "12px" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Ask AI Coach something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} // ✅ Allows Enter to send message
        sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
      />
      <Button variant="contained" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
