import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

interface VideoUploaderProps {
  onVideoSelect: (videoUrl: string) => void; // ✅ Explicitly typed
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoSelect }) => {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const videoFile = event.target.files[0];
      const videoURL = URL.createObjectURL(videoFile); // ✅ Creates a local preview URL

      setVideoPreview(videoURL);
      onVideoSelect(videoURL);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Button variant="contained" component="label">
        Select Video
        <input type="file" accept="video/*" hidden onChange={handleVideoUpload} />
      </Button>

      {videoPreview && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Preview:</Typography>
          <video src={videoPreview} controls width="100%" style={{ borderRadius: "8px", maxWidth: "400px" }} />
        </Box>
      )}
    </Box>
  );
};

export default VideoUploader;
