import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
interface AIAnalysis {
  clarity: number;
  engagement: number;
  pacing: number;
  structure: number;
  suggestions: string[];
}

const generateAIFeedback = (): AIAnalysis => {
  return {
    clarity: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
    engagement: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
    pacing: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
    structure: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
    suggestions: [
      "Reduce filler words like 'uh' and 'um' to improve clarity.",
      "Slow down key points for better pacing.",
      "Use more engaging hooks to capture the audience early.",
      "Ensure a strong closing statement for impact.",
    ],
  };
};

const PitchAIAnalysis: React.FC = () => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  //const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    console.log("✅ AI Analysis component mounted.");

    const handleScrollToAnalysis = () => {
      console.log("📜 Scroll event triggered in PitchAIAnalysis! Expanding AI Analysis...");
     // setIsExpanded(true);
    };

    window.addEventListener("scrollToAnalysis", handleScrollToAnalysis);
    return () => {
      console.log("❌ Removed scrollToAnalysis event listener from PitchAIAnalysis.");
      window.removeEventListener("scrollToAnalysis", handleScrollToAnalysis);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAnalysis(generateAIFeedback());
      setLoading(false);
    }, 1000); // Simulate AI processing delay
  }, []);

  return (
    <Box sx={{ p: 2 }}>
     

      {loading ? (
        <CircularProgress />
      ) : analysis ? (
        <Box id="analysis-section" sx={{display: "block" }}>
          <Typography variant="body1"><strong>Clarity:</strong> {analysis.clarity}%</Typography>
          <Typography variant="body1"><strong>Engagement:</strong> {analysis.engagement}%</Typography>
          <Typography variant="body1"><strong>Pacing:</strong> {analysis.pacing}%</Typography>
          <Typography variant="body1"><strong>Structure:</strong> {analysis.structure}%</Typography>

          <Typography variant="h4" sx={{ mt: 2 }}>Coach suggestions:</Typography>
          <ol>
  {analysis?.suggestions.map((suggestion, index) => (
    <li key={index}>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {suggestion}
      </Typography>
    </li>
  ))}
</ol>

        </Box>
      ) : null}
    </Box>
  );
};

export default PitchAIAnalysis;
