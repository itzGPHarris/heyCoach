import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Star, StarBorder } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
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

const PitchCarousel: React.FC = () => {
  const [pitchVersions, setPitchVersions] = useState(initialPitchVersions);
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" , backgroundColor: "#ededed"}}>  
      {/* Navigation Arrows with Version Number and Favorite Star */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", mb: 2, pl: 2, pr: 2 }}>
        <IconButton onClick={() => handleNavigation("prev")}>
          <ArrowBackIos />
        </IconButton>

        {/* Star Icon for Favoriting */}
        <IconButton onClick={() => toggleFavorite(pitchVersions[currentIndex].id)}>
          {favoritePitchId === pitchVersions[currentIndex].id ? (
            <Star sx={{ color: "#FFD700" }} /> // ✅ Highlighted favorite star
          ) : (
            <StarBorder />
          )}
        </IconButton>

        <Typography variant="h4">{pitchVersions[currentIndex].title}</Typography>

        <IconButton onClick={() => handleNavigation("next")}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* Transition Effect on PitchContainer */}
      <TransitionBox sx={{ width: "100%", display: "flex", justifyContent: "center", backgroundColor: "#ededed", borderRadius: "10px" }}>
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
    </Box>
  );
};

export default PitchCarousel;
