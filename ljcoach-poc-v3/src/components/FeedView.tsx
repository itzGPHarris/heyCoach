import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import Competition from "./shared/Competition";
import PitchContainer from "./shared/PitchContainer";

interface PitchContainerProps {
  title: string;
  description: string;
  videoUrl: string;
  score: number;
  likes: number;
  lastModified: string;
  comments: { id: number; author: string; role: string; text: string }[];
}

const FeedView = () => {
  const [pitchData, setPitchData] = useState<PitchContainerProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching pitch data (replace with actual API call if needed)
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = {
          title: "RadiantHue - Initial Pitch",
          description: "Sustainable smart lighting with AI-driven efficiency.",
          videoUrl: "sampleVideo123", // Replace with actual playbackId if needed
          score: 70,
          likes: 2,
          lastModified: "Jan 1 • 2025, 2:00 AM",
          comments: [
            { id: 1, author: "Jane Doe", role: "Investor", text: "Great pitch! Very clear messaging." },
            { id: 2, author: "John Smith", role: "Mentor", text: "Consider engaging the audience with a question." },
          ],
        };
        setPitchData(data);
      } catch (error) {
        console.error("Error fetching pitch data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <Competition />
      {loading ? <CircularProgress sx={{ alignSelf: "center" }} /> : pitchData && <PitchContainer {...pitchData} />}
    </Box>
  );
};

export default FeedView;
