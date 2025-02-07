// Updated on - 2025-02-04, Time: Pacific Time (PT), 14:30

// Updated PitchContainer.tsx to Restore Stats and Improve Visual Hierarchy
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import MuxPlayer from "@mux/mux-player-react";
import PitchAnalysis from "./PitchAnalysis";
//import PitchComments from "./PitchComments";
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

  title,
  description,
  videoUrl,
  likes,
  lastModified,
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
      }, 500);
    };
  
    window.addEventListener("scrollToAnalysis", handleScrollToAnalysis);
  
    return () => {
      console.log("❌ Event listener removed from PitchContainer (only on unmount)");
      window.removeEventListener("scrollToAnalysis", handleScrollToAnalysis);
    };
  
  }, []);

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        mb: 2,
        p: 2,
        overflow: "hidden",
        display: "block",
      }}
    >
      {/* 🔹 Video Section */}
      <Box sx={{ width: "100%", padding: "0px", margin: "0px", overflow: "hidden" }}>
        {videoUrl.startsWith("blob:") ? (
          <video
            src={videoUrl}
            controls
            width="100%"
            style={{
              borderRadius: "4px",
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

      {/* 🔹 Pitch Details */}
      <CardContent sx={{ paddingX: 4, paddingTop: 1, paddingBottom: 1 }}>
        {/* Stats and Orientation Switch */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: .5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <img src={LikeIcon} alt="Likes" width="18" height="18" />
            <Typography variant="body2" color="textSecondary">{likes}</Typography>
            <Typography variant="body2" color="textSecondary">
              |   Updated: {lastModified}
            </Typography>
          </Box>
          
        </Box>
        <Typography variant="h3" sx={{ fontWeight: "900",  mt: 1, mb: 1 }}>{title}</Typography>
        <Typography variant="body1" color="textSecondary">{description}</Typography>

      </CardContent>

      {/* 🔹 AI Analysis Section */}
      <Box ref={analysisRef} id="analysis-section" 
          sx={{ mt: 2, 
                backgroundColor: "#c2d6e1", 
                borderRadius: "12px", // ✅ Top corners rounded
                pt: 0.5,  
                pr: 2, 
                pl: 2, 
                pb: 2 
                }}>
        <PitchAnalysis />
      </Box>

      {/* 🔹 Comments & Feedback Section 
      <Box sx={{ mt: 3, 
                backgroundColor: "#fcdad9", 
                borderRadius: "0 0 12px 12px", // ✅ Bottom corners rounded
                p: 2, 
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" }}>
                </Box>
        <PitchComments pitchId={pitchId} comments={comments} />*/}
      
    </Card>
  );
};

export default PitchContainer;
 