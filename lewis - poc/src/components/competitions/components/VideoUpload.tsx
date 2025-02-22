/* eslint-disable @typescript-eslint/no-unused-vars */
// VideoUpload.tsx

// VideoUpload.tsx
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { VideoCall as VideoIcon } from '@mui/icons-material';
import type { VideoUploadProps } from '../types';

const VideoUpload: React.FC<VideoUploadProps> = ({
  videoFile,
  videoPreview,
  onVideoUpload,
  onVideoRemove,
  error
}) => {
  return (
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
          <label>
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onVideoUpload(file);
              }}
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
        )}
      </CardContent>
    </Card>
  );
};

export default VideoUpload;