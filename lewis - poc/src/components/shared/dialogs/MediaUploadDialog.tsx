/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/shared/dialogs/MediaUploadDialog.tsx
import React from "react";
import { Box, Typography, Button, Divider, Paper, Fade } from "@mui/material";
import { useVideoUpload } from "../../../hooks/useVideoUpload";

interface MediaUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onSendVideo: (fileUrl: string, isPortrait: boolean) => void;
  dialogStyles?: object;
  isVersionUpload: boolean;
  anchorEl?: HTMLElement | null;
}

const MediaUploadDialog: React.FC<MediaUploadDialogProps> = ({ 
  open, 
  onClose, 
  onSendVideo,
  isVersionUpload
}) => {
  const { handleVideoUpload } = useVideoUpload();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("📤 MediaUploadDialog - File selected:", file.name);
  
      handleVideoUpload(file, (fileUrl: string, isPortrait: boolean) => {
        console.log("📤 MediaUploadDialog - Upload complete:", { fileUrl, isPortrait });
        onSendVideo(fileUrl, isPortrait);
        onClose();
      });
    }
  };

  // Simple menu popup directly positioned above the ChatInput's plus button
  return (
    <Fade in={open}>
      <Paper
        elevation={3}
        sx={{
          display: open ? 'block' : 'none',
          position: "absolute",
          bottom: "75px", // Position right above the ChatInput
          left: "16px",  // Align with the plus button
          width: 180,
          borderRadius: 2,
          zIndex: 1400,
          overflow: "hidden",
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
          transformOrigin: 'bottom left' // Animation starts from bottom left
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 0.5, 
          p: 1.5, 
          bgcolor: "white" 
        }}>
          <Button 
            variant="contained" 
            sx={{ bgcolor: "#0090f2", cursor: "pointer", textAlign: "left" }} 
            component="label"
          >
            <input 
              type="file" 
              accept="video/*" 
              hidden 
              onChange={handleFileUpload}
            />
            <Typography variant="body2">Upload video</Typography>
          </Button>
          <Button disabled><Typography variant="body2">Record video</Typography></Button>
          <Button disabled><Typography variant="body2">Upload PDF</Typography></Button>
          <Divider sx={{my: 0.75}} />
          <Button disabled><Typography variant="body2">Choose a coach</Typography></Button>
        </Box>
      </Paper>
    </Fade>
  );
};

export default MediaUploadDialog;