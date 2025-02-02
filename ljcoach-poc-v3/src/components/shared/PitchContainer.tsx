import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Switch } from "@mui/material";
//import { CalendarToday } from "@mui/icons-material";
import MuxPlayer from "@mux/mux-player-react";
import PitchAnalysis from "./PitchAnalysis";
import PitchComments from "./PitchComments";
import LikeIcon from "/img/boosticon.svg"; 


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
  videoUrl,
  likes,
  lastModified,
  comments
}) => {
  const [manualOrientation, setManualOrientation] = useState<"auto" | "portrait" | "landscape">("auto");

  const handleToggleOrientation = () => {
    setManualOrientation(manualOrientation === "auto" ? "portrait" : "auto");
    console.log("🚀 Orientation toggled:", manualOrientation);

  };
  console.log("🚀 Received videoUrl:", videoUrl);

  return (
    <Card sx={{ width: "100%", maxWidth: "600px", margin: "0 auto", mb: 2, p: 0, overflow: "hidden" }}>
      
      {/* 🔹 Full-Width Video with No Margins */}
      <Box sx={{ width: "100%", padding: "0px", margin: "0px", overflow: "hidden" }}>
      <MuxPlayer
  key={manualOrientation} // ✅ Forces re-render when orientation changes
  streamType="on-demand"
  playbackId={videoUrl} // ✅ Now using the dynamic prop
    style={{
    width: "100%",
    height: manualOrientation === "portrait" ? "80vh" : "auto", // ✅ Dynamically adjust height
    display: "block",
    objectFit: "cover",
    padding: "0px",
    margin: "0px",
    aspectRatio: manualOrientation === "portrait" ? "9 / 16" : "16 / 9", // ✅ Ensure correct aspect ratio
  }}
/>
      </Box>

      {/* 🔹 Pitch Title, Stats, and Orientation Switch */}
      <CardContent sx={{ paddingX: 2, paddingTop: 2, paddingBottom: 1 }}>
       

        {/* Stats and Orientation Switch */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img src={LikeIcon} alt="Likes" width="18" height="18" />
            <Typography variant="body2" color="textSecondary">{likes}</Typography>
            <Typography variant="body2" color="textSecondary">
             Updated: {lastModified}
            </Typography>
            {/*<Typography variant="body2" color="textSecondary">
              Score: {score}
            </Typography>*/}
          </Box>

          {/* Orientation Switch */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">Auto</Typography>
            <Switch checked={manualOrientation === "portrait"} onChange={handleToggleOrientation} />
            <Typography variant="body2">Portrait</Typography>
          </Box>
        </Box>
        {/*<Typography variant="h6" sx={{ fontWeight: "bold" }}>{title}</Typography>*/}
      </CardContent>

      {/* 🔹 Analysis & Comments Stay in the Same Location */}
      <PitchAnalysis />
      <PitchComments pitchId={pitchId} comments={comments} />
    </Card>
  );
};

export default PitchContainer;
