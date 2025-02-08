// New VideoMessage.tsx - Handles Video Rendering in the Feed
import React from "react";
import { Box, Typography } from "@mui/material";

interface VideoMessageProps {
  fileUrl: string;
  timestamp: string;
  isPortrait: boolean;
}

const VideoMessage: React.FC<VideoMessageProps> = ({ fileUrl, timestamp, isPortrait }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: 1 }}>
      <Typography variant="caption" sx={{ color: "gray" }}>{timestamp}</Typography>
      <video 
        controls 
        style={{
          borderRadius: "10px",
          width: isPortrait ? "80%" : "100%",
          maxWidth: "600px",
          height: "auto",
          objectFit: "cover",
        }}>
        <source src={fileUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default VideoMessage;
