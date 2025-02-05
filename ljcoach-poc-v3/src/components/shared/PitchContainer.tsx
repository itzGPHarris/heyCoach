import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, Box, Switch } from "@mui/material";
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
  isPortrait?: boolean;
  onUpdateComments?: (newComments: CommentData[]) => void;
}

const PitchContainer: React.FC<PitchContainerProps> = ({
  pitchId,
  title,
  description,
  videoUrl,
  likes,
  lastModified,
  comments,
  isPortrait = false,
}) => {
  const [manualOrientation, setManualOrientation] = useState<"auto" | "portrait" | "landscape">(isPortrait ? "portrait" : "auto");
  const analysisRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setManualOrientation(isPortrait ? "portrait" : "auto");
    console.log("✅ Event listener attached for scrollToAnalysis in PitchContainer");

    const handleScrollToAnalysis = () => {
      console.log("📜 Scroll event triggered in PitchContainer!");
      
      setTimeout(() => {
        if (analysisRef.current) {
          console.log("📜 Scrolling to AI Analysis in PitchContainer...");
          analysisRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          console.log("⚠️ analysisRef.current is null. Cannot scroll.");
        }
      }, 500); // Adds a delay to stabilize layout
    };
  
    window.addEventListener("scrollToAnalysis", handleScrollToAnalysis);
  
    return () => {
      console.log("❌ Event listener removed from PitchContainer (only on unmount)");
      window.removeEventListener("scrollToAnalysis", handleScrollToAnalysis);
    };
  
  }, []);

  const handleToggleOrientation = () => {
    setManualOrientation(manualOrientation === "auto" ? "portrait" : "auto");
    console.log("🚀 Orientation toggled:", manualOrientation);
  };

  console.log("🚀 Received videoUrl:", videoUrl);

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        mb: 2,
        p: 0,
        overflow: "hidden",
        display: "block", // ✅ Ensures component stays in the DOM
      }}
    >
      {/* 🔹 Full-Width Video */}
      <Box sx={{ width: "100%", padding: "0px", margin: "0px", overflow: "hidden" }}>
        {videoUrl.startsWith("blob:") ? (
          <video
            src={videoUrl}
            controls
            width="100%"
            style={{
              borderRadius: "8px",
              display: "block",
              objectFit: "cover",
              padding: "0px",
              margin: "0px",
              aspectRatio: manualOrientation === "portrait" ? "9 / 16" : "16 / 9",
            }}
          />
        ) : (
          <MuxPlayer
            key={manualOrientation}
            streamType="on-demand"
            playbackId={videoUrl}
            style={{
              width: "100%",
              height: manualOrientation === "portrait" ? "80vh" : "auto",
              display: "block",
              objectFit: "cover",
              padding: "0px",
              margin: "0px",
              aspectRatio: manualOrientation === "portrait" ? "9 / 16" : "16 / 9",
            }}
          />
        )}
      </Box>

      {/* 🔹 Pitch Title & Stats */}
      <CardContent sx={{ paddingX: 2, paddingTop: 2, paddingBottom: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{title}</Typography>
        <Typography variant="body2" color="textSecondary">{description}</Typography>

        {/* Stats and Orientation Switch */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img src={LikeIcon} alt="Likes" width="18" height="18" />
            <Typography variant="body2" color="textSecondary">{likes}</Typography>
            <Typography variant="body2" color="textSecondary">
              Updated: {lastModified}
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

      {/* 🔹 Analysis & Transcript Section (Scroll Target) */}
      <Box ref={analysisRef} id="analysis-section">
        <PitchAnalysis />
      </Box>

      {/* 🔹 Comments */}
      <PitchComments pitchId={pitchId} comments={comments} />
    </Card>
  );
};

export default PitchContainer;
