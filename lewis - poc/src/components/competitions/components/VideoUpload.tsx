/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import {
  VideoCall as VideoIcon,
  Star as StarIcon,
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon
} from '@mui/icons-material';

interface VideoUploadProps {
  videoFile: File | null;
  videoPreview?: string;
  onVideoUpload: (file: File) => void;
  onVideoRemove: () => void;
  error?: string;
}

// Sample favorite pitches data
const FAVORITE_PITCHES = [
  {
    id: '1',
    title: 'Main Pitch v2',
    thumbnail: '/api/placeholder/320/180',
    duration: '2:45',
    lastModified: '2025-02-15',
    coachRecommended: true
  },
  {
    id: '2',
    title: 'Technical Deep Dive',
    thumbnail: '/api/placeholder/320/180',
    duration: '3:20',
    lastModified: '2025-02-14',
    coachRecommended: false
  }
];

const VideoUpload: React.FC<VideoUploadProps> = ({
  videoFile,
  videoPreview,
  onVideoUpload,
  onVideoRemove,
  error
}) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onVideoUpload(file);
    }
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          {videoPreview ? (
            <Box position="relative">
              <video
                src={videoPreview}
                controls
                style={{ width: '100%', borderRadius: 8 }}
              />
              <Button
                variant="outlined"
                size="small"
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={onVideoRemove}
              >
                Choose Different Video
              </Button>
            </Box>
          ) : (
            <Stack spacing={2}>
              <label>
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={handleFileUpload}
                />
                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: error ? 'error.main' : 'divider',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  <VideoIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  <Typography color="text.secondary">
                    Upload your pitch video
                  </Typography>
                  {error && (
                    <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                      {error}
                    </Typography>
                  )}
                </Box>
              </label>

              <Button
                variant="outlined"
                startIcon={<StarIcon />}
                onClick={() => setShowFavorites(true)}
                fullWidth
              >
                Select a Favorite Pitch
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>

      {/* Favorites Selection Dialog */}
      <Dialog
        open={showFavorites}
        onClose={() => setShowFavorites(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton 
                size="small" 
                onClick={() => setShowFavorites(false)}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6">
                Select a Favorite Pitch
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={() => setShowFavorites(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {FAVORITE_PITCHES.map((pitch) => (
              <Card 
                key={pitch.id} 
                variant="outlined"
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main' }
                }}
                onClick={() => {
                  // Here we would normally fetch the video file
                  // For now, we'll just simulate it
                  const mockFile = new File([""], pitch.title, { type: "video/mp4" });
                  onVideoUpload(mockFile);
                  setShowFavorites(false);
                }}
              >
                <CardContent>
                  <Box display="flex" gap={2}>
                    <Box 
                      component="img"
                      src={pitch.thumbnail}
                      sx={{ 
                        width: 160,
                        height: 90,
                        borderRadius: 1,
                        objectFit: 'cover'
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle1">
                        {pitch.title}
                        {pitch.coachRecommended && (
                          <StarIcon 
                            sx={{ 
                              ml: 1, 
                              color: 'warning.main',
                              fontSize: 16 
                            }} 
                          />
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Duration: {pitch.duration}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last modified: {pitch.lastModified}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoUpload;