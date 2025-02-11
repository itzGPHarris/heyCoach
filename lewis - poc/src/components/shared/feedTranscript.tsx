// Updated on - 2025-02-05, Time: Pacific Time (PT), 09:40

// Updated PitchAnalysis.tsx to Ensure Comments & Feedback Section is Always Visible & Transcript is Fully Expanded with Interactive Highlights
import React, { useState, useEffect } from "react";
import { Box, CardContent, Collapse, Typography, IconButton } from "@mui/material";
import { ExpandMore, BarChart } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PitchAIAnalysis from "./PitchAIAnalysis";
import PitchComments from "./PitchComments";

interface TranscriptSegment {
  timecode: string;
  text: string;
  highlights?: { type: "filler" | "improvement"; word: string; suggestion: string }[];
}

const fillerStyle = {
  backgroundColor: "#ffcccb",
  color: "#000",
  borderRadius: "4px",
  padding: "2px 4px",
  fontWeight: "bold",
  cursor: "pointer",
};

const improvementStyle = {
  backgroundColor: "#ffff99",
  color: "#000",
  borderRadius: "4px",
  padding: "2px 4px",
  fontStyle: "italic",
  cursor: "pointer",
};

const transcriptData: TranscriptSegment[] = [
  { timecode: "00:00", text: "Welcome everyone, to the ummm most exciting business competition on the Internet.", highlights: [{ type: "filler", word: "ummm", suggestion: "(remove for clarity)" }] },
  { timecode: "00:05", text: "This is Long Jump, where big ideas take the leap of faith and land into the world of opportunity." },
  { timecode: "00:10", text: "You can call me Coach, your guide through this ummm incredible journey of innovation, creativity, and entrepreneurial spirit.", highlights: [{ type: "filler", word: "ummm", suggestion: "(replace with pause)" }] },
  { timecode: "00:15", text: "Submit a 1 to 3-minute video pitch of ummm your product or business idea.", highlights: [{ type: "filler", word: "ummm", suggestion: "(remove for clarity)" }] },
  { timecode: "00:20", text: "First impressions matter. Judges will look for originality, potential impact, and that special spark that sets your idea apart.", highlights: [{ type: "improvement", word: "Judges will", suggestion: "Judges will be evaluating" }] },
  { timecode: "00:25", text: "The stakes are high. The winner ummm of Long Jump takes home $25,000.", highlights: [{ type: "filler", word: "ummm", suggestion: "(remove for confidence)" }] },
  { timecode: "00:28", text: "That's $50,000 in total prizes up for grabs. Make your pitch count." },
];

const ExpandMoreIcon = styled(IconButton)(({ theme }) => ({
  transition: theme.transitions.create("transform", { duration: theme.transitions.duration.shortest }),
}));

const InteractiveTranscript = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "8px",
  backgroundColor: "#fff",
  marginTop: theme.spacing(2),
}));

const feedTranscript: React.FC<PitchHeaderProps> = ({ score, likes, lastModified }) => {
  
  return (
    <Box sx={{ mt: 2, p: 2, backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
   
          <Typography variant="h3" sx={{ mt: 2 }}>Interactive Transcript</Typography>
            <InteractiveTranscript>
                {transcriptData.map((segment, index) => (
                    <Box key={index} sx={{ mb: 1, mt:1, borderRadius: "12px" }}>
                        <Typography variant="body2">
                        <strong>[{segment.timecode}]</strong>{" "}
                        {segment.text.split(" ").map((word, index) => {
                        const highlight = segment.highlights?.find(h => h.word === word);
                        return highlight ? (
                            <span
                                key={index}
                                style={highlight.type === "filler" ? fillerStyle : improvementStyle}
                                title={highlight.suggestion}
                            >
                                {word}
                            </span>
                        ) : (
                        ` ${word}`
                        );
                    })}
                    </Typography>
                </Box>
                ))}
            </InteractiveTranscript>

    </Box>
  );
};

export default feedTranscript;
