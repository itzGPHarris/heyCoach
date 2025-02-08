// Updated on - 2025-02-05, Time: Pacific Time (PT), 12:50

// Updated FirstRunVideo.tsx - Uses User Intent to Set Default Pitch Title While Keeping UI Styling
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useFirstRun } from "../../contexts/context/FirstRunContext";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  padding: theme.spacing(6),
  textAlign: "center",
  position: "relative",
}));

const VideoPreview = styled("video")(({ theme }) => ({
  width: "100%",
  maxWidth: 250,
  height: "auto",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const FirstRunVideo: React.FC = () => {
  const { idea, setIdea, videoSrc, setVideoSrc, setIsPortrait } = useFirstRun();
  const navigate = useNavigate();
  const [title, setTitle] = useState(idea || "");
  const [hasUploaded, setHasUploaded] = useState(!!videoSrc);
  //const [defaultTitle, setDefaultTitle] = useState("My First Pitch");

  

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setVideoSrc(fileUrl);
      setHasUploaded(true);
      localStorage.setItem("uploadedVideo", fileUrl);

      const video = document.createElement("video");
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
    navigate("/first-run/interstitial");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, px: 2, fontWeight: 900 }}>
        Name your pitch and upload Video
      </Typography>
      
      <TextField
        fullWidth
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          mb: 2,
          fontFamily: "Roboto",
          backgroundColor: "#030303",
          "& label": { paddingLeft: 1, paddingRight: 1 },
          "& label.Mui-focused": { color: "#0090f2" },
          "& .MuiInputBase-root": {
            fontSize: "1.2rem",
            padding: 1.5,
          },
        }}
        InputProps={{ sx: { padding: 2 } }}
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
          width: "100%",
          maxWidth: 600,
          padding: (theme) => theme.spacing(1.5, 3),
          marginBottom: (theme) => theme.spacing(2),
          borderRadius: 50,
          fontWeight: "bold",
          textTransform: "none",
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
          width: "100%",
          maxWidth: 600,
          padding: (theme) => theme.spacing(1.5, 3),
          marginBottom: (theme) => theme.spacing(1),
          borderRadius: 50,
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        {hasUploaded ? "Replace Video" : "Upload Your First Video"}
        <input type="file" accept="video/*" hidden onChange={handleUpload} />
      </Button>
    </Container>
  );
};

export default FirstRunVideo;
