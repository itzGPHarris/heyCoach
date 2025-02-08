import React, { useEffect } from 'react';
import { Box, Typography, Button, Paper, Link } from '@mui/material';
import { styled } from '@mui/system';
import { useFirstRun } from "../../contexts/context/FirstRunContext";
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: theme.spacing(3),
  textAlign: 'center'
}));

const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 500,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const VideoPreview = styled('video')({
  width: '80%',
  maxWidth: 320,
});

const FirstRunDashboard: React.FC = () => {
  //const { idea, videoSrc, isPortrait } = useFirstRun();
  const navigate = useNavigate();
  
  const { idea, videoSrc, isPortrait } = useFirstRun(); // ✅ Ensure videoSrc is retrieved directly

  useEffect(() => {
    
    console.log("📤 Passing from FirstRunDashboard:", { idea, videoSrc, isPortrait });
  }, [idea, videoSrc, isPortrait]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your First Pitch Summary
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        Your Idea: <strong>{idea || 'No idea entered yet'}</strong>
      </Typography>
      
      <SummaryCard>
        <Typography variant="body2">
          "Your first pitch has been recorded! You can review your progress below."
        </Typography>
      </SummaryCard>
      
      <Typography variant="body1" gutterBottom>
        <Link href="/app-analysis" underline="hover">View Full Analysis & Feedback</Link>
      </Typography>
      <Button 
  variant="contained" 
  color="primary" 
  sx={{ mt: 2 }} 
  onClick={() => {
    console.log("📤 Passing from FirstRunDashboard (FIXED):", { idea, videoSrc, isPortrait });
    navigate('/app', { state: { idea, videoSrc, isPortrait } });
  }}
>
  Enter Full App
</Button>
      {videoSrc && (
        <VideoPreview controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </VideoPreview>
      )}
      
 

      
      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => navigate('/add-video')}>
        Record Another Version
      </Button>
    </Container>
  );
};

export default FirstRunDashboard;
