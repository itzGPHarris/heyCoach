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
  onView: (competition: Competition) => void;
  onEnter?: (competition: Competition) => void;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({
  competition,
  onView,
  
}) => {
  const {
    title,
    dates,
    prizes,
    maxTeamSize = 4,
    status
  } = competition;

  return (
    <Card variant="outlined">
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
                    {dates.start} — {dates.end}
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

        <Box mt={3}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onView(competition)}
          >
            View Competition
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompetitionCard;