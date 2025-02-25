/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Stack
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import type { Competition } from './types';

interface CompetitionCardProps {
  competition: Competition;
  onClick?: () => void;
  // Make all handler props optional
  onView?: (competition: Competition) => void;
  onEnter?: (competition: Competition) => void;
  onPreview?: (competition: Competition) => void;
  onViewLeaderboard?: (competition: Competition) => void;
  onViewSubmission?: (competition: Competition) => void;
  hasSubmitted?: boolean; 
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({
  competition,
  onClick,
  onView,
  onEnter,
  onPreview,
  onViewLeaderboard,
  onViewSubmission,
  hasSubmitted = false
}) => {
  const {
    title,
    dates,
    prizes,
    maxTeamSize = 4,
    status
  } = competition;

  // Handle button click with proper fallback
  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent onClick from firing
    
    if (onView) {
      onView(competition);
    } else if (onClick) {
      onClick();
    } else {
      console.log('No handler provided for competition:', competition.id);
    }
  };

  return (
    <Card 
      variant="outlined"
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        } : {}
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box display="flex" gap={2}>
            <Box 
              bgcolor="primary.light" 
              borderRadius="50%" 
              p={1} 
              display="flex" 
              alignItems="center"
            >
              <TrophyIcon color="primary" />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box display="flex" alignItems="center" gap={0.5}>
                  <CalendarIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {dates?.start || 'TBD'} — {dates?.end || 'TBD'}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
          <Chip 
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            color={status === 'ongoing' ? 'primary' : 'default'}
            size="small"
          />
        </Box>

        <Box mt={2}>
          <Stack spacing={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <TrophyIcon fontSize="small" color="action" />
              <Typography variant="body2">
                Grand prize: {prizes?.grandPrize || 'TBD'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <GroupIcon fontSize="small" color="action" />
              <Typography variant="body2">
                Max team size: {maxTeamSize}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box mt={3}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleViewClick}
          >
            View Competition
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompetitionCard;