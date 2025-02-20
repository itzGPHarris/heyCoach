/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/shared/dialogs/MediaUploadDialog.tsx
import React from "react";
import { Dialog, DialogContent, Typography, Button, Divider } from "@mui/material";
import { useVideoUpload } from "../../../hooks/useVideoUpload";

interface MediaUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onSendVideo: (fileUrl: string, isPortrait: boolean) => void;
  dialogStyles?: object;
  isVersionUpload: boolean;
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
      }}
      sx={{  
        "& .MuiDialog-paper": {
          width: 180, 
          borderRadius: '8px 8px 0 0', 
          position: "absolute", 
          bottom: 58, 
          left: -10, 
          backgroundColor: 'rgba(255, 255, 255, 0.05)', 
          boxShadow: "none" 
        } 
      }}
    >
      <DialogContent sx={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: 0, 
        p: 2, 
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
        <Divider sx={{padding:.75}} />
        <Button disabled><Typography variant="body2">Choose a coach</Typography></Button>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadDialog;