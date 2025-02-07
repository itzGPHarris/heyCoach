import React, { useState, useRef } from "react";
import { Box, IconButton, TextField, InputAdornment, Dialog, Button,Typography, } from "@mui/material";
import { Paperclip, ArrowUp, Mic, Video } from "lucide-react";

interface ChatContainerProps {
  onSendMessage: (message: string) => void;
  onFileUpload: (files: FileList) => void;
  loading?: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ onSendMessage, onFileUpload, loading }) => {
  const [message, setMessage] = useState("");
  const [mediaMode, setMediaMode] = useState<"audio" | "video">("audio");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage(""); // Clear input after sending
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileUpload(event.target.files);
    }
    setUploadDialogOpen(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100vw",
        backgroundColor: "#fff",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid #ddd",
      }}
    >
      {/* 📎 Attachment Icon */}
      <IconButton disabled={loading} onClick={() => setUploadDialogOpen(true)}>
        <Paperclip size={20} color="#666" />
      </IconButton>

      {/* Upload Modal */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Upload Files</Typography>
          <input type="file" multiple hidden id="file-upload" onChange={handleFileUpload} />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span" sx={{ mt: 2 }}>
              Select Files
            </Button>
          </label>
        </Box>
      </Dialog>

      {/* 💬 Chat Input */}
      <TextField
        fullWidth
        placeholder={loading ? "AI Coach is thinking..." : "Hello! What can I help you with?"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
        inputRef={inputRef}
        sx={{ borderRadius: 2, backgroundColor: "#f8f8f8", padding: "6px", width: "100%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {message.trim() ? (
                <IconButton onClick={handleSend} color="primary" disabled={loading}>
                  <ArrowUp size={20} />
                </IconButton>
              ) : (
                <IconButton disabled={loading} onClick={() => setMediaMode(mediaMode === "audio" ? "video" : "audio")}>
                  {mediaMode === "audio" ? <Mic size={20} /> : <Video size={20} />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default ChatContainer;
