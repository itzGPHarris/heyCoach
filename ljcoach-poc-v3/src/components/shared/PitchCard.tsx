import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Card, CardContent, CardHeader, 
  Collapse, Typography, Box,
  Paper, IconButton, TextField, Button
} from '@mui/material';
import { ChevronRight, ChevronDown, BarChart2, MessageSquare, Clock, Star, ThumbsUp } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react';
import TranscriptSection from './TranscriptSection';
import { PitchVersion } from '../../store/types';

const formatTimestamp = (timestamp?: string) => {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date).replace(',', ' •');
};

const CommentBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default
}));

const InteractiveBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  cursor: 'pointer',
  transition: '0.3s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}));

function PitchCard({ pitch }: { pitch?: PitchVersion }) {
  const [expanded, setExpanded] = useState(false);
  const [feedbackExpanded, setFeedbackExpanded] = useState(false);
  const [comment, setComment] = useState('');

  if (!pitch) {
    return <Typography variant="body2" color="error">No pitch data available.</Typography>;
  }

  return (
    <Card sx={{ mb: 4 }}>
      <CardHeader title={pitch.title || 'Untitled Pitch'} subheader={pitch.description || 'No description available'} />
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <Star size={18} color="gold" />
          <Typography variant="body2">{pitch.score ?? 0}% Score</Typography>
          <ThumbsUp size={18} color="blue" />
          <Typography variant="body2">{pitch.likes ?? 0} Likes</Typography>
          <Clock size={18} color="gray" />
          <Typography variant="body2">{formatTimestamp(pitch.timestamp)}</Typography>
        </Box>
        <Box sx={{ mb: 3, borderRadius: 1, overflow: 'hidden' }}>
          {pitch.playbackId ? (
            <MuxPlayer playbackId={pitch.playbackId} metadata={{ video_title: pitch.title }} streamType="on-demand" />
          ) : (
            <Typography variant="body2" color="error">⚠ Playback ID missing.</Typography>
          )}
        </Box>
        <InteractiveBox onClick={() => setExpanded(!expanded)} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BarChart2 size={20} />
              <Typography variant="h6">Pitch Summary</Typography>
            </Box>
            <IconButton>{expanded ? <ChevronDown /> : <ChevronRight />}</IconButton>
          </Box>
        </InteractiveBox>
        <Collapse in={expanded}>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>AI Coach Analysis</Typography>
            <Typography paragraph>{pitch.aiCoachSummary || 'No AI feedback yet.'}</Typography>
            <TranscriptSection transcript={pitch.transcript ?? ''} />
          </Box>
        </Collapse>
        <InteractiveBox onClick={() => setFeedbackExpanded(!feedbackExpanded)} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MessageSquare size={20} />
              <Typography variant="h6">Feedback & Comments</Typography>
            </Box>
            <IconButton>{feedbackExpanded ? <ChevronDown /> : <ChevronRight />}</IconButton>
          </Box>
        </InteractiveBox>
        <Collapse in={feedbackExpanded}>
          <Box sx={{ p: 2 }}>
            {pitch.feedback?.length > 0 ? pitch.feedback.map((comment, index) => (
              <CommentBox key={index} variant="outlined" sx={{ p: 2, mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{comment.author}</Typography>
                {comment.role && <Typography variant="caption" color="text.secondary">{comment.role}</Typography>}
                <Typography variant="body2">{comment.text}</Typography>
                <Typography variant="caption" color="text.secondary">{formatTimestamp(comment.timestamp)}</Typography>
              </CommentBox>
            )) : (
              <Typography variant="body2" color="text.secondary">No feedback yet.</Typography>
            )}
            <Box sx={{ display: 'flex', mt: 2 }}>
              <TextField
                fullWidth
                label="Reply to comment"
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={() => setComment('')}>
                Reply
              </Button>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default PitchCard;
