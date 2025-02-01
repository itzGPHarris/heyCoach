import PitchFeed from "./shared/PitchFeed";
import { Box } from "@mui/material";

const FeedView = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <PitchFeed />
    </Box>
  );
};

export default FeedView;
