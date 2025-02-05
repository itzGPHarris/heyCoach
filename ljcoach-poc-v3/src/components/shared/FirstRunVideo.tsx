// Updated on - 2025-02-04, Time: Pacific Time (PT), 14:30

// Updated FirstRunVideo.tsx to Adjust Button Typography Style
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
  maxWidth: 250,
  height: 'auto',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const FirstRunVideo: React.FC = () => {
  const { idea, setIdea, videoSrc, setVideoSrc, setIsPortrait } = useFirstRun();
  const navigate = useNavigate();
  const [title, setTitle] = useState(idea || '');
  const [hasUploaded, setHasUploaded] = useState(!!videoSrc);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setVideoSrc(fileUrl);
      setHasUploaded(true);
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
  //label="Name Your Pitch"
  fullWidth
  variant="standard"
  defaultValue="Normal"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  sx={{
    mb: 2,
    fontFamily: "Roboto",
    backgroundColor: "#030303",
    "& label": { paddingLeft: 1, paddingRight: 1 }, // ✅ Adjust label padding
    "& label.Mui-focused": { color: "#0090f2" }, // ✅ Label color when focused
    "& .MuiInputBase-root": {
      fontSize: "1.2rem", // ✅ Adjust text input font size
      padding: 1.5, // ✅ Uniform padding inside the input
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#ccc" }, // Default border
      "&:hover fieldset": { borderColor: "#0090f2" }, // Border on hover
      "&.Mui-focused fieldset": { borderColor: "#0072c6" }, // Border when focused
    },
  }}
  InputProps={{
    sx: { padding: 2 }, // ✅ Ensure text input has padding
  }}
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
        sx={{ 
          mt: 2, 
          pt: 1,
          width: '100%',
          maxWidth: 600,
          padding: (theme) => theme.spacing(1.5, 3),
          marginBottom: (theme) => theme.spacing(2),
          borderRadius: 50,
          fontWeight: "bold", // ✅ Make text bold
          textTransform: "none", // ✅ Prevent all caps
        }}
        disabled={!title || !videoSrc}
        onClick={handleContinue}
      >
        Continue
      </Button>
      <Button
        variant="contained"
        color={hasUploaded ? "success" : "primary"}
        component="label"
        sx={{
          width: '100%',
          maxWidth: 600,
          padding: (theme) => theme.spacing(1.5, 3),
          marginBottom: (theme) => theme.spacing(1),
          borderRadius: 50,
          fontWeight: "bold", // ✅ Make text bold
          textTransform: "none", // ✅ Prevent all caps
        }}
      >
        {hasUploaded ? "Replace Video" : "Upload Your First Video"}
        <input type="file" accept="video/*" hidden onChange={handleUpload} />
      </Button>

      
    </Container>
  );
};

export default FirstRunVideo;
