import React, { useState } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Star, StarBorder, AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PitchContainer from "./PitchContainer";
import { useLocation } from 'react-router-dom';
import PitchCarouselNewUser from "./PitchCarouselNewUser";

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

const DotIndicator = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  marginTop: "12px",
});

const PitchCarousel: React.FC<PitchCarouselProps> = ({ videoUrl, isPortrait }) => {
  const location = useLocation();
  const firstRunData = location.state || {};
  const isFirstRun = firstRunData.idea ? true : false;

  const [pitchVersions, setPitchVersions] = useState<PitchVersion[]>([
    {
      pitchId: 1,
      id: 1,
      title: "RadiantHue Pitch - V1",
      description: "Pitch for potential investors.",
      videoUrl: videoUrl || "ulXSeoy4rgSxgL02hqIlr58BZ66aiXqflANbiakPKLiM",
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
      title: `Pitch Version ${pitchVersions.length + 1}`,
      description: "New pitch version description.",
      videoUrl: "",
      score: 0,
      likes: 0,
      lastModified: new Date().toLocaleDateString(),
      comments: [],
      isPortrait,
    };
    setPitchVersions([...pitchVersions, newVersion]);
    setCurrentIndex(pitchVersions.length);
  };

  const handleDeleteVersion = () => {
    if (pitchVersions.length > 1) {
      const updatedVersions = pitchVersions.filter((_, index) => index !== currentIndex);
      setPitchVersions(updatedVersions);
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  return (
    <>
      {isFirstRun ? (
        <PitchCarouselNewUser
          videoUrl={firstRunData.videoSrc}
          isPortrait={firstRunData.isPortrait}
          title={firstRunData.idea}
        />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, width: "100%", mb: 2 }}>
            <IconButton onClick={() => handleNavigation("prev")}> <ArrowBackIos /> </IconButton>
            <IconButton onClick={() => setFavoritePitchId(pitchVersions[currentIndex].pitchId)} sx={{ mr: -4 }}>
              {favoritePitchId === pitchVersions[currentIndex].pitchId ? <Star sx={{ color: "#FFD700" }} /> : <StarBorder />}
            </IconButton>
            <Typography variant="h4" sx={{ mx: 3 }}>{pitchVersions[currentIndex].title}</Typography>
            <IconButton onClick={() => handleNavigation("next")}> <ArrowForwardIos /> </IconButton>
          </Box>

          {/* PitchContainer Display */}
          <PitchContainer
            pitchId={pitchVersions[currentIndex].pitchId}
            title={pitchVersions[currentIndex].title}
            description={pitchVersions[currentIndex].description}
            videoUrl={pitchVersions[currentIndex].videoUrl}
            score={pitchVersions[currentIndex].score}
            likes={pitchVersions[currentIndex].likes}
            lastModified={pitchVersions[currentIndex].lastModified}
            comments={pitchVersions[currentIndex].comments || []}
            isPortrait={pitchVersions[currentIndex].isPortrait}
          />

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

          {/* Version Control Buttons - Now in One Row */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            <Button onClick={handleAddVersion} startIcon={<AddCircleOutline />} variant="contained">
              Add Version
            </Button>
            <Button
              onClick={handleDeleteVersion}
              startIcon={<RemoveCircleOutline />}
              variant="contained"
              color="error"
              disabled={pitchVersions.length <= 1}
            >
              Delete Version
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PitchCarousel;
