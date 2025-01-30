import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PitchCard from './PitchCard';
import { PitchVersion } from '../../store/types'; 

interface PitchCarouselProps {
  pitches: PitchVersion[];
}

function PitchCarousel({ pitches }: PitchCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(pitches.length - 1); // ✅ Start at latest version

  const handleNext = () => {
    if (currentIndex < pitches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', mb: 4 }}>
      {/* ✅ Navigation Arrows */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 2 
        }}
      >
        <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
          <ChevronLeft size={32} />
        </IconButton>

        <Typography variant="h6">
          Version {pitches[currentIndex].version}
        </Typography>

        <IconButton onClick={handleNext} disabled={currentIndex === pitches.length - 1}>
          <ChevronRight size={32} />
        </IconButton>
      </Box>

      {/* ✅ Displays the Current Pitch Version */}
      <PitchCard pitch={pitches[currentIndex]} />
    </Box>
  );
}

export default PitchCarousel;
