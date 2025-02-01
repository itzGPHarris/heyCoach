import { Box } from "@mui/material";
import PitchFeed from "./shared/PitchFeed";
import Competition from "./shared/Competition"; // ✅ Reintegrate Competition Card

const FeedView = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <Competition /> {/* ✅ Competition Card appears at the top */}
      <PitchFeed />
    </Box>
  );
};

export default FeedView;
