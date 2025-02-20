import React from 'react';
import { Box, Typography } from '@mui/material';
import emptyStateImage from '../../../assets/coachlogo.svg';
import emptyArrowImage from '../../../assets/arrow.svg';

export const EmptyState: React.FC = () => (
  <Box sx={{ 
    height: "100%", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "flex-end", 
    alignItems: "center", 
    width: "100%", 
    pb: 2, 
    px: 3 
  }}> 
    <img src={emptyStateImage} alt="No messages" style={{ maxWidth: "100%", width: "300px" }} />
    <Box sx={{ marginTop: 4, textAlign: "center" }}>
      <Typography variant="h2" color="text.secondary">Ready to Jump?</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
        Upload or record your first pitch video, and I'll help you refine it!
      </Typography>
      <img src={emptyArrowImage} alt="Arrow indicator" style={{ maxWidth: "100%", width: "600px" }} />
    </Box>
  </Box>
);
