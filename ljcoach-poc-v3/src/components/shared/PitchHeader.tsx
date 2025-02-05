import React from "react";
import { Box, Typography } from "@mui/material";

interface PitchHeaderProps {
  title: string;
  score: number;
  likes: number;
  lastModified: string;
  //manualOrientation: "auto" | "portrait" | "landscape"; // ✅ Required prop
  onToggleOrientation: () => void; // ✅ Required prop
}


const PitchHeader: React.FC<PitchHeaderProps> = ({ score, likes, lastModified }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1 }}>
      
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Typography variant="body2"> Score: {score} </Typography>
        <Typography variant="body2"> Boosts: {likes}</Typography>
        <Typography variant="body2"> {lastModified}</Typography>
      </Box>
    </Box>
  );
};

export default PitchHeader;
