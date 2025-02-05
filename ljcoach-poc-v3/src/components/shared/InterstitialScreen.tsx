// Updated on - 2025-02-04, Time: [YOUR TIMEZONE]

// Updated InterstitialScreen.tsx with Fade Transition
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { CSSTransition } from 'react-transition-group';
import '/src/styles/fadeTransition.css';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: theme.spacing(3),
  textAlign: 'center',
  opacity: 1,
  transition: 'opacity 0.5s ease-in-out',
}));

const InterstitialScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessed, setIsProcessed] = useState(false);
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

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
        setFadeOut(true);
        setTimeout(() => {
          navigate('/app', {
            state: {
              firstRun: true,
              idea: storedIdea,
              videoSrc: storedVideo,
              isPortrait: false,
            }
          });
        }, 500);
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
        setFadeOut(true);
        setTimeout(() => {
          navigate('/app', {
            state: {
              firstRun: true,
              idea: storedIdea,
              videoSrc: storedVideo,
              isPortrait: isPortrait,
            }
          });
        }, 500);
      }, 4000);
    }
  }, [isProcessed, isPortrait, navigate]);

  return (
    <CSSTransition in={!fadeOut} timeout={500} classNames="fade" unmountOnExit>
      <Container>
        <Typography variant="h4" gutterBottom>
          "Great Start! Let's Get Your Feedback..."
        </Typography>
        <img src="/assets/brand-animation.gif" alt="Coach Graphic" width={250} height={250} />
        <CircularProgress sx={{ mt: 2 }} />
      </Container>
    </CSSTransition>
  );
};

export default InterstitialScreen;
