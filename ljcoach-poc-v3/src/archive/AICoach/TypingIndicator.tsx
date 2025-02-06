// src/components/AICoach/TypingIndicator.tsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const TypingIndicator: React.FC = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2 }}>
    <CircularProgress size={16} />
    <Typography variant="body2">AI Coach is typing...</Typography>
  </Box>
);