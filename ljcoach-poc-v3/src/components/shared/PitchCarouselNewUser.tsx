import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PitchContainer from "./PitchContainer";

interface PitchCarouselNewUserProps {
  videoUrl: string;
  isPortrait: boolean;
  title: string;
  description?: string;
  
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


const PitchCarouselNewUser: React.FC<PitchCarouselNewUserProps> = ({ videoUrl, isPortrait, title, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("📩 Received props in PitchCarouselNewUser from Dashboard:", { videoUrl, isPortrait, title, description });
  }, [videoUrl, isPortrait, title, description]);

  const handleNavigation = (direction: "next" | "prev") => {
    setCurrentIndex((prevIndex) =>
      direction === "next" ? Math.min(prevIndex + 1, 0) : Math.max(prevIndex - 1, 0)
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, width: "100%", mb: 2 }}>
        <IconButton onClick={() => handleNavigation("prev")} disabled={currentIndex === 0}>
          <ArrowBackIos />
        </IconButton>

        <Typography variant="h4" sx={{ mx: 3 }}>{title}</Typography>

        <IconButton onClick={() => handleNavigation("next")} disabled={currentIndex === 0}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      <CarouselWrapper>
        <SlidesContainer index={currentIndex}>
          <Box sx={{ width: "100%", flexShrink: 0 }}>
            <PitchContainer
              pitchId={1}
              title={title}
              description={description || "Your first pitch idea!"}
              videoUrl={videoUrl}
              score={0}
              likes={0}
              lastModified={new Date().toLocaleString()}
              comments={[]}
              isPortrait={isPortrait} // ✅ Ensure isPortrait is passed to PitchContainer
            />
          </Box>
        </SlidesContainer>
      </CarouselWrapper>
    </Box>
  );
};

export default PitchCarouselNewUser;
