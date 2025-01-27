import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Card, CardContent, CardHeader, 
  Collapse, Typography, Grid, Box,
  Paper,
  IconButton
} from '@mui/material';
import { ChevronRight, ChevronDown } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react';
import ChatInput from './ChatInput';
import TranscriptSection from './TranscriptSection';

interface Metrics {
  clarity: number;
  engagement: number;
  pacing: number;
  structure: number;
}

interface Pitch {
  id: string;
  version: string;
  title: string;
  description: string;
  playbackId: string;
  metrics: Metrics;
  aiCoachSummary: string;
  transcript: string;
  feedback: Array<{
    author: string;
    role?: string;
    text: string;
    timestamp: string;
  }>;
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  overflow: 'visible'
}));

const MetricBox = ({ label, value }: { label: string; value: number }) => (
  <Grid item xs={3} sx={{ textAlign: 'center' }}>
    <Typography variant="h4" color="primary" sx={{ mb: 0.5 }}>{value}%</Typography>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
  </Grid>
);

const Comment = ({ author, role, text, timestamp }: { 
  author: string; 
  role?: string;
  text: string; 
  timestamp: string 
}) => (
  <Paper variant="outlined" sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Box>
        <Typography variant="subtitle2">{author}</Typography>
        {role && <Typography variant="caption" color="text.secondary">{role}</Typography>}
      </Box>
      <Typography variant="caption" color="text.secondary">{timestamp}</Typography>
    </Box>
    <Typography variant="body2">{text}</Typography>
  </Paper>
);

function PitchCard({ pitch }: { pitch: Pitch }) {
  const [expanded, setExpanded] = useState(false);
  const [feedbackExpanded, setFeedbackExpanded] = useState(true);

  return (
    <StyledCard>
      <CardHeader
        title={`v${pitch.version} - ${pitch.title}`}
        subheader={pitch.description}
      />
      <CardContent>
        <Box sx={{ mb: 3, borderRadius: 1, overflow: 'hidden' }}>
          <MuxPlayer
            playbackId={pitch.playbackId}
            metadata={{ video_title: pitch.title }}
            streamType="on-demand"
          />
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            cursor: 'pointer', 
            mb: 2 
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Typography variant="h6">Pitch Analysis</Typography>
          <IconButton>
            {expanded ? <ChevronDown /> : <ChevronRight />}
          </IconButton>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <MetricBox label="Clarity" value={pitch.metrics.clarity} />
          <MetricBox label="Engagement" value={pitch.metrics.engagement} />
          <MetricBox label="Pacing" value={pitch.metrics.pacing} />
          <MetricBox label="Structure" value={pitch.metrics.structure} />
        </Grid>
        
        <Typography variant="subtitle1" gutterBottom>AI Coach Summary</Typography>
        <Typography paragraph>{pitch.aiCoachSummary}</Typography>

        <Collapse in={expanded}>
          <TranscriptSection transcript={pitch.transcript} />
        </Collapse>

        <Box 
          onClick={() => setFeedbackExpanded(!feedbackExpanded)}
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            cursor: 'pointer', 
            mt: 2 
          }}
        >
          <Typography variant="h6">Feedback</Typography>
          <IconButton>
            {feedbackExpanded ? <ChevronDown /> : <ChevronRight />}
          </IconButton>
        </Box>
        <Collapse in={feedbackExpanded}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            {pitch.feedback.map((comment, index) => (
              <Comment 
                key={index}
                author={comment.author}
                role={comment.role}
                text={comment.text}
                timestamp={comment.timestamp}
              />
            ))}
          </Box>
          <ChatInput 
            onSubmit={(text: string) => {
              console.log('New comment:', text);
              // Handle comment submission logic here
            }}
            placeholder="Add a comment..."
          />
        </Collapse>
      </CardContent>
    </StyledCard>
  );
}

export default PitchCard;