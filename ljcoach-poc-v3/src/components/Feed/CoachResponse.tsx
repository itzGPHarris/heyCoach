import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { aiAnalysisService } from "../api";

interface CoachResponseProps {
  message: string;
  actionLabel?: string;
  pitchText?: string;
}

const CoachResponse: React.FC<CoachResponseProps> = ({ message, actionLabel, pitchText }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyzePitch = () => {
    if (pitchText) {
      aiAnalysisService.analyzePitch(pitchText).then((data) => setAnalysis(data.insights));
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
