/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  EmojiEvents as TrophyIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  Gavel as RulesIcon,
  CheckCircle as EligibilityIcon
} from '@mui/icons-material';
import MuxPlayer from "@mux/mux-player-react";
import type { Competition } from './types';

interface CompetitionPreviewProps {
  competition: Competition;
  onBack: () => void;
  onClose: () => void;
  onSubmitPitch: (competition: Competition) => void;
  onViewLeaderboard: (id: string) => void;
}

const CompetitionPreview: React.FC<CompetitionPreviewProps> = ({
  competition,
  onBack,
  onClose,
  onSubmitPitch,
  onViewLeaderboard
}) => {
  const {
    id,
    title,
    description,
    dates,
    prizes,
    rules,
    eligibility,
    maxTeamSize,
    status
  } = competition;

  return (
    <>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={onBack} size="small">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">
              Competition Details
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Hero Section */}
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {description}
            </Typography>

            {/* MUX Hero Video */}
            <Box sx={{ mt: 2, mb: 4 }}>
              <MuxPlayer
                streamType="on-demand"
                playbackId="ulXSeoy4rgSxgL02hqIlr58BZ66aiXqflANbiakPKLiM"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  aspectRatio: "16 / 9",
                }}
              />
            </Box>
          </Box>

          {/* Key Dates */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Key Dates
            </Typography>
            <List dense disablePadding>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CalendarIcon color="action" />
                </ListItemIcon>
                <ListItemText 
                  primary="Competition Period"
                  secondary={`${dates.start} — ${dates.end}`}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CalendarIcon color="action" />
                </ListItemIcon>
                <ListItemText 
                  primary="Submission Deadline"
                  secondary={dates.submissionDeadline}
                />
              </ListItem>
            </List>
          </Box>

          {/* Prizes */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Prizes
            </Typography>
            <List dense disablePadding>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <TrophyIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Grand Prize"
                  secondary={prizes.grandPrize}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <TrophyIcon color="action" />
                </ListItemIcon>
                <ListItemText 
                  primary="First Place"
                  secondary={prizes.firstPlace}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <TrophyIcon color="action" />
                </ListItemIcon>
                <ListItemText 
                  primary="Runner Up"
                  secondary={prizes.runnerUp}
                />
              </ListItem>
            </List>
          </Box>

          {/* Rules & Requirements */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Rules & Requirements
            </Typography>
            <List dense disablePadding>
              {Array.isArray(rules) ? rules.map((rule, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <RulesIcon color="action" />
                  </ListItemIcon>
                  <ListItemText primary={rule} />
                </ListItem>
              )) : (
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <RulesIcon color="action" />
                  </ListItemIcon>
                  <ListItemText primary={rules} />
                </ListItem>
              )}
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <GroupIcon color="action" />
                </ListItemIcon>
                <ListItemText 
                  primary="Team Size"
                  secondary={`Maximum ${maxTeamSize} members`}
                />
              </ListItem>
            </List>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ mt: 4 }}>
            <Stack spacing={2}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => onSubmitPitch(competition)}
                disabled={status !== 'ongoing'}
              >
                Submit My Pitch
              </Button>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => onViewLeaderboard(id)}
              >
                View Leaderboard
              </Button>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </>
  );
};

export default CompetitionPreview;