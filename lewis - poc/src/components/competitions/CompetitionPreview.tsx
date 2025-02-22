import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  Button,
  IconButton,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  Close as CloseIcon,
  EmojiEvents as TrophyIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  Gavel as RulesIcon,
  CheckCircle as EligibilityIcon,
  Schedule as DeadlineIcon
} from '@mui/icons-material';
import type { Competition } from './types';

interface CompetitionPreviewProps {
  competition: Competition | null;
  open: boolean;
  onClose: () => void;
  onEnterCompetition: (id: string) => void;
}

const CompetitionPreview: React.FC<CompetitionPreviewProps> = ({
  competition,
  open,
  onClose,
  onEnterCompetition
}) => {
  if (!competition) return null;

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

  const getStatusChipProps = () => {
    switch (status) {
      case 'ongoing':
        return { color: 'primary' as const, label: 'Active' };
      case 'upcoming':
        return { color: 'warning' as const, label: 'Upcoming' };
      case 'past':
        return { color: 'default' as const, label: 'Past' };
      default:
        return { color: 'default' as const, label: status };
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Chip {...getStatusChipProps()} size="small" />
            </Box>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {description}
          </Typography>
        </Box>

        <Divider />

        {/* Scrollable Content */}
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto',
          px: 2,
          py: 3
        }}>
          <Stack spacing={3}>
            {/* Key Dates */}
            <Box>
              <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                Key Dates
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CalendarIcon fontSize="small" color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Competition Period"
                    secondary={`${dates.start} — ${dates.end}`}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <DeadlineIcon fontSize="small" color="action" />
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
              <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                Prize Pool
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <TrophyIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Grand Prize"
                    secondary={prizes.grandPrize}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <TrophyIcon fontSize="small" color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="First Place"
                    secondary={prizes.firstPlace}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <TrophyIcon fontSize="small" color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Runner Up"
                    secondary={prizes.runnerUp}
                  />
                </ListItem>
                {prizes.otherPrizes?.map((prize, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <TrophyIcon fontSize="small" color="action" />
                    </ListItemIcon>
                    <ListItemText secondary={prize} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Team Requirements */}
            <Box>
              <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                Team Requirements
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <GroupIcon fontSize="small" color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Maximum Team Size"
                    secondary={`${maxTeamSize} members`}
                  />
                </ListItem>
              </List>
            </Box>

            {/* Rules */}
            <Box>
              <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                Competition Rules
              </Typography>
              <List dense disablePadding>
                {rules.map((rule, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <RulesIcon fontSize="small" color="action" />
                    </ListItemIcon>
                    <ListItemText primary={rule} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Eligibility */}
            {eligibility && (
              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                  Eligibility Criteria
                </Typography>
                <List dense disablePadding>
                  {eligibility.map((criterion, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <EligibilityIcon fontSize="small" color="action" />
                      </ListItemIcon>
                      <ListItemText primary={criterion} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Stack>
        </Box>

        {/* Action Footer */}
        <Box sx={{ 
          p: 2, 
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider'
        }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onEnterCompetition(id)}
            disabled={status !== 'ongoing'}
          >
            {status === 'ongoing' 
              ? 'Enter Competition' 
              : status === 'upcoming'
              ? 'Coming Soon'
              : 'Competition Ended'
            }
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CompetitionPreview;