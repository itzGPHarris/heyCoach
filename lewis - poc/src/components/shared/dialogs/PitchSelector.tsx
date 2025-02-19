import React from 'react';
import { 
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Card,
  CardMedia,
  Grid,
  Stack,
  styled
} from '@mui/material';
import { 
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  VideoFile as VideoFileIcon 
} from '@mui/icons-material';

type Pitch = {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  lastModified: string;
  isReady: boolean;
  isFavorite: boolean;
  coachRecommended?: boolean;
  previousCompetition?: {
    name: string;
    place: string;
  };
};

type PitchSelectorProps = {
  pitches: Pitch[];
  selectedPitchId: string;
  onPitchSelect: (id: string) => void;
};

const StyledVideoCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.background.default
}));

const DurationChip = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: theme.palette.common.white,
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5)
}));

const PitchSelector = ({ pitches, selectedPitchId, onPitchSelect }: PitchSelectorProps) => {
  const selectedPitch = pitches.find(pitch => pitch.id === selectedPitchId);

  return (
    <Box sx={{ p: .25, mt: 2 }}>
      <Typography variant="caption" gutterBottom>
        Select Pitch for Submission
      </Typography>
      
      {/* Pitch selection dropdown */}
      <FormControl fullWidth>
        <Select
          value={selectedPitchId}
          onChange={(e) => onPitchSelect(e.target.value)}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <Typography color="text.secondary">Choose a pitch...</Typography>;
            }
            const pitch = pitches.find(p => p.id === selected);
            return (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>{pitch?.title}</Typography>
                {pitch?.isFavorite && <StarIcon fontSize="small" color="warning" />}
                {pitch?.coachRecommended && <ThumbUpIcon fontSize="small" color="success" />}
              </Stack>
            );
          }}
        >
          <MenuItem value="">
            <em>Choose a pitch...</em>
          </MenuItem>
          {pitches.map(pitch => (
            <MenuItem key={pitch.id} value={pitch.id}>
              <Stack direction="row" alignItems="center" spacing={1} width="100%">
                <Box flex={1}>
                  {pitch.title}
                </Box>
                <Stack direction="row" spacing={1}>
                  {pitch.isFavorite && (
                    <StarIcon fontSize="small" color="warning" />
                  )}
                  {pitch.coachRecommended && (
                    <ThumbUpIcon fontSize="small" color="success" />
                  )}
                </Stack>
              </Stack>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          Only showing pitches marked as "ready to submit" or "favorites"
        </FormHelperText>
      </FormControl>
      
{/* Preview of selected pitch */}
{selectedPitch && (
  <StyledVideoCard>
    <Grid container>
      {/* Video Thumbnail */}
      <Grid 
        item 
        xs={12}     // Full width on mobile
        sm={5}      // 5/12 width on tablet and up
        sx={{ 
          position: 'relative',
          width: '100%' // Ensures full width in mobile
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            aspectRatio: '16/9',
            objectFit: 'cover'
          }}
          image={selectedPitch.thumbnailUrl}
          alt={selectedPitch.title}
        />
        <DurationChip>
          <VideoFileIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption">
            {selectedPitch.duration}
          </Typography>
        </DurationChip>
      </Grid>

      {/* Details */}
      <Grid 
        item 
        xs={12}     // Full width on mobile
        sm={7}      // 7/12 width on tablet and up
      >
        <Box sx={{ 
          p: 2,
          // Add some extra padding on mobile
          px: { xs: 2, sm: 3 },
          py: { xs: 3, sm: 2 }
        }}>
          <Typography variant="h6" gutterBottom>
            {selectedPitch.title}
          </Typography>
          
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Last modified: {selectedPitch.lastModified}
            </Typography>
            
            <Stack direction="row" spacing={1} alignItems="center">
              {selectedPitch.isFavorite && (
                <StarIcon color="warning" />
              )}
              {selectedPitch.coachRecommended && (
                <ThumbUpIcon color="success" />
              )}
            </Stack>

            {selectedPitch.previousCompetition && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'success.main',
                  fontWeight: 'medium',
                  // Adjust text size on mobile
                  fontSize: { xs: '0.875rem', sm: 'inherit' }
                }}
              >
                Previous submission - {selectedPitch.previousCompetition.place} place in{' '}
                {selectedPitch.previousCompetition.name}
              </Typography>
            )}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  </StyledVideoCard>
)}
    </Box>
  );
};

export default PitchSelector;