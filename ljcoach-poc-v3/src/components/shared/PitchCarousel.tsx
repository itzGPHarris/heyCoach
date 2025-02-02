import React, { useState } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Star, StarBorder, AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PitchContainer from "./PitchContainer"; // ✅ Correctly using PitchContainer, NOT PitchCard

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
    comments: [
      { id: 3, author: "Alice Brown", role: "Coach", text: "The energy was great! Maybe refine the closing." }
    ]
  }
];

const TransitionBox = styled(Box)({
  position: "relative",
  width: "100%",
  overflow: "hidden",
});

const AnimatedSlide = styled(Box)(() => ({
  transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
  width: "100%",
  opacity: 1,
}));

const DotIndicator = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
});

const Dot = styled("span")(({ theme }) => ({
  width: "8px",
  height: "8px",
  margin: "0 5px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[400],
  transition: "background-color 0.3s",
  "&.active": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const PitchCarousel: React.FC = () => {
  const [pitchVersions, setPitchVersions] = useState<PitchVersion[]>(initialPitchVersions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favoritePitchId, setFavoritePitchId] = useState<number | null>(null);
  const [animationStyle, setAnimationStyle] = useState({ transform: "translateX(0)", opacity: 1 });

  const updateComments = (pitchId: number, newComments: CommentData[]) => {
    setPitchVersions((prevVersions) =>
      prevVersions.map((pitch) =>
        pitch.id === pitchId ? { ...pitch, comments: newComments } : pitch
      )
    );
  };

  const handleNavigation = (direction: "next" | "prev") => {
    setAnimationStyle({ transform: direction === "next" ? "translateX(-100%)" : "translateX(100%)", opacity: 0 });

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        direction === "next"
          ? (prevIndex + 1) % pitchVersions.length
          : (prevIndex - 1 + pitchVersions.length) % pitchVersions.length
      );
      setAnimationStyle({ transform: "translateX(0)", opacity: 1 });
    }, 300);
  };

  const toggleFavorite = (pitchId: number) => {
    setFavoritePitchId((prevFavorite) => (prevFavorite === pitchId ? null : pitchId));
  };

  const handleAddVersion = () => {
    const newVersion: PitchVersion = {
      id: pitchVersions.length + 1,
      title: `Pitch Version ${pitchVersions.length + 1}`,
      description: "New pitch version description.",
      videoUrl: "",
      score: 0,
      likes: 0,
      lastModified: new Date().toLocaleDateString(),
      comments: [],
    };
    setPitchVersions([...pitchVersions, newVersion]);
    setCurrentIndex(pitchVersions.length);
  };

  const handleDeleteVersion = () => {
    if (pitchVersions.length > 1) {
      const updatedVersions = pitchVersions.filter((_, index) => index !== currentIndex);
      setPitchVersions(updatedVersions);
      setCurrentIndex(0);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Navigation & Controls */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, width: "100%", mb: 2 }}>
        <IconButton onClick={() => handleNavigation("prev")}>
          <ArrowBackIos />
        </IconButton>

        <IconButton onClick={() => toggleFavorite(pitchVersions[currentIndex].id)} sx={{ mr: -4 }}>
          {favoritePitchId === pitchVersions[currentIndex].id ? (
            <Star sx={{ color: "#FFD700" }} />
          ) : (
            <StarBorder />
          )}
        </IconButton>

        <Typography variant="h4" sx={{ mx: 3 }}>{pitchVersions[currentIndex].title}</Typography>

        <IconButton onClick={() => handleNavigation("next")}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* PitchContainer with Animation */}
      <TransitionBox>
        <AnimatedSlide sx={animationStyle}>
          <PitchContainer
            pitchId={pitchVersions[currentIndex].id}
            title={pitchVersions[currentIndex].title}
            description={pitchVersions[currentIndex].description}
            videoUrl={pitchVersions[currentIndex].videoUrl}
            score={pitchVersions[currentIndex].score}
            likes={pitchVersions[currentIndex].likes}
            lastModified={pitchVersions[currentIndex].lastModified}
            comments={pitchVersions[currentIndex].comments || []}
            onUpdateComments={(newComments) => updateComments(pitchVersions[currentIndex].id, newComments)}
          />
        </AnimatedSlide>
      </TransitionBox>

      {/* Dot Indicators */}
      <DotIndicator>
        {pitchVersions.map((_, index) => (
          <Dot key={index} className={index === currentIndex ? "active" : ""} />
        ))}
      </DotIndicator>

      {/* Add / Delete Version Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddVersion} sx={{ mr: 1 }}>
          Add Version
        </Button>
        <Button variant="contained" color="error" startIcon={<RemoveCircleOutline />} onClick={handleDeleteVersion} disabled={pitchVersions.length <= 1}>
          Delete Version
        </Button>
      </Box>
    </Box>
  );
};

export default PitchCarousel;
