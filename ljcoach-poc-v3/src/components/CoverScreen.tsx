// Updated on - 2025-02-05, Time: Pacific Time (PT), 12:45

// Updated CoverScreen.tsx - Ensures Intent Selection is Centered with the Rest of the Page
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Chip } from "@mui/material";
import { styled } from "@mui/system";
import { useFirstRun } from "../context/FirstRunContext";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  padding: theme.spacing(4),
  textAlign: "center",
  maxWidth: 500,
  margin: "auto",
}));

const Logo = styled("img")(({ theme }) => ({
  width: 220,
  height: 121,
  marginBottom: theme.spacing(6),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  maxWidth: 300,
  padding: theme.spacing(1.5, 3),
  marginBottom: theme.spacing(2),
  borderRadius: 50,
}));

const IntentContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  textAlign: "center", // ✅ Center text alignment to match the rest of the UI
  width: "100%",
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // ✅ Ensures everything inside is centered
}));

const CoverScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setIdea, setVideoSrc } = useFirstRun();
  const [selectedIntents, setSelectedIntents] = useState<string[]>(
    JSON.parse(localStorage.getItem("userIntent") || "[]")
  );

  const handleToggleIntent = (intent: string) => {
    setSelectedIntents((prev) =>
      prev.includes(intent) ? prev.filter((i) => i !== intent) : prev.length < 3 ? [...prev, intent] : prev
    );
  };

  const handleStart = () => {
    localStorage.setItem("userIntent", JSON.stringify(selectedIntents));
    setIdea("My First Pitch");
    setVideoSrc(null);
    navigate("/first-run/video");
  };

  return (
    <Container>
      <Logo src="../img/coachlogo.svg" alt="Coach Graphic" />

      <Typography variant="h3" gutterBottom sx={{ mb: 4, px: 2, fontWeight: 900 }}>
        Welcome to LongJump
      </Typography>

      <Typography variant="body1" sx={{ mb: 3, px: 2, fontSize: "1.17rem" }}> 
        Kickstart your pitch with a quick intro video. Pick up to 3 focus areas to shape your journey—or skip and jump right in!
      </Typography>

      {/* ✅ Centered Inline Intent Selection */}
      <IntentContainer>
       
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}> {/* ✅ Center intent chips */}
          {["Refine a Business Pitch", "Prepare for a Competition", "Improve a Boardroom Presentation",
            "Fundraising & Investor Pitches", "Public Speaking & Communication", "Brainstorm & Experiment"].map(
            (intent) => (
              <Chip
                key={intent}
                label={intent}
                color={selectedIntents.includes(intent) ? "primary" : "default"}
                onClick={() => handleToggleIntent(intent)}
                sx={{ cursor: "pointer" }}
              />
            )
          )}
        </Box>
      </IntentContainer>

      <StyledButton variant="contained" color="primary" onClick={handleStart}>
        Start Your First Pitch
      </StyledButton>

      <StyledButton variant="outlined" color="secondary" onClick={() => navigate("/app")}>
        Enter Full App
      </StyledButton>
    </Container>
  );
};

export default CoverScreen;
