// MediaUploadDialog.tsx - Positions Content Correctly Inside Dialog
import React from "react";
import { Dialog, DialogContent, Typography, Button } from "@mui/material";
import { useVideoUpload } from "./../hooks/useVideoUpload";
import Divider from '@mui/material/Divider';



interface MediaUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onSendVideo: (fileUrl: string, isPortrait: boolean) => void;
  dialogStyles?: object;
  isVersionUpload: boolean;

}

const MediaUploadDialog: React.FC<MediaUploadDialogProps> = ({ open, onClose, onSendVideo }) => {
  const { handleVideoUpload } = useVideoUpload();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
  
      handleVideoUpload(file, (fileUrl: string, isPortrait: boolean) => {
        console.log("Video uploaded:", fileUrl, "Portrait:", isPortrait);
        onSendVideo(fileUrl, isPortrait); // ✅ Ensures correct version tracking
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
          backgroundColor: 'rgba(0, 0, 0, 0.05)', // Semi-transparent dark overlay
        },
      }}
      sx={{  "& .MuiDialog-paper": {width:180, borderRadius: '8px 8px 0 0', position: "absolute", bottom: 58, left: -10, backgroundColor: 'rgba(255, 255, 255, 0.05)', boxShadow: "none" } }}
    >
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 0, p: 2, bgcolor: "white" }}>
        <Button variant="contained" sx={{ bgcolor: "#0090f2", cursor: "pointer", textAlign: "left" }} component="label">
          <input type="file" accept="video/*" hidden onChange={handleFileUpload} />
          <Typography variant="body2">Video</Typography>
        </Button>
        <Button disabled><Typography variant="body2">Images</Typography></Button>
        <Button disabled><Typography variant="body2">Files...</Typography></Button>
        <Divider sx={{padding:.75}} />
        <Button disabled><Typography variant="body2">Add a project</Typography></Button>
        <Button disabled><Typography variant="body2">Context...?</Typography></Button>

      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadDialog;
