// Updated on - 2025-02-04, Time: Pacific Time (PT), 14:30

// Updated PitchCarouselNewUser.tsx to Ensure AI Analysis Scroll Works
import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
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
  const analysisRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("✅ Event listener attached for scrollToAnalysis in PitchCarouselNewUser");
    
    const handleScrollToAnalysis = () => {
      console.log("📜 Scroll event triggered in PitchCarouselNewUser!");
      setCurrentIndex(0); // Ensure the first slide is active before scrolling
      setTimeout(() => {
        if (analysisRef.current) {
          console.log("📜 Scrolling to AI Analysis in PitchCarouselNewUser...");
          analysisRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          console.log("⚠️ analysisRef.current is null in PitchCarouselNewUser. Cannot scroll.");
        }
      }, 300); // Small delay to allow slide change
    };

    window.addEventListener("scrollToAnalysis", handleScrollToAnalysis);
    return () => {
      console.log("❌ Event listener removed from PitchCarouselNewUser");
      window.removeEventListener("scrollToAnalysis", handleScrollToAnalysis);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <CarouselWrapper>
        <SlidesContainer index={currentIndex}>
          <Box ref={analysisRef} sx={{ width: "100%", flexShrink: 0 }}>
            <PitchContainer
              pitchId={1}
              title={title}
              description={description || "Your first pitch idea!"}
              videoUrl={videoUrl}
              score={0}
              likes={0}
              lastModified={new Date().toLocaleString()}
              comments={[]}
              isPortrait={isPortrait}
            />
          </Box>
        </SlidesContainer>
      </CarouselWrapper>
    </Box>
  );
};

export default PitchCarouselNewUser;
