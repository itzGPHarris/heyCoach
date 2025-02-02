import React, { useState, useEffect } from "react";
import { Box, Card, CardMedia, Typography, FormControlLabel, Switch } from "@mui/material";

interface PitchCardProps {
  title: string;
  description: string;
  videoUrl: string;
}

const PitchCard: React.FC<PitchCardProps> = ({ title, description, videoUrl }) => {
  const [videoOrientation, setVideoOrientation] = useState<"portrait" | "landscape">("landscape");
  const [manualOrientation, setManualOrientation] = useState<"auto" | "portrait" | "landscape">("auto");

  // 🔹 Log when a new PitchCard is created
  useEffect(() => {
    console.log(`🚀 [PitchCard] Loaded: ${title}`);
  }, [title]);

  useEffect(() => {
    if (!videoUrl || manualOrientation !== "auto") return;

    const video = document.createElement("video");
    video.src = videoUrl;
    video.onloadedmetadata = () => {
      const newOrientation = video.videoHeight > video.videoWidth ? "portrait" : "landscape";
      setVideoOrientation(newOrientation);
      console.log(`🎥 [PitchCard] Detected Orientation: ${newOrientation}`);
    };
  }, [videoUrl, manualOrientation]);

  // Use manual override if selected, otherwise auto-detect
  const effectiveOrientation = manualOrientation === "auto" ? videoOrientation : manualOrientation;

  // 🔹 Log when the user changes the switch
  const handleSwitchChange = () => {
    const newMode = manualOrientation === "auto" ? "portrait" : "auto";
    setManualOrientation(newMode);
    console.log(`🔄 [PitchCard] Orientation Manually Set To: ${newMode}`);
  };
  console.log(`📦 [PitchContainer] Loaded: ${title}`); // Debug log

  return (
    <Card sx={{ maxWidth: "100%", position: "relative", mb: 2, overflow: "visible", p: 4, ml: 2, mr: 2 }}>
      {/* Header: Title & Orientation Switch */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h3" fontWeight="bold">
          {title}
        </Typography>

        {/* Orientation Switch */}
        <FormControlLabel
          control={<Switch checked={manualOrientation !== "auto"} onChange={handleSwitchChange} />}
          label={manualOrientation === "auto" ? "Auto" : "Portrait Mode"}
        />
      </Box>

      {/* Video Display */}
      <CardMedia
        component="video"
        src={videoUrl}
        controls
        sx={{
          width: "100%",
          maxHeight: effectiveOrientation === "portrait" ? "80vh" : "auto",
          objectFit: "cover",
          aspectRatio: effectiveOrientation === "portrait" ? "9 / 16" : "16 / 9",
        }}
      />

      {/* Overlay Text & Description */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Box>
    </Card>
  );
};

export default PitchCard;
