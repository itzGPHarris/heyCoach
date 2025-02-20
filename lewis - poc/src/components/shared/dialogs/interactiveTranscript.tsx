import React from "react";
import { Box, Typography, Tooltip, Paper } from "@mui/material";

export interface Highlight {
  type: "filler" | "improvement";
  word: string;
  suggestion: string;
}

export interface TranscriptSegment {
  timecode: string;
  text: string;
  highlights?: Highlight[];
}

interface InteractiveTranscriptProps {
  transcript: TranscriptSegment[];
}

const InteractiveTranscript: React.FC<InteractiveTranscriptProps> = ({ transcript }) => {
  return (
    <Paper elevation={0} sx={{ p: 2, maxWidth: 600, overflow: "hidden" }}>
      {transcript.map((segment, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          {/* Timecode */}
          <Typography variant="caption" color="text.secondary">
            {segment.timecode}
          </Typography>
          
          {/* Transcript Text */}
          <Box sx={{ display: "flex", flexWrap: "wrap", whiteSpace: "normal" }}>
            {segment.text.split(" ").map((word, i) => {
              const highlight = segment.highlights?.find((h) => h.word === word);
              return highlight ? (
                <Tooltip key={i} title={highlight.suggestion} arrow>
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      color: highlight.type === "filler" ? "red" : "blue",
                      mx: 0.5,
                      cursor: "help",
                      textDecoration: "underline",
                      whiteSpace: "normal",  // Ensures words wrap
                    }}
                  >
                    {word}
                  </Typography>
                </Tooltip>
              ) : (
                <Typography component="span" key={i} sx={{ mx: 0.5, whiteSpace: "normal" }}>
                  {word}
                </Typography>
              );
            })}
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default InteractiveTranscript;
