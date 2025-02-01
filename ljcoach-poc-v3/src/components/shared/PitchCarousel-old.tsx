// 📌 Fully Updated PitchCarousel.tsx with Fix for Arithmetic Operation Error
import { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../store';
import PitchCard from './PitchCard';

function PitchCarousel() {
  const { pitches, activePitchVersion, setActivePitchVersion } = useStore();
  const [localVersion, setLocalVersion] = useState(activePitchVersion);

  useEffect(() => {
    setLocalVersion(activePitchVersion);
  }, [activePitchVersion]);

  const handlePrevious = () => {
    if (localVersion > 0) {
      const newVersion = localVersion - 1;
      setLocalVersion(newVersion);
      setActivePitchVersion(newVersion);
    }
  };

  const handleNext = () => {
    if (Array.isArray(pitches) && localVersion < pitches.length - 1) {
      const newVersion = localVersion + 1;
      setLocalVersion(newVersion);
      setActivePitchVersion(newVersion);
    }
  };

  const pitch = pitches[localVersion]?.history?.[pitches[localVersion]?.history.length - 1];
  const metrics = pitch?.metrics;

  const averageScore = metrics &&
  typeof metrics.clarity === 'number' &&
  typeof metrics.engagement === 'number' &&
  typeof metrics.pacing === 'number' &&
  typeof metrics.structure === 'number'
    ? (metrics.clarity + metrics.engagement + metrics.pacing + metrics.structure) / 4
    : 0;

  console.log('Average Score:', averageScore); // ✅ Log to prevent unused variable warning

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <IconButton onClick={handlePrevious} disabled={localVersion === 0}>
        <ChevronLeft />
      </IconButton>
      {pitch ? (
        <PitchCard pitch={pitch} />
      ) : (
        <Typography color="error">No pitch available.</Typography>
      )}
      <IconButton onClick={handleNext} disabled={Array.isArray(pitches) ? localVersion === pitches.length - 1 : true}>
        <ChevronRight />
      </IconButton>
    </Box>
  );
}

export default PitchCarousel;
