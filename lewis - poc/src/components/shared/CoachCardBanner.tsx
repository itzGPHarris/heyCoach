// Updated on - 2025-02-05, Time: Pacific Time (PT), 10:15

// CoachCardBanner.tsx - Displays a dynamic AI Coach banner in place of the competition banner for first-run users
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CoachCardBannerProps {
  progress: "first_run_complete" | "refined" | "branched";
  onChatOpen: () => void;
}

const CoachCardBanner: React.FC<CoachCardBannerProps> = ({ progress, onChatOpen }) => {
  const navigate = useNavigate();

  const getMessage = () => {
    switch (progress) {
      case "first_run_complete":
        return "Fantastic! You now have a great start. What’s next?";
      case "refined":
        return "Your pitch is coming together! Have you considered exploring a different angle?";
      case "branched":
        return "You’re doing great! Let’s get your pitch submission-ready.";
      default:
        return "Keep improving your pitch!";
    }
  };

  const getActions = () => {
    const buttonStyle = { width: "100%", maxWidth: "250px" }; // ✅ Ensures all buttons have equal width

    switch (progress) {
      case "first_run_complete":
        return (
          <>
            <Button variant="contained" sx={buttonStyle} onClick={() => navigate("/pitch/refine")}>✍️ Keep Refining</Button>
            <Button variant="outlined" sx={buttonStyle} onClick={() => navigate("/pitch/branch")}>🌱 Try a New Approach</Button>
            <Button variant="contained" color="success" sx={buttonStyle} onClick={() => navigate("/pitch/finalize")}>🚀 Get Submission-Ready</Button>
          </>
        );
      case "refined":
        return (
          <>
            <Button variant="contained" sx={buttonStyle} onClick={() => navigate("/pitch/branch")}>🌱 Try a New Approach</Button>
            <Button variant="contained" color="success" sx={buttonStyle} onClick={() => navigate("/pitch/finalize")}>🚀 Finalize Your Pitch</Button>
          </>
        );
      case "branched":
        return (
          <>
            <Button variant="contained" color="success" sx={buttonStyle} onClick={() => navigate("/pitch/finalize")}>🎤 Practice & Submit</Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        mt: 2,
        mx: 3, // ✅ Adds horizontal margin
        mb: 14, // ✅ Adds bottom margin to avoid overlap with AI Drawer
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>🤖 Coach’s Tip</Typography>
      <Typography variant="body1" sx={{ my: 1 }}>{getMessage()}</Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center", width: "100%" }}>{getActions()}</Box>
      <Button variant="text" onClick={onChatOpen} sx={{ mt: 1 }}>💬 Ask Coach for Guidance</Button>
    </Box>
  );
};

export default CoachCardBanner;

