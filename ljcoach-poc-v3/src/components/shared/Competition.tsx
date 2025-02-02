import React, { useState } from "react";
import { Box, Card, CardContent, Typography, IconButton, Button, Collapse } from "@mui/material";
import { Close, EmojiEvents } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import MuxPlayer from "@mux/mux-player-react";
import Leaderboard from "./Leaderboard"; // ✅ Import the updated leaderboard component

const CompetitionCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  overflow: "hidden",
  marginBottom: theme.spacing(2),
  backgroundImage: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
}));

const CompetitionBanner = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  backgroundImage: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
}));

const Competition: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // 🔹 Updated Mock Leaderboard Data
  const mockLeaders = [
    {
      rank: 1,
      name: "Sarah Johnson",
      submissionName: "Sarah's Pitch",
      points: 98,
      submissionDetails: "A strong and concise pitch demonstrating clear business vision.",
      videoId: "ulXSeoy4rgSxgL02hqIlr58BZ66aiXqflANbiakPKLiM", // 🔹 Replace with real MUX ID
      submissionLink: "https://example.com/submissions/sarah-johnson"
    },
    {
      rank: 2,
      name: "Mark Lee",
      submissionName: "Mark's Pitch",
      points: 92,
      submissionDetails: "A persuasive pitch focusing on user engagement.",
      videoId: "PUkntYXmIaPE01X7QLd3q2RjFEv2omQ01se00vVbLHtXFI", // 🔹 Replace with real MUX ID
      submissionLink: "https://example.com/submissions/mark-lee"
    },
    {
      rank: 3,
      name: "Alex Green",
      submissionName: "Alex's Pitch",
      points: 90,
      submissionDetails: "A well-structured and visually engaging presentation.",
      videoId: "YYtQ34SRyksieH026qohfbOhBNd02LQAK3Fgt8wk5J8tM", // 🔹 Replace with real MUX ID
      submissionLink: "https://example.com/submissions/alex-green"
    }
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
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1}}>
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
                  playbackId="ulXSeoy4rgSxgL02hqIlr58BZ66aiXqflANbiakPKLiM" // 🔹 Replace with real competition admin video
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    aspectRatio: "16 / 9",
                  }}
                />
              </Box>
            </Box>

            {/* 🔹 Leaderboard Component (Now Under Hero Video) */}
            <Leaderboard leaders={mockLeaders} />

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
