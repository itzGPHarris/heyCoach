import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import PitchContainer from "./PitchContainer";

interface CommentData {
  id: number;
  author: string;
  role: string;
  text: string;
}

interface PitchVersion {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  score: number;
  likes: number;
  lastModified: string;
  comments: CommentData[];
}

const initialPitchVersions: PitchVersion[] = [
  {
    id: 1,
    title: "Startup Funding Pitch",
    description: "Pitch for potential investors.",
    videoUrl: "sampleVideo1",
    score: 70,
    likes: 2,
    lastModified: "Jan 1, 2025, 2:00 AM",
    comments: [
      { id: 1, author: "Jane Doe", role: "Mentor", text: "Great pitch! Consider slowing down your intro." },
      { id: 2, author: "John Smith", role: "Investor", text: "I love the concept, but can you clarify the pricing model?" }
    ]
  },
  {
    id: 2,
    title: "Product Demo Pitch",
    description: "Showcasing product features.",
    videoUrl: "sampleVideo2",
    score: 85,
    likes: 5,
    lastModified: "Jan 10, 2025, 11:00 AM",
    comments: []
  }
];

const PitchCarousel: React.FC = () => {
  const [pitchVersions, setPitchVersions] = useState(initialPitchVersions);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateComments = (pitchId: number, newComments: CommentData[]) => {
    setPitchVersions((prevVersions) =>
      prevVersions.map((pitch) =>
        pitch.id === pitchId ? { ...pitch, comments: newComments } : pitch
      )
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? pitchVersions.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === pitchVersions.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", mb: 2 }}>
        <IconButton onClick={handlePrevious}>
          <ArrowBackIos />
        </IconButton>
        <Typography variant="h6">Version {pitchVersions[currentIndex].id}</Typography>
        <IconButton onClick={handleNext}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      <PitchContainer
        pitchId={pitchVersions[currentIndex].id} // ✅ Ensures unique pitch ID is passed
        title={pitchVersions[currentIndex].title}
        description={pitchVersions[currentIndex].description}
        videoUrl={pitchVersions[currentIndex].videoUrl}
        score={pitchVersions[currentIndex].score}
        likes={pitchVersions[currentIndex].likes}
        lastModified={pitchVersions[currentIndex].lastModified}
        comments={pitchVersions[currentIndex].comments || []}
        onUpdateComments={(newComments) => updateComments(pitchVersions[currentIndex].id, newComments)}
      />
    </Box>
  );
};

export default PitchCarousel;
