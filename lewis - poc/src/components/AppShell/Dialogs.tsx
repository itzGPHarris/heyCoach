/* eslint-disable @typescript-eslint/prefer-as-const */
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
import CompetitionSubmissionFlow from '../competitions/CompetitionSubmissionFlow';


interface DialogsProps {
  dialogStates: {
    submissionDashboard: { isOpen: boolean; setOpen: (open: boolean) => void };
    dashboard: { isOpen: boolean; setOpen: (open: boolean) => void };
    profile: { isOpen: boolean; setOpen: (open: boolean) => void };
    settings: { isOpen: boolean; setOpen: (open: boolean) => void };
    media: { isOpen: boolean; setOpen: (open: boolean) => void };
    competition: { isOpen: boolean; setOpen: (open: boolean) => void };
    versions: { isOpen: boolean; setOpen: (open: boolean) => void };
    // Add these if needed for submissionDetail and submissionSuccess
    submissionDetail?: { isOpen: boolean; setOpen: (open: boolean) => void };
    submissionSuccess?: { isOpen: boolean; setOpen: (open: boolean) => void };
  };
  onSendVideo: (fileUrl: string, isPortrait: boolean) => void;
  // Remove any Competition-related properties that shouldn't be here
}


export const Dialogs: React.FC<DialogsProps> = ({ dialogStates, onSendVideo }) => {
  // Use Zustand store
  const { 
    submissionFormOpen, 
    setSubmissionFormOpen,
    selectedSubmission,
    setSelectedSubmission
  } = useStore();

  // Sample competition object
  const sampleCompetition = {
    id: '1',
    title: 'Startup Pitch Competition',
    description: 'Submit your startup pitch for a chance to win funding and mentorship',
    startDate: '2024-03-01',
    endDate: '2024-04-01',
    status: 'ongoing' as 'upcoming' | 'ongoing' | 'past',
    organizerName: 'Techstars',
    organizerId: 'org-123',
    
    // Add the missing properties
    dates: {
      start: '2024-03-01',
      end: '2024-04-01',
      submissionDeadline: '2024-03-25'
    },
    prizes: {
      grandPrize: '$50,000 Investment and Mentorship',
      firstPlace: '$25,000 Investment',
      runnerUp: '$10,000 Investment',
      otherPrizes: ['Mentorship Program', 'Office Space for 6 months']
    },
    rules: [
      'All submissions must be original',
      'Entries must be submitted before the deadline'
    ]
  };
  

  // Sample submissions
  const sampleSubmissions = [
    {
      id: '1',
      name: 'Radiant Hue Pitch',
      competitionId: '1',
      competitionName: 'Mentor Madness 2024',
      description: 'Radiant Hue is a makeup brand that changes the narrative. We\'re dedicated to providing clean beauty products.',
      date: '2024-03-24',
      status: 'submitted' as 'submitted',
      teamSize: 4,
      createdAt: '2024-03-20T12:00:00Z',
      updatedAt: '2024-03-24T10:00:00Z',
      video: {
        url: 'https://example.com/videos/radiant-hue.mp4',
        thumbnailUrl: '/path/to/thumbnail.jpg',
        duration: 120
      },
      documents: [],
      team: [
        { id: 't1', name: 'Harper Lewis', role: 'Founder', email: 'harper@radianthue.com' },
        { id: 't2', name: 'Alex Johnson', role: 'CTO', email: 'alex@radianthue.com' }
      ]
    },
    {
      id: '2',
      name: 'Product Demo v2',
      competitionId: '1',
      competitionName: 'Startup Weekend',
      description: 'Updated demo of our product featuring the latest improvements and user feedback.',
      date: 'Feb 15, 2024',
      status: 'draft' as 'draft',
      teamSize: 3,
      createdAt: '2024-02-10T15:30:00Z',
      updatedAt: '2024-02-15T09:45:00Z',
      video: {
        url: 'https://example.com/videos/product-demo-v2.mp4',
        thumbnailUrl: '/path/to/thumbnail2.jpg',
        duration: 180
      },
      documents: [],
      team: [
        { id: 't5', name: 'Jamie Wilson', role: 'CEO', email: 'jamie@example.com' },
        { id: 't6', name: 'Casey White', role: 'Developer', email: 'casey@example.com' }
      ]
    }
  ];
  

  return (
    <>
      {/* Use the CompetitionSubmissionFlow to handle all submission-related views */}
      <Dialog
        open={dialogStates.submissionDashboard.isOpen}
        onClose={() => dialogStates.submissionDashboard.setOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { 
            height: '95vh',
            maxHeight: '95vh',
            margin: 2,
            borderRadius: 2,
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }        
        }}
      >
        <CompetitionSubmissionFlow
          competition={sampleCompetition}
          existingSubmissions={sampleSubmissions}
          onClose={() => dialogStates.submissionDashboard.setOpen(false)}
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
