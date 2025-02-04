import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
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

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  width: '100%',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2)
}));

const VideoPreview = styled('video')({
  width: '100%',
  maxWidth: 400,
});

const FirstRunVideo: React.FC = () => {
  const { idea, videoSrc, setVideoSrc, isPortrait,setIsPortrait } = useFirstRun(); // ✅ Ensure videoSrc is retrieved
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState<string | null>(videoSrc); // ✅ Initialize with existing videoSrc

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileUrl = URL.createObjectURL(event.target.files[0]);
  
      const video = document.createElement("video");
      video.src = fileUrl;
      video.onloadedmetadata = () => {
        const detectedOrientation = video.videoHeight > video.videoWidth;
        
        setVideoFile(fileUrl); // ✅ Update local state for preview
        setVideoSrc(fileUrl);  // ✅ Store in FirstRunContext
        setIsPortrait(detectedOrientation); // ✅ Store orientation in FirstRunContext
        localStorage.setItem('uploadedVideo', fileUrl);
  
        console.log("📸 Detected Video Orientation:", {
          width: video.videoWidth,
          height: video.videoHeight,
          isPortrait: detectedOrientation ? "Portrait" : "Landscape"
        });
      };
  
      video.onerror = () => {
        console.error("❌ Error loading video metadata.");
      };
    }
  };
  
  

  return (
    <Container>
      <ButtonContainer>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>Skip</Button>
        <Button 
  variant="contained" 
  color="primary" 
  sx={{ mt: 2 }} 
  onClick={() => navigate('/feedback', { state: { idea, videoSrc, isPortrait } })}
  disabled={!videoSrc} // Prevent navigation if no video uploaded
>
  Next: Get AI Feedback
</Button>

      </ButtonContainer>
      
      <Typography variant="h5" gutterBottom>
        Your Idea: <strong>{idea || 'No idea entered yet'}</strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Upload or record a quick intro for your idea. It doesn’t have to be perfect!
      </Typography>
      
      <Button variant="contained" component="label">
        Upload Video
        <input type="file" accept="video/*" hidden onChange={handleUpload} />
      </Button>
      
      {videoFile && (
        <VideoPreview controls>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </VideoPreview>
      )}
    </Container>
  );
};

export default FirstRunVideo;
