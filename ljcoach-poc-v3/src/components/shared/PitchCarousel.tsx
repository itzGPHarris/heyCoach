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
}

const initialPitchVersions: PitchVersion[] = [
  {
    pitchId: 1,
    id: 1,
    title: "RadiantHue Pitch - V1",
    description: "Pitch for potential investors.",
    videoUrl: "YYtQ34SRyksieH026qohfbOhBNd02LQAK3Fgt8wk5J8tM",
    score: 70,
    likes: 2,
    lastModified: "Jan 1, 2025, 2:00 AM",
    comments: [
      { id: 1, author: "Keeker", role: "Mentor", text: "Great pitch! Consider slowing down your intro." },
      { id: 2, author: "Dewey Brown", role: "Investor", text: "I love the concept, but can you clarify the pricing model?" },
      { id: 3, author: "Skippy", role: "Investor", text: "I love the concept, but can you clarify the pricing model?" },
      { id: 4, author: "John Smith", role: "Investor", text: "I love the concept, but can you clarify the pricing model?" }

    ]
  },
  {
    pitchId: 2,
    id: 2,
    title: "RadiantHue Pitch - V2",
    description: "Showcasing product features.",
    videoUrl: "PUkntYXmIaPE01X7QLd3q2RjFEv2omQ01se00vVbLHtXFI",
    score: 85,
    likes: 5,
    lastModified: "Jan 10, 2025, 11:00 AM",
    comments: [
      { id: 1, author: "Jane Doe", role: "Mentor", text: "Great pitch! Consider slowing down your intro." },
      { id: 2, author: "John Smith", role: "Investor", text: "I love the concept, but can you clarify the pricing model?" }

    ]
  }
];

const CarouselWrapper = styled(Box)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
});

const SlidesContainer = styled(Box)<{ index: number }>(({ index }) => ({
  display: "flex",
  width: "100%",
  transition: "transform 0.5s ease-in-out",
  transform: `translateX(-${index * 100}%)`, // ✅ Moves one slide at a time
}));

const PitchCarousel: React.FC = () => {
  const [pitchVersions, setPitchVersions] = useState<PitchVersion[]>(initialPitchVersions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favoritePitchId, setFavoritePitchId] = useState<number | null>(null);

  const updateComments = (pitchId: number, newComments: CommentData[]) => {
    setPitchVersions((prevVersions) =>
      prevVersions.map((pitch) =>
        pitch.pitchId === pitchId ? { ...pitch, comments: newComments } : pitch
      )
    );
  };

  const handleNavigation = (direction: "next" | "prev") => {
    setCurrentIndex((prevIndex) =>
      direction === "next"
        ? (prevIndex + 1) % pitchVersions.length
        : (prevIndex - 1 + pitchVersions.length) % pitchVersions.length
    );
  };

  const toggleFavorite = (pitchId: number) => {
    setFavoritePitchId((prevFavorite) => (prevFavorite === pitchId ? null : pitchId));
  };

  const handleAddVersion = () => {
    const newVersion: PitchVersion = {
      pitchId: pitchVersions.length + 1,
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

        <IconButton onClick={() => toggleFavorite(pitchVersions[currentIndex].pitchId)} sx={{ mr: -4 }}>
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
                onUpdateComments={(newComments) => updateComments(pitch.pitchId, newComments)}
              />
            </Box>
          ))}
        </SlidesContainer>
      </CarouselWrapper>

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
