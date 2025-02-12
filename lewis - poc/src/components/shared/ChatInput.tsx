/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Mic, Video, CirclePlus, ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onOpenMediaDialog: () => void;
  sx?: object;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onOpenMediaDialog }) => {
  //console.log("✅ Received onSendMessage prop in ChatInput:", onSendMessage); // ✅ Debugging log

  const [input, setInput] = useState("");
  const [mediaMode] = useState<"audio" | "video">("audio");

  /** ✅ Handles Sending Messages */
  const handleSend = () => {
    if (!input.trim()) return;
  
    console.log("🤟 User clicked send:", input); // ✅ Debugging log
    onSendMessage(input); // ✅ Send message and process commands
  
    setTimeout(() => {
      setInput(""); // ✅ Reset input field
      //console.log("✅ Input cleared"); // ✅ Debugging log
    }, 0);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#0090f2", padding: 2, borderRadius: "16px 16px 0 0", width: "100%", position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", maxWidth: "600px" }}>
      {/* ✅ Open Media Dialog Button */}
      <IconButton onClick={onOpenMediaDialog} sx={{ color: "#fff" }}>
        <CirclePlus size={36} />
      </IconButton>

      {/* ✅ Chat Input Field */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Hi Harper! What can I help you with?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ backgroundColor: "#fff", borderRadius: "12px", "& fieldset": { border: "none" } }}
      />

      {/* ✅ Send Message Button */}
      <IconButton
        onClick={() => {
          console.log("🛠️ Send button clicked!"); // ✅ Debugging log
          handleSend();
        }}
        sx={{ color: "#fff" }}
      >
        {input.trim() ? <ArrowUp size={32} /> : (mediaMode === "audio" ? <Mic size={30} /> : <Video size={30} />)}
      </IconButton>
    </Box>
  );
};

export default ChatInput;