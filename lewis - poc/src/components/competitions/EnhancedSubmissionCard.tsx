// EnhancedSubmissionCard.tsx

import React from 'react';
import { 
  Card, 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Avatar,
  CardMedia,
  styled
} from '@mui/material';
import {
  Edit as EditIcon,
  PlayArrow as PlayIcon
} from '@mui/icons-material';
import type { Submission } from './types';

// Status badge styling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StatusBadge = styled(Chip)(({ theme }) => ({
  borderRadius: 16,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  fontWeight: 500
}));

// Category tag styling
const CategoryTag = styled(Avatar)(({ theme }) => ({
  width: 30,
  height: 30,
  fontSize: '0.875rem',
  fontWeight: 500,
  backgroundColor: theme.palette.primary.light
}));

interface EnhancedSubmissionCardProps {
  submission: Submission;
  variant?: 'horizontal' | 'vertical';
  onPlay: (id: string) => void;
  onEdit: (id: string) => void;
  onUnpublish?: (id: string) => void;
  onSelect?: (id: string) => void;
}

const EnhancedSubmissionCard: React.FC<EnhancedSubmissionCardProps> = ({
  submission,
  variant = 'vertical',
  onPlay,
  onEdit,
  onUnpublish,
  onSelect
}) => {
  const {
    id,
    name,
    competitionName,
    date,
    status,
    video,
    description
  } = submission;

  // Get category tags from mock data
  const categoryTags = ['A', 'B', 'D', 'R'];

  // Format competition name and status
  const formattedCompetition = `${competitionName}: 500 points, 3rd place`;
  const formattedStatus = status === 'submitted' ? 
    `Competition ended: ${date}` : `Draft created: ${date}`;

  return (
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          borderColor: 'primary.light',
          boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
        },
        display: 'flex',
        flexDirection: variant === 'horizontal' ? 'row' : 'column',
      }}
      onClick={() => onSelect && onSelect(id)}
    >
      {/* Video Thumbnail */}
      <CardMedia
        component="div"
        sx={{
          position: 'relative',
          height: 180,
          width: variant === 'horizontal' ? 200 : '100%',
          minWidth: variant === 'horizontal' ? 200 : 'auto',
          backgroundColor: 'grey.100',
          cursor: 'pointer',
          '&:hover .play-button': {
            opacity: 1,
            transform: 'scale(1.1)'
          }
        }}
        image={video.thumbnailUrl || ''}
        onClick={() => onPlay(id)}
      >
        {/* Play Button Overlay */}
        <Box
          className="play-button"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'primary.main',
            borderRadius: '50%',
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.9,
            transition: 'all 0.2s',
            '&:hover': {
              opacity: 1,
              transform: 'translate(-50%, -50%) scale(1.1)'
            }
          }}
        >
          <PlayIcon sx={{ color: 'white', fontSize: 30 }} />
        </Box>
      </CardMedia>

      {/* Content */}
      <Box 
        sx={{ 
          p: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Competition Info */}
        <Box sx={{ mb: 1 }}>
          <Chip
            label={formattedCompetition}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ borderRadius: 16, height: 24 }}
          />
        </Box>

        {/* Status */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mb: 1.5 }}
        >
          {formattedStatus}
        </Typography>

        {/* Title */}
        <Typography 
          variant="h6" 
          component="h2"
          sx={{ 
            fontWeight: 600,
            mb: 1.5
          }}
        >
          {name}
        </Typography>

        {/* Description */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description || 'Submission description'}
        </Typography>

        {/* Category Tags */}
        <Box 
          sx={{ 
            display: 'flex',
            gap: 1,
            mb: 2
          }}
        >
          {categoryTags.map((tag) => (
            <CategoryTag key={tag} sx={{ bgcolor: 'secondary.light' }}>{tag}</CategoryTag>
          ))}
        </Box>

        {/* Actions */}
        <Box 
          sx={{ 
            display: 'flex',
            gap: 1,
            mt: 'auto'
          }}
        >
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
            sx={{ flex: 1 }}
          >
            Edit
          </Button>
          
          {onUnpublish && (
            <Button
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                onUnpublish(id);
              }}
              sx={{ flex: 1 }}
            >
              Unpublish
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default EnhancedSubmissionCard;