import PitchCarousel from "./shared/PitchCarousel";
import { Box } from "@mui/material";

const FeedView = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <PitchCarousel />
    </Box>
  );
};

export default FeedView;
