// Updated CoverScreen.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useFirstRun } from '../context/FirstRunContext';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const CoverScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setIdea, setVideoSrc } = useFirstRun();

  const handleStart = () => {
    setIdea('My First Pitch');
    setVideoSrc(null); // Ensure it resets video selection
    navigate('/first-run/video');
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to LongJump
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Get started by creating your first pitch idea and uploading a quick intro video.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleStart}
      >
        Start Your First Pitch
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/app")}
      >
        Enter Full App
      </Button>
    </Container>
  );
};

export default CoverScreen;