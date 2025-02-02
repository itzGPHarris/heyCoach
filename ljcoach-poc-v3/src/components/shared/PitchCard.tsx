import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Switch } from "@mui/material";
import { ThumbUp, CalendarToday } from "@mui/icons-material";
import MuxPlayer from "@mux/mux-player-react";
import PitchAnalysis from "./PitchAnalysis";
import PitchComments from "./PitchComments";

interface PitchCardProps {
  pitchId: number;
  title: string;
  videoUrl: string;
  score: number;
  likes: number;
  lastModified: string;
  comments: { id: number; author: string; role: string; text: string }[];
}

const PitchCard: React.FC<PitchCardProps> = ({
  pitchId,
  title,
  videoUrl,
  score,
  likes,
  lastModified,
  comments,
}) => {
  const [manualOrientation, setManualOrientation] = useState<"auto" | "portrait" | "landscape">("auto");

  const handleToggleOrientation = () => {
    setManualOrientation(manualOrientation === "auto" ? "portrait" : "auto");
  };
  console.log("🚀 Rendering PitchCard with videoUrl:", videoUrl); // ✅ LOG ADDED

  return (
    <Card sx={{ width: "100%", maxWidth: "600px", margin: "0 auto", mb: 2, p: 0, overflow: "hidden",backgroundColor: "#333" }}> 
      {/* 🔹 Ensure MuxPlayer has no left/right padding */}
      <Box
        sx={{
          width: "10%",
          height: "auto",
          overflow: "hidden",
          padding: "0px", // ✅ Removes padding
          margin: "0px", // ✅ Removes margins
        }}
      >
        <MuxPlayer
          streamType="on-demand"
          playbackId={videoUrl}
          style={{
            width: "100%", // ✅ Ensure full width
            height: "auto", // ✅ Maintain aspect ratio
            display: "block", // ✅ Remove extra spacing
            objectFit: "cover", // ✅ Cover the container
            borderRadius: "12px", // ✅ Matches the design you tested
          }}
        />
      </Box>

      {/* 🔹 Pitch Title, Stats, and Switch - Directly Under Video */}
      <CardContent sx={{ paddingX: 2, paddingTop: 2, paddingBottom: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{title}</Typography>

        {/* Stats and Orientation Switch */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="textSecondary">
              <ThumbUp fontSize="small" /> {likes}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <CalendarToday fontSize="small" /> {lastModified}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Score: {score}
            </Typography>
          </Box>

          {/* Orientation Switch */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">h</Typography>
            <Switch checked={manualOrientation === "portrait"} onChange={handleToggleOrientation} />
            <Typography variant="body2">v</Typography>
          </Box>
        </Box>
      </CardContent>

      {/* 🔹 Analysis & Comments Stay in the Same Location */}
      <PitchAnalysis />
      <PitchComments pitchId={pitchId} comments={comments} />
    </Card>
  );
};

export default PitchCard;
