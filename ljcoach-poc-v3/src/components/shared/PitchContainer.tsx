import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Switch } from "@mui/material";
import { ThumbUp, CalendarToday } from "@mui/icons-material";
import MuxPlayer from "@mux/mux-player-react";
import PitchAnalysis from "./PitchAnalysis";
import PitchComments from "./PitchComments";

interface CommentData {
  id: number;
  author: string;
  role: string;
  text: string;
}

interface PitchContainerProps {
  pitchId: number;
  title: string;
  description: string;
  videoUrl: string;
  score: number;
  likes: number;
  lastModified: string;
  comments: CommentData[];
  onUpdateComments?: (newComments: CommentData[]) => void; // ✅ Added this prop

}

const PitchContainer: React.FC<PitchContainerProps> = ({
  pitchId,
  title,
  videoUrl,
  score,
  likes,
  lastModified,
  comments
}) => {
  const [manualOrientation, setManualOrientation] = useState<"auto" | "portrait" | "landscape">("auto");

  const handleToggleOrientation = () => {
    setManualOrientation(manualOrientation === "auto" ? "portrait" : "auto");
  };

  return (
    <Card sx={{ width: "100%", maxWidth: "600px", margin: "0 auto", mb: 2, p: 0, overflow: "hidden" }}>
      
      {/* 🔹 Full-Width Video with No Margins */}
      <Box sx={{ width: "100%", padding: "0px", margin: "0px", overflow: "hidden" }}>
        <MuxPlayer
          streamType="on-demand"
          playbackId={videoUrl}
          style={{
            width: "100%",  // ✅ Ensure full width of the card
            height: "auto",  // ✅ Maintain aspect ratio
            display: "block", // ✅ Prevents extra spacing
            objectFit: "cover", // ✅ Ensures full width coverage
            padding: "0px", // ✅ Removes any padding
            margin: "0px", // ✅ Removes any margins
          }}
        />
      </Box>

      {/* 🔹 Pitch Title, Stats, and Orientation Switch */}
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
            <Typography variant="body2">Auto</Typography>
            <Switch checked={manualOrientation === "portrait"} onChange={handleToggleOrientation} />
            <Typography variant="body2">Portrait</Typography>
          </Box>
        </Box>
      </CardContent>

      {/* 🔹 Analysis & Comments Stay in the Same Location */}
      <PitchAnalysis />
      <PitchComments pitchId={pitchId} comments={comments} />
    </Card>
  );
};

export default PitchContainer;
