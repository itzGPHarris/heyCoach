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
  padding: theme.spacing(4), // Increased padding for better spacing
  textAlign: 'center',
  maxWidth: 500, // Prevents overly wide content on larger screens
  margin: 'auto', // Centers content
}));

const Logo = styled('img')(({ theme }) => ({
  width: 220,
  height: 121,
  marginBottom: theme.spacing(6), // Adds space below the logo
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%', // Ensures full width on small screens
  maxWidth: 300, // Prevents buttons from stretching too wide
  padding: theme.spacing(1.5, 3), // Adjusts button padding
  marginBottom: theme.spacing(2), // Adds spacing between buttons
  borderRadius: 50, // Rounds button corners
}));

const CoverScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setIdea, setVideoSrc } = useFirstRun();

  const handleStart = () => {
    setIdea('My First Pitch');
    setVideoSrc(null);
    navigate('/first-run/video');
  };

  return (
    <Container>
      <Logo src="../img/coachlogo.svg" alt="Coach Graphic" />

      <Typography variant="h3" gutterBottom sx={{ mb: 4, px: 2 ,fontWeight: 900 }}>
        Welcome to LongJump
      </Typography>

      <Typography variant="body1" sx={{ mb: 6, px: 2 }}>
        Get started by creating your first pitch idea and uploading a quick intro video.
      </Typography>

      <StyledButton variant="contained" color="primary" onClick={handleStart}>
        Start Your First Pitch
      </StyledButton>

      <StyledButton variant="outlined" color="secondary" onClick={() => navigate('/app')}>
        Enter Full App
      </StyledButton>
    </Container>
  );
};

export default CoverScreen;
