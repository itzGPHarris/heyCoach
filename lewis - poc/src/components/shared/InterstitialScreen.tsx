// Updated on - 2025-02-04, Time: [YOUR TIMEZONE]

// Updated InterstitialScreen.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';
import '/src/styles/fadeTransition.css';


const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const InterstitialScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessed, setIsProcessed] = useState(false);
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);

  useEffect(() => {
    const storedIdea = localStorage.getItem("idea");
    const storedVideo = localStorage.getItem("uploadedVideo");

    if (storedVideo) {
      const video = document.createElement('video');
      video.src = storedVideo;
      video.onloadedmetadata = () => {
        const detectedPortrait = video.videoHeight > video.videoWidth;
        setIsPortrait(detectedPortrait);
        localStorage.setItem("isPortrait", detectedPortrait.toString());
        console.log("📏 Aspect Ratio Check - isPortrait:", detectedPortrait);
        setIsProcessed(true);
      };
    } else {
      console.log("🚀 Navigating to /app without video aspect ratio check:", {
        firstRun: true,
        idea: storedIdea,
        videoSrc: storedVideo,
        isPortrait: false,
      });
      setTimeout(() => {
        navigate('/app', {
          state: {
            firstRun: true,
            idea: storedIdea,
            videoSrc: storedVideo,
            isPortrait: false,
          }
        });
      }, 4000);
    }
  }, [navigate]);

  useEffect(() => {
    if (isProcessed && isPortrait !== null) {
      const storedIdea = localStorage.getItem("idea");
      const storedVideo = localStorage.getItem("uploadedVideo");

      console.log("🚀 Navigating to /app with updated state after delay:", {
        firstRun: true,
        idea: storedIdea,
        videoSrc: storedVideo,
        isPortrait: isPortrait,
      });

      setTimeout(() => {
        navigate('/app', {
          state: {
            firstRun: true,
            idea: storedIdea,
            videoSrc: storedVideo,
            isPortrait: isPortrait,
          }
        });
      }, 4000);
    }
  }, [isProcessed, isPortrait, navigate]);

  return (
    <Container>
        <img src="../img/coachlogo.svg" alt="Coach Graphic" width={294} height={162} />
        <CircularProgress sx={{ mt: 2 }} />

      <Typography variant="h4" gutterBottom>
        "Great Start! Let's Get Your Feedback..."
      </Typography>
    </Container>
  );
};

export default InterstitialScreen;

