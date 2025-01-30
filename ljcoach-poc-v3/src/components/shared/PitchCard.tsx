import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Card, CardContent, CardHeader, 
  Collapse, Typography, Grid, Box,
  Paper,
  IconButton
} from '@mui/material';
import { ChevronRight, ChevronDown, BarChart2, MessageSquare, Clock, Star, ThumbsUp } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react';
import ChatInput from './ChatInput';
import TranscriptSection from './TranscriptSection';
import { PitchVersion } from '../../store/types';

// ✅ Function to Format Timestamp to 12-Hour PDT Format
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles', // ✅ PDT timezone
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date).replace(',', ' •'); // ✅ Separator for readability
};

// ✅ Function to Generate a Unique Color for Each User
const getUserColor = (userId: string) => {
  const colors = ['#FF5733', '#33A1FF', '#FFC300', '#28A745', '#9B59B6', '#E91E63'];
  const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

// ✅ Styled Components
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

// ✅ Comment Component (Now With Colored Names)
const Comment = ({ author, role, text, timestamp, userId }: { 
  author: string; 
  role?: string;
  text: string; 
  timestamp: string;
  userId: string;
}) => (
  <CommentBox variant="outlined" sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Box>
        {/* ✅ Apply Unique Color */}
        <Typography variant="subtitle2" sx={{ color: getUserColor(userId), fontWeight: 'bold' }}>
          {author}
        </Typography>
        {role && <Typography variant="caption" color="text.secondary">{role}</Typography>}
      </Box>
      <Typography variant="caption" color="text.secondary">{formatTimestamp(timestamp)}</Typography>
    </Box>
    <Typography variant="body2">{text}</Typography>
  </CommentBox>
);

// ✅ Metrics Display Component
const MetricBox = ({ label, value }: { label: string; value: number }) => (
  <Grid item xs={3} sx={{ textAlign: 'center' }}>
    <Typography variant="h4" color="primary" sx={{ mb: 0.5 }}>{value}%</Typography>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
  </Grid>
);

function PitchCard({ pitch }: { pitch: PitchVersion }) {
  const [expanded, setExpanded] = useState(false);
  const [feedbackExpanded, setFeedbackExpanded] = useState(false);

  return (
    <Card sx={{ mb: 4 }}>
      <CardHeader
        title={pitch.title}
        subheader={pitch.description}
      />
      <CardContent>
        {/* ✅ Display Metadata (Now Uses 12-Hour PDT Format) */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Star size={18} color="gold" />
            <Typography variant="body2">{pitch.score}% Score</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThumbsUp size={18} color="blue" />
            <Typography variant="body2">{pitch.likes} Likes</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Clock size={18} color="gray" />
            <Typography variant="body2">{formatTimestamp(pitch.timestamp)}</Typography>
          </Box>
        </Box>

        {/* ✅ MUX Video Player */}
        <Box sx={{ mb: 3, borderRadius: 1, overflow: 'hidden' }}>
          {pitch.playbackId ? (
            <MuxPlayer playbackId={pitch.playbackId} metadata={{ video_title: pitch.title }} streamType="on-demand" />
          ) : (
            <Typography variant="body2" color="error">⚠ Playback ID missing.</Typography>
          )}
        </Box>

        {/* ✅ Interactive Pitch Summary */}
        <InteractiveBox onClick={() => setExpanded(!expanded)} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BarChart2 size={20} />
              <Typography variant="h6">Pitch Summary</Typography>
            </Box>
            <IconButton>{expanded ? <ChevronDown /> : <ChevronRight />}</IconButton>
          </Box>
          {!expanded && (
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <MetricBox label="Clarity" value={pitch.metrics?.clarity || 0} />
              <MetricBox label="Engagement" value={pitch.metrics?.engagement || 0} />
              <MetricBox label="Pacing" value={pitch.metrics?.pacing || 0} />
              <MetricBox label="Structure" value={pitch.metrics?.structure || 0} />
            </Grid>
          )}
        </InteractiveBox>

        <Collapse in={expanded}>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>AI Coach Summary</Typography>
            <Typography paragraph>{pitch.aiCoachSummary || 'No AI feedback yet.'}</Typography>
            <TranscriptSection transcript={pitch.transcript} />
          </Box>
        </Collapse>

        {/* ✅ Feedback Section */}
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
            {pitch.feedback.length > 0 ? (
              pitch.feedback.map((comment, index) => (
                <Comment key={index} userId={comment.userId} author={comment.author} role={comment.role} text={comment.text} timestamp={comment.timestamp} />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">No feedback yet.</Typography>
            )}
            <ChatInput onSubmit={(text: string) => console.log('New comment:', text)} placeholder="Add a comment..." />
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default PitchCard;
