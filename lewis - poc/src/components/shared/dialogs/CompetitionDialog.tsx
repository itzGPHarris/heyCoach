import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  Box,
  styled, IconButton
  
} from "@mui/material";
import PitchSelector from './PitchSelector';
import CompetitionCard from './CompetitionCard';
import FeaturedCompetition from './FeaturedCompetition';
import { VIDEO_THUMBNAILS } from '../../../utils/mediaResources';
import { X } from "lucide-react";

interface CompetitionDialogProps {
  open: boolean;
  onClose: () => void;
}
const thumbnailUrl1 = VIDEO_THUMBNAILS.HARPER_PITCH_1;
const thumbnailUrl2 = VIDEO_THUMBNAILS.HARPER_PITCH_2;
const thumbnailUrl3 = VIDEO_THUMBNAILS.HARPER_PITCH_3;

// Styled components for custom dialog layout
const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '80vh',
  '&::-webkit-scrollbar': {
    width: '0.4em'
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.paper
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider
  }
}));

const ScrollableContent = styled(Box)({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '0 16px'
});

const CompetitionDialog: React.FC<CompetitionDialogProps> = ({ open, onClose }) => {
  const [selectedPitchId, setSelectedPitchId] = useState('');

  // Sample data - would come from props or API in real implementation
  const pitches = [
    {
      id: '1',
      title: 'Main Pitch v2',
      thumbnailUrl: thumbnailUrl1,
      duration: '2:45',
      lastModified: '2025-02-15',
      isReady: true,
      isFavorite: true,
      coachRecommended: true,
      previousCompetition: {
        name: 'TechStars Demo Day 2024',
        place: 'third'
      }
    },
    {
      id: '2',
      title: 'Technical Deep Dive',
      thumbnailUrl: thumbnailUrl2,
      duration: '3:20',
      lastModified: '2025-02-14',
      isReady: false,
      isFavorite: false,
      coachRecommended: false,
      previousCompetition: {
        name: 'TechStars Demo Day 2022',
        place: 'HM'
      }    },
  { id: '3', title: 'Product Roadmap', thumbnailUrl: thumbnailUrl3, duration: '4:10', lastModified: '2025-02-10', isReady: false, isFavorite: false } 
  ];

  const activeCompetitions = [
    {
      id: '1',
      name: 'TechStars Demo Day',
      type: 'Best Startup',
      grandPrize: '$50,000',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      detailsUrl: '#',
      competitors: Array(5).fill(null).map((_, i) => ({
        id: String(i),
        name: `Competitor ${i + 1}`,
        avatarUrl: '/api/placeholder/32/32'
      }))
    },
    {
      id: '2',
      name: 'Climate Tech Challenge',
      type: 'Improved the Planet',
      grandPrize: '$25,000',
      startDate: '2025-03-10',
      endDate: '2025-04-10',
      detailsUrl: '#',
      isSponsored: true,
      sponsorName: 'GreenTech Ventures',
      sponsorUrl: '#',
      competitors: Array(3).fill(null).map((_, i) => ({
        id: String(i),
        name: `Competitor ${i + 1}`,
        avatarUrl: '/api/placeholder/32/32'
      }))
    }
  ];

  const featuredCompetition = {
    id: 'featured',
    name: 'Global Impact Challenge 2025',
    description: 'Showcase your innovative solutions for environmental challenges. This premier competition brings together the brightest minds in sustainability and technology.',
    logoUrl: '/api/placeholder/100/100',
    welcomeVideoUrl: 'https://example.com/video',
    sponsorName: 'EcoTech Ventures',
    sponsorUrl: '#',
    leaderboard: [
      { rank: 1, name: 'Team Alpha', score: 95 },
      { rank: 2, name: 'Team Beta', score: 92 },
      { rank: 3, name: 'Team Gamma', score: 88 },
      { rank: 4, name: 'Team Delta', score: 85 },
      { rank: 5, name: 'Team Epsilon', score: 82 }
    ]
  };

  const handleCompetitionEnter = (competitionId: string) => {
    if (!selectedPitchId) {
      // Show error or prompt to select pitch
      return;
    }
    // Handle competition entry
    console.log(`Entering competition ${competitionId} with pitch ${selectedPitchId}`);
  };

  const handlePitchSubmit = (competitionId: string) => {
    if (!selectedPitchId) {
      // Show error or prompt to select pitch
      return;
    }
    // Handle pitch submission
    console.log(`Submitting pitch ${selectedPitchId} to competition ${competitionId}`);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h2" component="div">
          Competition Hub
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter competitions and showcase your pitch and win prizes!
        </Typography>
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <StyledDialogContent dividers>
        <ScrollableContent>
          {/* Pitch Selection */}
          <Box sx={{mb: 3, px: 1}}>
            <PitchSelector
              pitches={pitches}
              selectedPitchId={selectedPitchId}
              onPitchSelect={setSelectedPitchId}
            />
          </Box>

          {/* Featured Competition */}
          <Box sx={{mb: 3, px: 4}}>
            <FeaturedCompetition
              {...featuredCompetition}
              onSubmit={handlePitchSubmit}
              disabled={!selectedPitchId}
            />
          </Box>

          {/* Active Competitions */}
          <Box sx={{mb: 3, px: 4 }}>
            <Typography variant="h6" gutterBottom>
              Active Competitions
            </Typography>
            {activeCompetitions.map(competition => (
              <CompetitionCard
                key={competition.id}
                {...competition}
                onEnter={handleCompetitionEnter}
                disabled={!selectedPitchId}
              />
            ))}
          </Box>
        </ScrollableContent>
      </StyledDialogContent>

      <DialogActions sx={{ borderTop: 1, borderColor: 'divider', px: 3, py: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
          Sign in as a Owner or Admin to manage competitions
        </Typography>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompetitionDialog;