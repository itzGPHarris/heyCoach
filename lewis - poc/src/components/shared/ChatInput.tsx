/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Mic, Video, CirclePlus, ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onOpenMediaDialog: () => void;
  onUserInput: (input: string) => void;
  sx?: object;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onOpenMediaDialog, onUserInput }) => {
  const [input, setInput] = useState("");
  const [mediaMode, setMediaMode] = useState<"audio" | "video">("audio");

  /** ✅ Handles Sending Messages & Commands */
  const handleSend = () => {
    if (!input.trim()) return;
  
    console.log("User clicked send:", input); // ✅ Debugging log
  
    onSendMessage(input.trim()); // ✅ Ensure message appears in the feed
    onUserInput(input.trim()); // ✅ Process commands (if applicable)
  
    setInput(""); // ✅ Clear input field
  };
  

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "#ccc",
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft:1, 
      paddingRight:1,
      borderRadius: "16px 16px 0 0",  
      width: "100%",
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      maxWidth: "600px",
    }}>
      {/* ✅ Button to Open Media Dialog */}
      <IconButton onClick={onOpenMediaDialog}>
        <CirclePlus size={32} />
      </IconButton>

      {/* ✅ Chat Input Field */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Hi Harper! What can I help you with?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          "& fieldset": { border: "none" },
        }}
      />

      {/* ✅ Dynamic Button: Send Message or Toggle Media */}
      <IconButton onClick={handleSend} color="primary">
          {input.trim() ? <ArrowUp size={32} /> : (mediaMode === "audio" ? <Mic size={20} /> : <Video size={32} />)}
    </IconButton>

    </Box>
  );
};

export default ChatInput;
