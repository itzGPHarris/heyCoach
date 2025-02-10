// MediaUploadDialog.tsx - Positions Content Correctly Inside Dialog
import React from "react";
import { Dialog, DialogContent, Box, Typography } from "@mui/material";
import { useVideoUpload } from "./../hooks/useVideoUpload";

interface MediaUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onSendVideo: (fileUrl: string, isPortrait: boolean) => void;
  dialogStyles?: object;
}

const MediaUploadDialog: React.FC<MediaUploadDialogProps> = ({ open, onClose, onSendVideo, dialogStyles }) => {
  const { handleVideoUpload } = useVideoUpload();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      handleVideoUpload(file, (fileUrl: string, isPortrait: boolean) => {
        console.log("Video uploaded:", fileUrl, "Portrait:", isPortrait); // ✅ Debugging log
        onSendVideo(fileUrl, isPortrait); // ✅ Sends video to FeedView.tsx
        onClose(); // ✅ Closes dialog after upload
      });
    }
  };
  

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ ...dialogStyles, "& .MuiDialog-paper": { borderRadius: 30, position: "absolute", bottom: 1, left: 0, bgcolor: "white", boxShadow: "none" } }}
    >
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 0, p: 0, bgcolor: "white" }}>
        <Box sx={{ p: 2, bgcolor: "primary.light", borderRadius: 2, cursor: "pointer", textAlign: "left" }} component="label">
          <input type="file" accept="video/*" hidden onChange={handleFileUpload} />
          <Typography variant="h6">Video (Active)</Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "grey.300", borderRadius: 2, textAlign: "left" }}>
          <Typography variant="h6">Images (Coming Soon)</Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "grey.300", borderRadius: 2, textAlign: "left" }}>
          <Typography variant="h6">Documents (Coming Soon)</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadDialog;
