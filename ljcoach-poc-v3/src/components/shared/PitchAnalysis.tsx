// Updated on - 2025-02-04, Time: Pacific Time (PT), 14:30

// Updated PitchAnalysis.tsx to Ensure Comments & Feedback Section is Always Visible
import React, { useState, useEffect } from "react";
import { Box, CardContent, Collapse, Typography, IconButton } from "@mui/material";
import { ExpandMore, BarChart } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PitchAIAnalysis from "./PitchAIAnalysis";
import PitchComments from "./PitchComments";

interface TranscriptSegment {
  timecode: string;
  text: string;
  highlights?: { type: "filler" | "improvement"; word: string }[];
}

const transcriptData: TranscriptSegment[] = [
  { timecode: "00:01", text: "Hi, I'm Harper Lewis, founder of Radiant Hue." },
  { timecode: "00:05", text: "Uh, the beauty industry has made great strides, but many products still fall short in terms of inclusivity and environmental impact.", highlights: [{ type: "filler", word: "Uh" }] },
];

const ExpandMoreIcon = styled(IconButton)(({ theme }) => ({
  transition: theme.transitions.create("transform", { duration: theme.transitions.duration.shortest }),
}));

const InteractiveTranscript = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  maxHeight: "200px",
  overflowY: "auto",
}));

const PitchAnalysis: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [comments] = useState([
    {
      id: 0,
      author: "AI Coach",
      role: "Coach",
      text: "Great work! Ask your friends for feedback using the link above. And remember, you can always ask me for feedback anytime!",
    },
  ]);

  useEffect(() => {
    console.log("✅ PitchAnalysis component mounted.");

    const handleScrollToAnalysis = () => {
      console.log("📜 Scroll event triggered in PitchAnalysis! Expanding...");
      setExpanded(true);
    };

    window.addEventListener("scrollToAnalysis", handleScrollToAnalysis);
    return () => {
      console.log("❌ Removed scrollToAnalysis event listener from PitchAnalysis.");
      window.removeEventListener("scrollToAnalysis", handleScrollToAnalysis);
    };
  }, []);

  return (
    <Box sx={{ mt: 2, p: 2, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BarChart fontSize="small" /> AI Analysis & Transcript
        </Typography>
        <ExpandMoreIcon sx={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
          <ExpandMore />
        </ExpandMoreIcon>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <PitchAIAnalysis />

          {/* Interactive Transcript */}
          <Typography variant="h6" sx={{ mt: 2 }}>Interactive Transcript</Typography>
          <InteractiveTranscript>
            {transcriptData.map((segment, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "primary.main" }}>
                  {segment.timecode}
                </Typography>
                <Typography variant="body2">{segment.text}</Typography>
              </Box>
            ))}
          </InteractiveTranscript>
        </CardContent>
      </Collapse>

      {/* 🔹 Comments & Feedback Section (Always Visible) */}
      <PitchComments pitchId={1} comments={comments} />
    </Box>
  );
};

export default PitchAnalysis;
