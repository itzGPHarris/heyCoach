import React, { useState } from "react";
import { Box, Card, CardContent, Typography, IconButton, Button, Collapse } from "@mui/material";
import { Close, EmojiEvents } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import MuxPlayer from "@mux/mux-player-react";
import Leaderboard from "./Leaderboard"; // ✅ Import the new leaderboard component

const CompetitionCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  overflow: "hidden",
  marginBottom: theme.spacing(2),
}));

const CompetitionBanner = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "linear-gradient(30deg,rgb(251, 0, 255) 0%,rgb(42, 20, 94) 100%)",
  color: "#fff",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
}));

const Competition: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // 🔹 Mock Leaderboard Data
  const mockLeaders = [
    { rank: 1, name: "Sarah Johnson", submissionName: "Sarah's Pitch", points: 98 },
    { rank: 2, name: "Mark Lee", submissionName: "Mark's Pitch", points: 92 },
    { rank: 3, name: "Alex Green", submissionName: "Alex's Pitch", points: 90 },
  ];

  return (
    <>
      {/* 🔹 Compact Banner View */}
      {!expanded && (
        <CompetitionBanner onClick={handleExpandClick}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmojiEvents fontSize="large" />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Current Competition: Best Elevator Pitch</Typography>
          </Box>
          <Button variant="contained" size="small">View Competition</Button>
        </CompetitionBanner>
      )}

      {/* 🔹 Full Competition Card View */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CompetitionCard>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="h6" fontWeight="bold">Best Elevator Pitch</Typography>
              <IconButton onClick={handleExpandClick}>
                <Close />
              </IconButton>
            </Box>

            {/* 🔹 Hero Video & Competition Details */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Competition Overview</Typography>
              <Typography variant="body2">
                The Best Elevator Pitch competition challenges you to deliver the most engaging, clear, and concise pitch in under 60 seconds!
              </Typography>

              {/* 🔹 MUX Hero Video */}
              <Box sx={{ mt: 2 }}>
                <MuxPlayer
                  streamType="on-demand"
                  playbackId="YOUR_MUX_VIDEO_ID" // 🔹 Replace with real competition admin video
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    aspectRatio: "16 / 9",
                  }}
                />
              </Box>
            </Box>

            {/* 🔹 Leaderboard Component (Now Under Hero Video) */}
            <Leaderboard leaders={mockLeaders} onSelectSubmission={setSelectedSubmission} />

            {/* 🔹 Submit Button (Always Visible) */}
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Submit My Pitch
            </Button>
          </CardContent>
        </CompetitionCard>
      </Collapse>
    </>
  );
};

export default Competition;
