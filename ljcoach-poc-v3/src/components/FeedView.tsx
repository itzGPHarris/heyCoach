// 📌 Updated FeedView.tsx with Full PitchCard Features and Expandable Sections

import { Container } from '@mui/material';

import TranscriptSection from '../components/shared/TranscriptSection';
import ChatInput from '../components/shared/ChatInput';
import { useState } from 'react';
import { Card, CardContent, CardHeader, Collapse, Typography, Grid, Box, IconButton } from '@mui/material';
import { ChevronRight, ChevronDown, BarChart2, MessageSquare, Clock, Star, ThumbsUp } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react';

const formatTimestamp = (timestamp: string) => {
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

const mockCompetition = {
  id: 'weekly-challenge',
  title: 'Weekly Pitch Challenge',
  description: 'Submit your best pitch and compete with others for the top spot!',
  prize: '$500 Prize',
  deadline: formatTimestamp(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()),
  status: 'Open for Submissions'
};

const mockLeaders = Array.from({ length: 10 }, (_, index) => ({
  name: `Leader ${index + 1}`,
  submissionName: `Submission ${index + 1}`,
  points: Math.floor(Math.random() * 1000),
  thumbnail: "https://via.placeholder.com/150",
  rank: index + 1,
}));

const mockPitch = {
  id: 'test-pitch-1',
  title: 'Sample Pitch',
  description: 'This is a test pitch to debug rendering issues.',
  playbackId: 'YYtQ34SRyksieH026qohfbOhBNd02LQAK3Fgt8wk5J8tM',
  score: 85,
  metrics: {
    clarity: 80,
    engagement: 75,
    pacing: 78,
    structure: 82,
  },
  aiCoachSummary: 'Your pitch has a strong foundation but could use better pacing.',
  likes: 10,
  comments: [],
  transcript: 'This is a sample transcript.',
  timestamp: formatTimestamp(new Date().toISOString()),
  history: [],
  feedback: [
    {
      userId: 'user1',
      author: 'Coach Harper',
      role: 'AI Coach',
      text: 'Consider improving your pitch pacing for better engagement.',
      timestamp: formatTimestamp(new Date().toISOString()),
    }
  ],
};

const MetricBox = ({ label, value }: { label: string; value: number }) => (
  <Grid item xs={3} sx={{ textAlign: 'center' }}>
    <Typography variant="h4" color="primary" sx={{ mb: 0.5 }}>{value}%</Typography>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
  </Grid>
);

function FeedView() {
  const [expanded, setExpanded] = useState(false);
  const [feedbackExpanded, setFeedbackExpanded] = useState(false);

  return (
    
    <Container maxWidth="xl" sx={{ pt: 8, pb: 36, paddingBottom: 'calc(64px + 2.5rem)' }}>
      
      <Card sx={{ mb: 4 }}>
        <CardHeader title={mockPitch.title} subheader={mockPitch.description} />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <Star size={18} color="gold" />
            <Typography variant="body2">{mockPitch.score}% Score</Typography>
            <ThumbsUp size={18} color="blue" />
            <Typography variant="body2">{mockPitch.likes} Likes</Typography>
            <Clock size={18} color="gray" />
            <Typography variant="body2">{mockPitch.timestamp}</Typography>
          </Box>
          <Box sx={{ mb: 3, borderRadius: 1, overflow: 'hidden' }}>
            <MuxPlayer playbackId={mockPitch.playbackId} metadata={{ video_title: mockPitch.title }} streamType="on-demand" />
          </Box>
          <Box onClick={() => setExpanded(!expanded)} sx={{ cursor: 'pointer', mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <BarChart2 size={20} />
              <Typography variant="h6">Pitch Summary</Typography>
              <IconButton>{expanded ? <ChevronDown /> : <ChevronRight />}</IconButton>
            </Box>
            {!expanded && (
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <MetricBox label="Clarity" value={mockPitch.metrics.clarity} />
                <MetricBox label="Engagement" value={mockPitch.metrics.engagement} />
                <MetricBox label="Pacing" value={mockPitch.metrics.pacing} />
                <MetricBox label="Structure" value={mockPitch.metrics.structure} />
              </Grid>
            )}
          </Box>
          <Collapse in={expanded}>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>AI Coach Summary</Typography>
              <Typography paragraph>{mockPitch.aiCoachSummary}</Typography>
              <TranscriptSection transcript={mockPitch.transcript} />
            </Box>
          </Collapse>
          <Box onClick={() => setFeedbackExpanded(!feedbackExpanded)} sx={{ cursor: 'pointer', mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <MessageSquare size={20} />
              <Typography variant="h6">Feedback & Comments</Typography>
              <IconButton>{feedbackExpanded ? <ChevronDown /> : <ChevronRight />}</IconButton>
            </Box>
          </Box>
          <Collapse in={feedbackExpanded}>
            <Box sx={{ p: 2 }}>
              {mockPitch.feedback.length > 0 ? (
                mockPitch.feedback.map((comment, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">{comment.text}</Typography>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No feedback yet.</Typography>
              )}
              <ChatInput onSubmit={(text: string) => console.log('New comment:', text)} placeholder="Add a comment..." />
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </Container>
  );
}

export default FeedView;

// 🚀 Now includes collapsible sections, metrics, feedback, and transcript handling.
