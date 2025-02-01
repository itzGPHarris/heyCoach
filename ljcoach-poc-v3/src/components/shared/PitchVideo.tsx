import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MuxPlayer from "@mux/mux-player-react";

interface PitchVideoProps {
  videoUrl: string;
  manualOrientation: "auto" | "portrait" | "landscape"; // ✅ Add this prop
}

const PitchVideo: React.FC<PitchVideoProps> = ({ videoUrl, manualOrientation }) => {
  const [videoOrientation, setVideoOrientation] = useState<"portrait" | "landscape">("landscape");

  useEffect(() => {
    if (!videoUrl || manualOrientation !== "auto") return;

    const video = document.createElement("video");
    video.src = videoUrl;
    video.onloadedmetadata = () => {
      setVideoOrientation(video.videoHeight > video.videoWidth ? "portrait" : "landscape");
    };
  }, [videoUrl, manualOrientation]);

  const effectiveOrientation = manualOrientation === "auto" ? videoOrientation : manualOrientation;

  return (
    <Box sx={{ px: 2, pb: 1 }}>
      <MuxPlayer
        streamType="on-demand"
        playbackId={videoUrl}
        style={{
          width: "100%",
          borderRadius: "12px",
          maxHeight: effectiveOrientation === "portrait" ? "80vh" : "auto",
          aspectRatio: effectiveOrientation === "portrait" ? "9 / 16" : "16 / 9",
        }}
      />
    </Box>
  );
};

export default PitchVideo;
