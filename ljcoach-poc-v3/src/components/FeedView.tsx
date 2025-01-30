import { Container } from '@mui/material';
import { useState } from 'react';

import useStore from '../store';
import { Pitch } from '../store/types'; 
import PitchCarousel from '../components/shared/PitchCarousel';
import WeeklyCompetitionCard from '../components/shared/WeeklyCompetitionCard';

function FeedView() {
  const { pitches }: { pitches: Record<string, Pitch> } = useStore();
  const [showCompetitionCard, setShowCompetitionCard] = useState(true);

  const handleRemoveCompetitionCard = () => setShowCompetitionCard(false);

  return (
    <Container 
      maxWidth="xl" 
      sx={{ pt: 8, pb: 36, paddingBottom: 'calc(64px + 2.5rem)' }}
    >
      {showCompetitionCard && (
        <WeeklyCompetitionCard onRemove={handleRemoveCompetitionCard} />
      )}

      {Object.values(pitches).map((pitch) => (
        <PitchCarousel 
          key={pitch.id} 
          pitches={pitch.history.slice(-4)} // ✅ Ensures last 4 versions are passed
        />
      ))}
    </Container>
  );
}

export default FeedView;
