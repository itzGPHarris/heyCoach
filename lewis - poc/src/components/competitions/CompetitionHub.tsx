/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Stack,
  Slide
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { Competition } from './types';
import CompetitionCard from './CompetitionCard';
import CompetitionPreview from './CompetitionPreview';
import SubmissionForm from './SubmissionForm';
import SubmissionDashboard from './SubmissionDashboard';
import { width } from '@mui/system';

// Slide transition for dialogs
const SlideTransition = React.forwardRef((props: any, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));

interface CompetitionHubProps {
  open: boolean;
  onClose: () => void;
}

const CompetitionHub: React.FC<CompetitionHubProps> = ({
  open,
  onClose
}) => {
  // State for managing different views
  const [previewCompetition, setPreviewCompetition] = useState<Competition | null>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showSubmissionDashboard, setShowSubmissionDashboard] = useState(false);

  // Sample competitions data
  const competitions = [
    {
      id: '1',
      title: 'Mentor Madness 2024',
      description: 'The most exciting business competition on the Internet!',
      dates: {
        start: 'June 17th, 2024',
        end: 'July 5th, 2024',
        submissionDeadline: 'July 5th, 2024'
      },
      prizes: {
        grandPrize: '$25,000',
        firstPlace: '$15,000',
        runnerUp: '$10,000'
      },
      status: 'ongoing' as const,
      rules: [
        'Submit a 1-3 minute video pitch',
        'Original ideas only',
        'Clear business model required'
      ],
      maxTeamSize: 4
    }
  ];

  // Handler functions
  const handleViewCompetition = (competition: Competition) => {
    setPreviewCompetition(competition);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmitPitch = (competition: Competition) => {
    setShowSubmissionForm(true);
  };

  const handleViewLeaderboard = (competitionId: string) => {
    console.log('Viewing leaderboard for:', competitionId);
  };

  const handleBackFromPreview = () => {
    setPreviewCompetition(null);
  };

  const handleBackFromSubmission = () => {
    setShowSubmissionForm(false);
  };

  const handleBackFromDashboard = () => {
    setShowSubmissionDashboard(false);
    // If we came from submission form, go back there
    if (showSubmissionForm) {
      setShowSubmissionDashboard(false);
    } else {
      // Otherwise go back to main view
      setPreviewCompetition(null);
    }
  };

  const handleViewSubmissions = () => {
    setShowSubmissionDashboard(true);
  };

  const handleSubmissionComplete = async (data: any) => {
    console.log('Submission data:', data);
    // Here you would normally save the submission
    // For now, we'll just simulate success
    return Promise.resolve();
  };

  const handleCloseAll = () => {
    setPreviewCompetition(null);
    setShowSubmissionForm(false);
    setShowSubmissionDashboard(false);
    onClose();
  };

  return (
    <>
      {/* Main Competition Hub Dialog */}
      <Dialog
        open={open && !previewCompetition && !showSubmissionForm && !showSubmissionDashboard}
        onClose={onClose}
        PaperProps={{
          sx: { 
            height: '95vh',
            maxHeight: '98vh',
            maxWidth: '600',
            width: '100%',
            margin: 0,
            borderRadius: 0,
            ml:2, mr:2, mt:2, mb:2  

          }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Competitions
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Stack spacing={3}>
            {competitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                competition={competition}
                onView={handleViewCompetition}
              />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Competition Preview Dialog */}
      <Dialog
        open={!!previewCompetition && !showSubmissionForm && !showSubmissionDashboard}
        TransitionComponent={SlideTransition}
        onClose={handleCloseAll}
        
        PaperProps={{
          sx: { 
            maxWidth:"800px",
            width: '100%',
            height: '95vh',
            maxHeight: '95vh',
            margin: 2,
            borderRadius: 0
          }
        }}
      >
        {previewCompetition && (
          <CompetitionPreview
            competition={previewCompetition}
            onBack={handleBackFromPreview}
            onClose={handleCloseAll}
            onSubmitPitch={handleSubmitPitch}
              onViewLeaderboard={handleViewLeaderboard}
            />
        )}
      </Dialog>

      {/* Submission Form Dialog */}
      <Dialog
        open={showSubmissionForm && !showSubmissionDashboard}
        TransitionComponent={SlideTransition}
        onClose={handleCloseAll}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { 
            height: '100vh',
            maxHeight: '100vh',
            margin: 0,
            borderRadius: 0
          }
        }}
      >
        {previewCompetition && (
          <SubmissionForm
            competition={previewCompetition}
            onBack={handleBackFromSubmission}
            onClose={handleCloseAll}
            onSubmit={handleSubmissionComplete}
            onViewSubmissions={handleViewSubmissions}
          />
        )}
      </Dialog>

      {/* Submission Dashboard Dialog */}
      <Dialog
        open={showSubmissionDashboard}
        TransitionComponent={SlideTransition}
        onClose={handleCloseAll}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { 
            height: '100vh',
            maxHeight: '100vh',
            margin: 0,
            borderRadius: 0
          }
        }}
      >
        <SubmissionDashboard
          open={showSubmissionDashboard}
          onClose={handleCloseAll}
          onBack={handleBackFromDashboard}
          onCreateNew={() => setShowSubmissionForm(true)}
          submissionDashboardOpen={showSubmissionDashboard}
          setSubmissionDashboardOpen={setShowSubmissionDashboard}
        />
      </Dialog>
    </>
  );
};

export default CompetitionHub;