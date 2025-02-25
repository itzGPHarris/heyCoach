/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Dialog, Grid, useMediaQuery, useTheme,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Stack,
  Slide
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import useStore from '../../store';
import { Competition } from './types';
import CompetitionCard from './CompetitionCard';
import CompetitionPreview from './CompetitionPreview';
import SubmissionForm from './SubmissionForm';
import SubmissionDashboard from './SubmissionDashboard';
import ModernSubmissionForm from './ModernSubmissionForm';

import { width } from '@mui/system';

// Slide transition for dialogs
const SlideTransition = React.forwardRef((props: any, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));

interface CompetitionHubProps {
  open: boolean;
  onClose: () => void;
  onClick?: (competition: Competition) => void;
  onView?: (competition: Competition) => void;
  onSubmitPitch?: (competition: Competition) => void;
  onViewLeaderboard?: (id: string) => void;
}



const CompetitionHub: React.FC<CompetitionHubProps> = ({
  open,
  onClose,
  onClick,
  onView,
  onSubmitPitch,
  onViewLeaderboard

}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // Local state to manage views
  const [viewState, setViewState] = useState<'list' | 'preview' | 'submit'>('list');
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  
  // Access any store state/actions if needed
  const { setSubmissionDashboardOpen } = useStore();

  // Sample competitions data
  const competitions = [
    {
      id: '1',
      title: 'Startup Pitch Competition',
      description: 'Submit your startup pitch for a chance to win funding and mentorship',
      startDate: '2024-03-01',
      endDate: '2024-04-01',
      status: 'ongoing' as 'upcoming' | 'active' | 'ended' | 'ongoing',
      organizerName: 'Techstars',
      organizerId: 'org-123',
      dates: {
        start: 'March 1, 2024',
        end: 'April 1, 2024',
        submissionDeadline: 'March 25, 2024'
      },
      prizes: {
        grandPrize: '$50,000 Investment and Mentorship',
        firstPlace: '$25,000 Investment',
        runnerUp: '$10,000 Investment',
        otherPrizes: ['Mentorship Opportunities', 'Networking Event Access'],
      },
      rules: [
        'All submissions must be original',
        'Entries must be submitted before the deadline',
        'Teams must have at least one founder present during judging'
      ],
      maxTeamSize: 5,
      eligibility: ['Open to startups less than 3 years old']
    },
    {
      id: '2',
      title: 'AI Innovation Challenge',
      description: 'Showcase your AI solutions for real-world problems',
      startDate: '2024-04-15',
      endDate: '2024-05-15',
      status: 'upcoming' as 'upcoming' | 'active' | 'ended' | 'ongoing',
      organizerName: 'AI Alliance',
      organizerId: 'org-456',
      dates: {
        start: 'April 15, 2024',
        end: 'May 15, 2024',
        submissionDeadline: 'May 10, 2024'
      },
      prizes: {
        grandPrize: '$75,000 Investment',
        firstPlace: '$40,000 Investment',
        runnerUp: '$15,000 Investment',
        otherPrizes: ['AI Computing Credits', 'Expert Mentorship'],
      },
      rules: [
        'Solutions must use AI/ML technologies',
        'Open source contributions are encouraged',
        'Demo video required with submission'
      ],
      maxTeamSize: 4,
      eligibility: ['Open to all']
    }
  ];

  // Handle clicking on a competition card
  const handleCompetitionClick = (competition: Competition) => {
    setSelectedCompetition(competition);
    setViewState('preview');
  };

  // Handle submitting a pitch
  const handleSubmitPitch = (competition: Competition) => {
    setSelectedCompetition(competition);
    setViewState('submit');
  };

  // Handle viewing leaderboard
  const handleViewLeaderboard = (id: string) => {
    console.log('View leaderboard for competition:', id);
    // Implement leaderboard view logic
  };

  // Handle back button
  const handleBack = () => {
    if (viewState === 'preview') {
      setViewState('list');
    } else if (viewState === 'submit') {
      setViewState('preview');
    }
  };

  // Handle closing ModernSubmissionForm
  const handleFormClose = () => {
    setViewState('preview');
  };

  // Handle successful submission
  const handleSubmit = async (data: any) => {
    console.log('Submission data:', data);
    
    // Close the form and show success view
    setViewState('list');
    
    // Open submission dashboard
    setTimeout(() => {
      onClose();
      setSubmissionDashboardOpen(true);
    }, 500);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '95vh',
          maxHeight: '95vh', ml:2, mr:2
        }
      }}
    >
      {viewState === 'list' && (
        <>
        <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Competition Dashboard</Typography>
                  <IconButton size="small" onClick={onClose}>
                      <CloseIcon />
                    </IconButton>
                </Box>
              </DialogTitle>
          <DialogContent>
            <Typography variant="h5" gutterBottom>
              Competitions
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Join these pitch competitions to showcase your ideas and win prizes
            </Typography>
            
            <Grid container spacing={3}>
              {competitions.map((competition) => (
                <Grid item xs={12} sm={6} key={competition.id}>
                  <CompetitionCard
                    competition={competition}
                    onClick={() => handleCompetitionClick(competition)}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        </>
      )}
      
      {viewState === 'preview' && selectedCompetition && (
        <CompetitionPreview
          competition={selectedCompetition}
          onBack={handleBack}
          onClose={onClose}
          onSubmitPitch={handleSubmitPitch}
          onViewLeaderboard={handleViewLeaderboard}
        />
      )}
      
      {viewState === 'submit' && selectedCompetition && (
        <ModernSubmissionForm
          open={true}
          competition={selectedCompetition}
          onBack={handleBack}
          onClose={handleFormClose}
          onSubmit={handleSubmit}
        />
      )}
    </Dialog>
  );
};

export default CompetitionHub;
