import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useFirstRun } from '../../context/FirstRunContext';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: theme.spacing(6),
  textAlign: 'center',
  position: 'relative'
}));

const VideoPreview = styled('video')(({ theme }) => ({
  width: '100%',
  maxWidth: 250, // Reduced size from 400 to 300
  height: 'auto', // Maintains aspect ratio
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius, // Smooth edges
}));

{/*const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  padding: theme.spacing(1.5, 3),
  marginBottom: theme.spacing(2),
  borderRadius: 50,
  pt: 2, mt: 2,
}));*/}

const FirstRunVideo: React.FC = () => {
  const { idea, setIdea, videoSrc, setVideoSrc, setIsPortrait } = useFirstRun();
  const navigate = useNavigate();
  const [title, setTitle] = useState(idea || '');

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setVideoSrc(fileUrl);
      localStorage.setItem('uploadedVideo', fileUrl);

      const video = document.createElement('video');
      video.src = fileUrl;
      video.onloadedmetadata = () => {
        setIsPortrait(video.videoHeight > video.videoWidth);
      };
    }
  };

  const handleContinue = () => {
    setIdea(title);
    localStorage.setItem("idea", title);
    localStorage.setItem("uploadedVideo", videoSrc || "");
  
    navigate('/first-run/interstitial');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, px: 2, fontWeight: 900 }}>
        Name Your Pitch & Upload Video
      </Typography>
      
      <TextField
        label="Pitch Title"
        fullWidth
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      

      {videoSrc ? (
        <VideoPreview controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </VideoPreview>
      ) : (
        <Typography variant="body1" sx={{ mt: 2, color: "gray" }}>
          No video uploaded. Please upload a video to continue.
        </Typography>
      )}
<Button
  variant="contained"
  color="primary"
  component="label"
  sx={{
    width: '100%',
    maxWidth: 600,
    padding: (theme) => theme.spacing(1.5, 3),
    marginBottom: (theme) => theme.spacing(1),
    borderRadius: 50,
  }}
>
  Upload your first video
  <input type="file" accept="video/*" hidden onChange={handleUpload} />
</Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 , pt: 1,
          width: '100%',
          maxWidth: 600,
          padding: (theme) => theme.spacing(1.5, 3),
          marginBottom: (theme) => theme.spacing(2),
          borderRadius: 50

        }}
        disabled={!title || !videoSrc}
        onClick={handleContinue
          
        }
      >
        Continue
      </Button>
    </Container>
  );
};

export default FirstRunVideo;
