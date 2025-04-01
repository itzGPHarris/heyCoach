/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/shared/PitchCard.tsx
import React from 'react';
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Rating,
  Stack,
  useTheme
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareIcon from '@mui/icons-material/Share';
import BarChartIcon from '@mui/icons-material/BarChart';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Define the props interface
export interface PitchCardProps {
  pitch: {
    id: string;
    title?: string;
    thumbnailUrl: string;
    user: {
      name: string;
      avatar?: string;
    };
    createdAt: string;
    version: number;
    versionLabel?: string;
    duration: number | string;
    overallScore: number;
    improvement?: number;
    transcript?: string;
    summary?: string;
    coachFeedback?: string;
    metrics: {
      clarity: number;
      engagement: number;
      pacing: number;
      contentQuality: number;
      wpm?: number;
      fillerWords?: number;
    };
  };
  onActionClick: (action: 'play' | 'metrics' | 'transcript' | 'feedback', pitchId: string) => void;
  onRatingChange?: (pitchId: string, rating: number) => void;
}

const PitchCard: React.FC<PitchCardProps> = ({ 
  pitch, 
  onActionClick,
  onRatingChange 
}) => {
  const theme = useTheme();
  
  const handleAction = (action: 'play' | 'metrics' | 'transcript' | 'feedback') => {
    onActionClick(action, pitch.id);
  };
  
  const handleRatingChange = (event: React.SyntheticEvent, value: number | null) => {
    if (value !== null && onRatingChange) {
      onRatingChange(pitch.id, value);
    }
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 2, overflow: 'hidden', boxShadow: 0, bgcolor: 'transparent' }}>
      {/* Video Thumbnail - Hero Section */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="220"
          image={pitch.thumbnailUrl}
          alt={pitch.title || "Pitch video"}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.2)',
          }}
        >
          <IconButton
            sx={{
              bgcolor: 'rgba(255,255,255,0.9)',
              '&:hover': { bgcolor: 'white' },
              width: 56,
              height: 56,
            }}
            onClick={() => handleAction('play')}
          >
            <PlayArrowIcon fontSize="large" />
          </IconButton>
        </Box>
        
        {/* Video Info Overlay */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          p: 1.5, 
          bgcolor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            
            <Typography variant="body2" sx={{ color: 'white' }}>
              {pitch.versionLabel || `Version ${pitch.version}`}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={<AccessTimeIcon style={{ color: 'white' }} />}
              label={typeof pitch.duration === 'number' ? `${pitch.duration}s` : pitch.duration}
              size="small"
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                '& .MuiChip-icon': { color: 'white' }
              }}
            />
           
          </Box>
        </Box>
      </Box>
      {/* Card Content */}
      {/* Coach Feedback Summary - Always Visible */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
           Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pitch.coachFeedback || pitch.summary || 
              "This pitch needs some improvement in clarity and pacing. Try to articulate your value proposition more clearly and maintain a steady pace throughout."}
          </Typography>
        </Box>
        {/* Metrics Row - Always Visible */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 2,
          p: 1.5,
          borderRadius: 1
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Clarity</Typography>
            <Typography variant="h6" color={pitch.metrics.clarity > 70 ? 'success.main' : 'warning.main'}>
              {pitch.metrics.clarity}%
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Engagement</Typography>
            <Typography variant="h6" color={pitch.metrics.engagement > 70 ? 'success.main' : 'warning.main'}>
              {pitch.metrics.engagement}%
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Pacing</Typography>
            <Typography variant="h6" color={pitch.metrics.pacing > 70 ? 'success.main' : 'warning.main'}>
              {pitch.metrics.pacing}%
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Content</Typography>
            <Typography variant="h6" color={pitch.metrics.contentQuality > 70 ? 'success.main' : 'warning.main'}>
              {pitch.metrics.contentQuality}%
            </Typography>
          </Box>
        </Box>
        {/* Moving ratings...
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 2 
        }}>
          <Typography variant="body2" color="text.secondary">
            Rate this analysis:
          </Typography>
          <Rating
            name={`rating-${pitch.id}`}
            onChange={handleRatingChange}
            precision={1}
            size="small"
          />
        </Box>
         */}
        <Divider sx={{ my: 2 }} />
        
        {/* Quick Reply Buttons */}
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<BarChartIcon />}
            onClick={() => handleAction('metrics')}
          >
            Detailed Metrics
          </Button>
          
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<TextSnippetIcon />}
            onClick={() => handleAction('transcript')}
          >
            Transcript
          </Button>
          
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<ShareIcon />}
            onClick={() => handleAction('feedback')}
          >
            Request Feedback
          </Button>
          
        </Stack>
     
    </Card>
  );
};

export default PitchCard;

