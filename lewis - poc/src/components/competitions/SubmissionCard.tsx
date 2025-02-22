import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton
} from '@mui/material';
import {
  PlayCircle as PlayIcon,
  OpenInNew as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  Group as TeamIcon
} from '@mui/icons-material';
import type { SubmissionCardProps } from './types';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'submitted': return 'primary';
    case 'accepted': return 'success';
    case 'rejected': return 'error';
    default: return 'default';
  }
};

const SubmissionCard: React.FC<SubmissionCardProps> = ({
  submission,
  onPreview,
  onView,
  onEdit,
  onDelete
}) => {
  const {
    id,
    name,
    competitionName,
    date,
    status,
    teamSize
  } = submission;

  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {competitionName}
            </Typography>
            <Box display="flex" gap={2} mt={1}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <CalendarIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {date}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <TeamIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {teamSize} team members
                </Typography>
              </Box>
            </Box>
          </Box>
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            color={getStatusColor(status)}
            size="small"
          />
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PlayIcon />}
              onClick={() => onPreview(id)}
            >
              Preview
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ViewIcon />}
              onClick={() => onView(id)}
            >
              View
            </Button>
          </Box>
          <Box display="flex" gap={1}>
            <IconButton size="small" onClick={() => onEdit(id)}>
              <EditIcon />
            </IconButton>
            <IconButton 
              size="small" 
              color="error"
              onClick={() => onDelete(id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;