/* eslint-disable @typescript-eslint/no-unused-vars */
// CompetitionCard.tsx

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
import type { CompetitionCardProps } from './types';

const CompetitionCard: React.FC<CompetitionCardProps> = ({
    competition,
    hasSubmitted,
    onPreview,
    onEnter,
    onViewLeaderboard,
    onViewSubmission
  }) => {
  
  const {
    id,
    title,
    dates,
    prizes,
    status,
    maxTeamSize = 4
  } = competition;

  const isActive = status === 'ongoing';

  const getStatusColor = () => {
    switch (status) {
      case 'ongoing':
        return 'primary';
      case 'upcoming':
        return 'warning';
      case 'past':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Card variant="outlined">
        {/* Header */}
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
                    {dates.start} — {dates.end}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
          <Chip 
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            color={getStatusColor()}
            size="small"
          />
        </Box>

        {/* Competition Details */}
        <Box mt={2}>
          <Stack spacing={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="body2">
                Submission deadline: {dates.submissionDeadline}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <TrophyIcon fontSize="small" color="action" />
              <Typography variant="body2">
                Grand prize: {prizes.grandPrize}
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

             {/* Updated Action Buttons */}
      <Box display="flex" gap={1} mt={3}>
        <Button
          variant="outlined"
          onClick={() => onPreview(competition)}
          sx={{ minWidth: 'auto' }}
        >
          Preview
        </Button>
        <Box flexGrow={1} display="flex" gap={1}>
          {isActive ? (
            <>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => onEnter(id)}
              >
                Enter competition
              </Button>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => onViewLeaderboard(id)}
              >
                View leaderboard
              </Button>
              {hasSubmitted && (
                <Button 
                  variant="outlined"
                  onClick={() => onViewSubmission?.(id)}
                >
                  My submission
                </Button>

              )}
            </>
          ) : (
            <>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => onViewLeaderboard(id)}
              >
                View results
              </Button>
              {hasSubmitted && (
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => onViewSubmission?.(id)}
                >
                  My submissions
                </Button>
              )}
            </>
          )}
          </Box>
        </Box>
      </Card>
    );
  }; 


export default CompetitionCard;