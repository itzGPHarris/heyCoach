import React, { useState } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Star, StarBorder, AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PitchContainer from "./PitchContainer";

interface CommentData {
  id: number;
  author: string;
  role: string;
  text: string;
}

interface PitchVersion {
  pitchId: number;
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  score: number;
  likes: number;
  lastModified: string;
  comments: CommentData[];
  isPortrait: boolean;
}

interface PitchCarouselProps {
  videoUrl: string;
  isPortrait: boolean;
}

const CarouselWrapper = styled(Box)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
});

const SlidesContainer = styled(Box)<{ index: number }>(({ index }) => ({
  display: "flex",
  width: "100%",
  transition: "transform 0.5s ease-in-out",
  transform: `translateX(-${index * 100}%)`,
}));

const DotIndicator = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  marginTop: "12px",
});

const PitchCarousel: React.FC<PitchCarouselProps> = ({ videoUrl, isPortrait }) => {
  const [pitchVersions, setPitchVersions] = useState<PitchVersion[]>([
    {
      pitchId: 1,
      id: 1,
      title: "RadiantHue Pitch - V1",
      description: "Pitch for potential investors.",
      videoUrl: videoUrl || "YYtQ34SRyksieH026qohfbOhBNd02LQAK3Fgt8wk5J8tM",
      score: 70,
      likes: 2,
      lastModified: "Jan 1, 2025, 2:00 AM",
      comments: [
        { id: 1, author: "Keeker", role: "Mentor", text: "Great pitch! Consider slowing down your intro." },
        { id: 2, author: "Dewey Brown", role: "Investor", text: "I love the concept, but can you clarify the pricing model?" },
      ],
      isPortrait,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [favoritePitchId, setFavoritePitchId] = useState<number | null>(null);

  const handleNavigation = (direction: "next" | "prev") => {
    setCurrentIndex((prevIndex) =>
      direction === "next"
        ? (prevIndex + 1) % pitchVersions.length
        : (prevIndex - 1 + pitchVersions.length) % pitchVersions.length
    );
  };

  const handleAddVersion = () => {
    const newVersion: PitchVersion = {
      pitchId: Date.now(),
      id: pitchVersions.length + 1,
      title: `Pitch - V${pitchVersions.length + 1}`,
      description: "A new iteration of the pitch.",
      videoUrl: videoUrl || "", // ✅ Ensure video URL is always a string
      score: 0,
      likes: 0,
      lastModified: new Date().toLocaleString(),
      comments: [],
      isPortrait,
    };

    setPitchVersions([...pitchVersions, newVersion]);
    setCurrentIndex(pitchVersions.length);
  };

  const handleDeleteVersion = () => {
    if (pitchVersions.length > 1) {
      const newVersions = pitchVersions.filter((_, index) => index !== currentIndex);
      setPitchVersions(newVersions);
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Navigation & Controls */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, width: "100%", mb: 2 }}>
        <IconButton onClick={() => handleNavigation("prev")}>
          <ArrowBackIos />
        </IconButton>

        <IconButton onClick={() => setFavoritePitchId(pitchVersions[currentIndex].pitchId)} sx={{ mr: -4 }}>
          {favoritePitchId === pitchVersions[currentIndex].pitchId ? (
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

      {/* PitchContainer with Push Effect */}
      <CarouselWrapper>
        <SlidesContainer index={currentIndex}>
          {pitchVersions.map((pitch) => (
            <Box key={pitch.pitchId} sx={{ width: "100%", flexShrink: 0 }}>
              <PitchContainer
                pitchId={pitch.pitchId}
                title={pitch.title}
                description={pitch.description}
                videoUrl={pitch.videoUrl}
                score={pitch.score}
                likes={pitch.likes}
                lastModified={pitch.lastModified}
                comments={pitch.comments || []}
                isPortrait={pitch.isPortrait}
              />
            </Box>
          ))}
        </SlidesContainer>
      </CarouselWrapper>

      {/* Dot Indicators */}
      <DotIndicator>
        {pitchVersions.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "#0090F2" : "#C4C4C4",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </DotIndicator>

      {/* Version Controls */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
        <Button onClick={handleAddVersion} startIcon={<AddCircleOutline />} variant="contained">
          Add Version
        </Button>
        <Button
          onClick={handleDeleteVersion}
          startIcon={<RemoveCircleOutline />}
          variant="contained"
          color="error"
          sx={{ ml: 2 }}
          disabled={pitchVersions.length <= 1}
        >
          Delete Version
        </Button>
      </Box>
    </Box>
  );
};

export default PitchCarousel;
