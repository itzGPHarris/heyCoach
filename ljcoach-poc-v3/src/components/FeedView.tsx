import { Container } from '@mui/material';
import { useState } from 'react';

import useStore from '../store';
import PitchCard from '../components/shared/PitchCard';
import WeeklyCompetitionCard from '../components/shared/WeeklyCompetitionCard';

function FeedView() {
  const { pitches } = useStore();
  const [showCompetitionCard, setShowCompetitionCard] = useState(true);

  const handleRemoveCompetitionCard = () => {
    setShowCompetitionCard(false);
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 8, pb: 36, paddingBottom: 'calc(64px + 2.5rem)' }}>
      {showCompetitionCard && (
        <WeeklyCompetitionCard onRemove={handleRemoveCompetitionCard} />
      )}
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
