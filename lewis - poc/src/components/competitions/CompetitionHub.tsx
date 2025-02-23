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
  // Dialog states
  const [previewCompetition, setPreviewCompetition] = useState<Competition | null>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

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
    // Add more competitions as needed
  ];

  // Handlers
  const handleViewCompetition = (competition: Competition) => {
    setPreviewCompetition(competition);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmitPitch = (competition: Competition) => {
    setShowSubmissionForm(true);
  };

  const handleViewLeaderboard = (competitionId: string) => {
    console.log('Viewing leaderboard for:', competitionId);
    // Implement leaderboard view
  };

  const handleBackFromPreview = () => {
    setPreviewCompetition(null);
  };

  const handleBackFromSubmission = () => {
    setShowSubmissionForm(false);
  };

  const handleCloseAll = () => {
    setPreviewCompetition(null);
    setShowSubmissionForm(false);
    onClose();
  };

  return (
    <>
      {/* Main Competition Hub Dialog */}
      <Dialog
        open={open && !previewCompetition && !showSubmissionForm}
        onClose={onClose}
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
        open={!!previewCompetition && !showSubmissionForm}
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
          <CompetitionPreview
            competition={previewCompetition}
            onBack={handleBackFromPreview}
            onClose={handleCloseAll}
            onSubmitPitch={handleSubmitPitch}
            onViewLeaderboard={handleViewLeaderboard} onEnterCompetition={function (id: string): void {
              throw new Error('Function not implemented.');
            } }          />
        )}
      </Dialog>

      {/* Submission Form Dialog */}
      <Dialog
        open={showSubmissionForm}
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
            onSubmit={async (submission) => {
              console.log('Submitting:', submission);
              handleCloseAll();
            }}
            onViewSubmissions={() => {
              console.log('Viewing submissions');
              // Implement view submissions logic
            }}
          />
        )}
      </Dialog>
    </>
  );
};

export default CompetitionHub;