// Updated FirstRunVideo.tsx
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
  padding: theme.spacing(3),
  textAlign: 'center',
  position: 'relative'
}));

const VideoPreview = styled('video')({
  width: '100%',
  maxWidth: 400,
  marginTop: 16,
});

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
    //localStorage.setItem("isPortrait", isPortrait.toString());
  
    navigate('/first-run/interstitial');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
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

      <Button variant="contained" component="label">
        Upload Video
        <input type="file" accept="video/*" hidden onChange={handleUpload} />
      </Button>

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
        sx={{ mt: 2 }}
        disabled={!title || !videoSrc}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </Container>
  );
};

export default FirstRunVideo;
