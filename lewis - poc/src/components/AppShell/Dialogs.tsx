/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Dialog } from '@mui/material';
import useStore from '../../store';
import ProfileView from '../shared/dialogs/ProfileView';
import SettingsDialog from '../shared/dialogs/SettingsDialog';
import PitchVersionsDialog from '../shared/dialogs/PitchVersionsDialog';
import MediaUploadDialog from '../shared/dialogs/MediaUploadDialog';
import CompetitionDialogs from '../competitions/CompetitionDialogs';
import SubmissionDashboard from '../competitions/SubmissionDashboard';
import SubmissionForm from '../competitions/SubmissionForm';

interface DialogsProps {
  dialogStates: {
    submissionDashboard: { isOpen: boolean; setOpen: (open: boolean) => void };
    dashboard: { isOpen: boolean; setOpen: (open: boolean) => void };
    profile: { isOpen: boolean; setOpen: (open: boolean) => void };
    settings: { isOpen: boolean; setOpen: (open: boolean) => void };
    media: { isOpen: boolean; setOpen: (open: boolean) => void };
    competition: { isOpen: boolean; setOpen: (open: boolean) => void };
    versions: { isOpen: boolean; setOpen: (open: boolean) => void };
  };
  onSendVideo: (fileUrl: string, isPortrait: boolean) => void;
}

export const Dialogs: React.FC<DialogsProps> = ({ dialogStates, onSendVideo }) => {
  // Use Zustand store for submission form state
  const { 
    submissionFormOpen, 
    setSubmissionFormOpen 
  } = useStore();

  // Sample competition object
  const sampleCompetition = {
    id: '1',
    title: 'Startup Pitch Competition',
    description: 'Submit your startup pitch for a chance to win funding and mentorship',
    startDate: new Date(),
    endDate: new Date(),
    maxTeamSize: 5,
    minTeamSize: 1,
    categories: ['Technology', 'Healthcare', 'Finance'],
    submissionCount: 10,
    judges: ['John Doe', 'Jane Smith', 'Alex Johnson'],
    prizes: {
      grandPrize: '$50,000 Investment and Mentorship',
      firstPlace: '$25,000 Investment',
      runnerUp: '$10,000 Investment',
      otherPrizes: ['Mentorship Opportunities', 'Networking Event Access'],
    },
    dates: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      submissionDeadline: new Date().toISOString(),
    },
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'past',
    rules: ['All submissions must be original', 'Entries must be submitted before the deadline'],
  };

  return (
    <>
      <SubmissionDashboard 
        open={dialogStates.submissionDashboard.isOpen} 
        onClose={() => dialogStates.submissionDashboard.setOpen(false)} 
        onCreateNew={() => {
          try {
            // Close submission dashboard
            dialogStates.submissionDashboard.setOpen(false);
            
            // Open submission form using Zustand store method
            setSubmissionFormOpen(true);
          } catch (error) {
            console.error('Error in onCreateNew:', error);
          }
        }} 
        onBack={() => dialogStates.submissionDashboard.setOpen(false)} 
        submissionDashboardOpen={dialogStates.submissionDashboard.isOpen} 
        setSubmissionDashboardOpen={dialogStates.submissionDashboard.setOpen} 
      />

      <Dialog
        open={submissionFormOpen}
        onClose={() => setSubmissionFormOpen(false)}
        maxWidth="md"
        fullWidth
        fullScreen
        PaperProps={{
          sx: {
            height: '100%',
            maxHeight: '100%',
            margin: 0,
            borderRadius: 0,
          },
        }}
      >
        <SubmissionForm 
          competition={sampleCompetition}
          onBack={() => {
            setSubmissionFormOpen(false);
            dialogStates.submissionDashboard.setOpen(true);
          }}
          onClose={() => setSubmissionFormOpen(false)}
          onSubmit={async (data) => {
            console.log('Submitting:', data);
            // Implement submission logic
          }}
          onViewSubmissions={() => {
            setSubmissionFormOpen(false);
            dialogStates.submissionDashboard.setOpen(true);
          }}
        />
      </Dialog>

      <ProfileView 
        open={dialogStates.profile.isOpen} 
        onClose={() => dialogStates.profile.setOpen(false)} 
      />
      <SettingsDialog 
        open={dialogStates.settings.isOpen} 
        onClose={() => dialogStates.settings.setOpen(false)} 
      />
      <CompetitionDialogs 
        open={dialogStates.competition.isOpen} 
        onClose={() => dialogStates.competition.setOpen(false)} 
      />
      <PitchVersionsDialog 
        open={dialogStates.versions.isOpen} 
        onClose={() => dialogStates.versions.setOpen(false)} 
      />
      <MediaUploadDialog
        open={dialogStates.media.isOpen}
        onClose={() => dialogStates.media.setOpen(false)}
        onSendVideo={onSendVideo}
        isVersionUpload={false}
      />
    </>
  );
};