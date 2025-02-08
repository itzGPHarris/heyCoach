import React, { useEffect, useState } from 'react';
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

const FirstRunFeedback: React.FC = () => {
  const { idea, isPortrait } = useFirstRun();
  const navigate = useNavigate();
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const storedVideo = localStorage.getItem('uploadedVideo');
    if (storedVideo) {
      setVideoSrc(storedVideo);
    }
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Idea: <strong>{idea || 'No idea entered yet'}</strong>
      </Typography>
      
      <SummaryCard>
        <Typography variant="body2">
          "Your pacing is great! Consider adding a stronger hook at the beginning to grab attention."
        </Typography>
      </SummaryCard>
      
      <Typography variant="body1" gutterBottom>
        <Link href="/app-analysis" underline="hover">Want help improving?</Link>
      </Typography>
      
      <Button 
  variant="contained" 
  color="primary" 
  sx={{ mt: 2 }} 
  onClick={() => navigate('/dashboard', { state: { idea, videoSrc, isPortrait } })}
>
  Continue to Dashboard
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

export default FirstRunFeedback;
