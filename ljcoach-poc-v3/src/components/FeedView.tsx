// Updated on - 2025-02-04, Time: Pacific Time (PT), 14:30

// Updated FeedView.tsx with Debugging for Scroll Event
import { Box } from "@mui/material";
import PitchFeed from "./shared/PitchFeed";
import Competition from "./shared/Competition";
import { useEffect, useRef } from "react";

const FeedView = ({ scrollToAnalysis }: { scrollToAnalysis?: boolean }) => {
  const analysisRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    console.log("✅ Event listener attached for scrollToAnalysis in [Feedview]");
  const handleScrollToAnalysis = () => {
    console.log("📜 Scroll event triggered in [Feedview]!");
  };

  window.addEventListener("scrollToAnalysis", handleScrollToAnalysis);
  return () => {
    console.log("❌ Event listener removed from [feedview]");
    window.removeEventListener("scrollToAnalysis", handleScrollToAnalysis);
  };


    const handleScrollTrigger = () => {
      console.log("📜 Scroll event triggered in FeedView!");
      if (analysisRef.current) {
        console.log("📜 Scrolling to AI Analysis in FeedView...");
        analysisRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log("⚠️ analysisRef.current is null in FeedView. Cannot scroll.");
      }
    };
  
    window.addEventListener("scrollToAnalysis", handleScrollTrigger);
    return () => window.removeEventListener("scrollToAnalysis", handleScrollTrigger);
    }, []);

  useEffect(() => {
    console.log("📜 Scroll Trigger Received:", scrollToAnalysis);
    if (scrollToAnalysis && analysisRef.current) {
      console.log("📜 Scrolling via prop update...");
      analysisRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollToAnalysis]);
console.log("📜 feedview:");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "100vw", pl: 3, pr: 3, pb: 5 }}>
      <Competition />
      <div ref={analysisRef}>
        <PitchFeed />
      </div>
    </Box>
  );
};

export default FeedView;
