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

  return (
    <Box sx={{ backgroundColor: "#333", padding: 3, width: "95vw", maxWidth: "600px", display: "flex", gap: 1, position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", borderRadius: "12px" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Ask AI Coach something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
      />
      <Button variant="contained" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
