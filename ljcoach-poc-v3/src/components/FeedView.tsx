import { Box } from "@mui/material";
import PitchFeed from "./shared/PitchFeed";
import Competition from "./shared/Competition"; // ✅ Reintegrate Competition Card

const FeedView = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "100vw", overflow: "hidden"  }}>
      <Competition /> {/* ✅ Competition Card appears at the top */}
      <PitchFeed />
    </Box>
  );
};

export default FeedView;
