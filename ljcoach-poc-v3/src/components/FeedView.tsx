import { Container } from '@mui/material';
import { Trophy } from 'lucide-react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import useStore from '../store';
import PitchCard from '../components/shared/PitchCard';

function WeeklyCompetition() {
  return (
    <Card elevation={2} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Weekly competition</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
          <Typography variant="body2" color="text.secondary">30 participants</Typography>
          <Typography variant="body2" color="text.secondary">•</Typography>
          <Typography variant="body2" color="text.secondary">3 days left</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Trophy color="gold" size={20} />
            <Typography>Top prize: $500</Typography>
          </Box>
          <Button variant="contained" color="primary">Submit your pitch</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function FeedView() {
  const { pitches } = useStore();

  return (
    <Container maxWidth="xl" sx={{ pt: 8, pb: 36, paddingBottom: 'calc(64px + 2.5rem)'  }}>
      <WeeklyCompetition />
      {Object.values(pitches).map((pitch) => (
        <PitchCard 
          key={pitch.id} 
          pitch={{
            id: pitch.id,
            version: pitch.history[0]?.version || '1.0',
            title: pitch.title,
            description: pitch.description,
            playbackId: pitch.playbackId,
            transcript: pitch.transcript || '',
            metrics: {
              clarity: pitch.metrics?.clarity || 0,
              engagement: pitch.metrics?.engagement || 0,
              pacing: pitch.metrics?.pacing || 0,
              structure: pitch.metrics?.structure || 0
            },
            aiCoachSummary: pitch.aiCoachSummary || 'No summary available',
            feedback: pitch.feedback || []
          }}
        />
      ))}
    </Container>
  );
}

export default FeedView;