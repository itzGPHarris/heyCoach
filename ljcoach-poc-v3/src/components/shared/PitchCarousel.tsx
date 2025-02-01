import React, { useState } from "react";
import { Box, IconButton, Typography, Button, Slide, Fade } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Star, StarBorder, AddCircleOutline, Delete } from "@mui/icons-material";
import PitchContainer from "./PitchContainer";

interface PitchVersion {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  score: number;
  likes: number;
  lastModified: string;
  comments: { id: number; author: string; role: string; text: string }[];
  isFavorite?: boolean;
}

const initialPitches: PitchVersion[] = [
  {
    id: 1,
    title: "RadiantHue - Initial Pitch",
    description: "Sustainable smart lighting with AI-driven efficiency.",
    videoUrl: "sampleVideo1",
    score: 70,
    likes: 2,
    lastModified: "Jan 1, 2025, 2:00 AM",
    comments: [],
    isFavorite: false,
  },
];

const PitchCarousel: React.FC = () => {
  const [pitchVersions, setPitchVersions] = useState<PitchVersion[]>(initialPitches);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [isAnimating, setIsAnimating] = useState(false);
 // const [openVideoDialog, setOpenVideoDialog] = useState(false);
 // const [newVideoUrl, setNewVideoUrl] = useState("");

  const handleNavigation = (direction: "left" | "right") => {
    if (isAnimating) return;
    setSlideDirection(direction);
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === "left") {
          return prevIndex === pitchVersions.length - 1 ? 0 : prevIndex + 1;
        } else {
          return prevIndex === 0 ? pitchVersions.length - 1 : prevIndex - 1;
        }
      });
      setIsAnimating(false);
    }, 300);
  };

  const toggleFavorite = () => {
    const updatedPitches = pitchVersions.map((pitch, index) =>
      index === currentIndex ? { ...pitch, isFavorite: !pitch.isFavorite } : pitch
    );
    setPitchVersions(updatedPitches);
  };

  const handleNewVersion = () => {
    const newVersion: PitchVersion = {
      id: pitchVersions.length + 1,
      title: `RadiantHue - Version ${pitchVersions.length + 1}`,
      description: "New pitch version for practice.",
      videoUrl: "sampleVideoPlaceholder",
      score: 75,
      likes: 0,
      lastModified: new Date().toLocaleString(),
      comments: [],
      isFavorite: false,
    };

    setPitchVersions([...pitchVersions, newVersion]);
    setCurrentIndex(pitchVersions.length);
  };

  const handleDeleteVersion = () => {
    if (pitchVersions.length > 1) {
      const updatedPitches = pitchVersions.filter((_, index) => index !== currentIndex);
      setCurrentIndex((prevIndex) => (prevIndex === updatedPitches.length ? prevIndex - 1 : prevIndex));
      setPitchVersions(updatedPitches);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Navigation Arrows with Version Title and Favorite Star */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", mb: 2 }}>
        <IconButton onClick={() => handleNavigation("right")} disabled={isAnimating}>
          <ArrowBackIos />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={toggleFavorite} sx={{ color: pitchVersions[currentIndex].isFavorite ? "gold" : "gray" }}>
            {pitchVersions[currentIndex].isFavorite ? <Star /> : <StarBorder />}
          </IconButton>
          <Typography variant="h6">{pitchVersions[currentIndex].title}</Typography>
        </Box>

        <IconButton onClick={() => handleNavigation("left")} disabled={isAnimating}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* PitchContainer with Slide + Fade Animation */}
      <Slide in={!isAnimating} direction={slideDirection} timeout={300}>
        <Fade in={!isAnimating} timeout={250}>
          <Box sx={{ width: "100%" }}>
            <PitchContainer {...pitchVersions[currentIndex]} />
          </Box>
        </Fade>
      </Slide>

      {/* Navigation Dots */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
        {pitchVersions.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: currentIndex === index ? "primary.main" : "gray",
              cursor: "pointer",
            }}
            onClick={() => !isAnimating && setCurrentIndex(index)}
          />
        ))}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="contained" onClick={handleNewVersion} startIcon={<AddCircleOutline />}>
          Save New Version
        </Button>
        {pitchVersions.length > 1 && (
          <Button variant="outlined" color="error" onClick={handleDeleteVersion} startIcon={<Delete />}>
            Delete Version
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PitchCarousel;
