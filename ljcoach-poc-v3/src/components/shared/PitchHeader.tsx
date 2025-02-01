import React from "react";
import { Box, Typography, FormControlLabel, Switch } from "@mui/material";
import { ThumbUp, CalendarToday, Star } from "@mui/icons-material";

interface PitchHeaderProps {
  title: string;
  score: number;
  likes: number;
  lastModified: string;
  manualOrientation: "auto" | "portrait" | "landscape";
  onToggleOrientation: () => void;
}

const PitchHeader: React.FC<PitchHeaderProps> = ({ title, score, likes, lastModified, manualOrientation, onToggleOrientation }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold">{title}</Typography>
        <FormControlLabel
          control={<Switch checked={manualOrientation !== "auto"} onChange={onToggleOrientation} />}
          label={manualOrientation === "auto" ? "Auto" : "Portrait Mode"}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body2"><Star fontSize="small" sx={{ color: "#f4b400" }} /> {score}% Score</Typography>
        <Typography variant="body2"><ThumbUp fontSize="small" sx={{ color: "#2962ff" }} /> {likes} Likes</Typography>
        <Typography variant="body2"><CalendarToday fontSize="small" /> {lastModified}</Typography>
      </Box>
    </Box>
  );
};

export default PitchHeader;
