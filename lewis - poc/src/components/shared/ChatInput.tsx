// Updated ChatInput.tsx - Uses useVideoUpload Hook for Video Handling
import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Mic, Video, Paperclip, ArrowUp } from "lucide-react";
import { useVideoUpload } from "../../hooks/useVideoUpload";


interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendVideo: (fileUrl: string, isPortrait: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onSendVideo }) => {
  const [input, setInput] = useState("");
  const [mediaMode, setMediaMode] = useState<"audio" | "video">("audio");
  const { handleVideoUpload } = useVideoUpload();

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      handleVideoUpload(file, (fileUrl, isPortrait) => {
        onSendVideo(fileUrl, isPortrait); // ✅ Passes correct arguments
      });
    }
  };
  
  
  

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "#333",
      padding: 2,
      borderRadius: "12px",
      width: "100%",
      position: "fixed",
      bottom: 10,
      left: "50%",
      transform: "translateX(-50%)",
      maxWidth: "600px",
    }}>
      {/* Attachment Icon for Video Upload */}
      <IconButton component="label">
        <Paperclip size={20} />
        <input type="file" accept="video/*" hidden onChange={handleFileUpload} />
      </IconButton>

      {/* Chat Input Field */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Hi Harper! What can I help you with?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      />

      {/* Dynamic Button: Media Toggle or Send */}
      <IconButton onClick={input.trim() ? handleSend : () => setMediaMode(mediaMode === "audio" ? "video" : "audio")}
        color="primary">
        {input.trim() ? <ArrowUp size={20} /> : (mediaMode === "audio" ? <Mic size={20} /> : <Video size={20} />)}
      </IconButton>
    </Box>
  );
};

export default ChatInput;
