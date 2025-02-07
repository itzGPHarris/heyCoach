import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { analyzePitch } from "../../api/aiAnalysisService"; // ✅ Corrected import

interface CoachResponseProps {
  message: string;
  actionLabel?: string;
  pitchText?: string;
}

// Define expected API response type
interface AIAnalysisResponse {
  insights: string;
}

const CoachResponse: React.FC<CoachResponseProps> = ({ message, actionLabel, pitchText }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyzePitch = async () => {
    if (pitchText) {
      try {
        const data: AIAnalysisResponse = await analyzePitch(pitchText); // ✅ Added explicit type
        setAnalysis(data.insights);
      } catch (error) {
        console.error("AI analysis failed:", error);
        setAnalysis("Error fetching analysis.");
      }
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="body1">{message}</Typography>
      {actionLabel && pitchText && (
        <Button onClick={handleAnalyzePitch} sx={{ mt: 1 }} variant="contained">
          {actionLabel}
        </Button>
      )}
      {analysis && <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>{analysis}</Typography>}
    </Box>
  );
};

export default CoachResponse;
