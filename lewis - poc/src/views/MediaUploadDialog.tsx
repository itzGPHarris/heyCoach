// MediaUploadDialog.tsx - Positioned Above ChatInput & Transparent Background
import React from "react";
import { Dialog, DialogContent, Box, Typography } from "@mui/material";

interface MediaUploadDialogProps {
  open: boolean;
  onClose: () => void;
}

const MediaUploadDialog: React.FC<MediaUploadDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      sx={{
        position: "fixed",
        bottom: 80, // Positioned above ChatInput
        left: 20, // Aligns to bottom left
        bgcolor: "transparent",
        boxShadow: "none"
      }}
    >
      <DialogContent sx={{ bgcolor: "transparent", p: 0 }}> {/* Transparent Background */}
        <Box display="flex" flexDirection="column" gap={2}>
          <Box 
            sx={{ p: 2, bgcolor: "primary.light", borderRadius: 2, cursor: "pointer", textAlign: "center" }}
            onClick={() => console.log("Video Upload Clicked")}
          >
            <Typography variant="h6">📹 Video (Active)</Typography>
          </Box>
          <Box 
            sx={{ p: 2, bgcolor: "grey.300", borderRadius: 2, textAlign: "center" }}
          >
            <Typography variant="h6">🖼️ Images (Coming Soon)</Typography>
          </Box>
          <Box 
            sx={{ p: 2, bgcolor: "grey.300", borderRadius: 2, textAlign: "center" }}
          >
            <Typography variant="h6">📄 Documents (Coming Soon)</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadDialog;
