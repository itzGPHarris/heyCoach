/* eslint-disable @typescript-eslint/no-unused-vars */
// src/features/dialogs/DialogContainer.tsx
import React from 'react';
import { Dialog } from '@mui/material';
import DetailedAnalysisDialog from '../../../components/shared/dialogs/DetailedAnalysisDialog';
import ImprovementsDialog from '../../../components/shared/dialogs/ImprovementsDialog';
import TeamFeedbackDialog from '../../../components/shared/dialogs/TeamFeedbackDialog';
import CompetitionHub from '../../../components/competitions/CompetitionHub';
import PitchVersionsDialog from '../../../components/shared/dialogs/PitchVersionsDialog';
import ProfileView from '../../../components/shared/dialogs/ProfileView';
import MediaUploadDialog from '../../../components/shared/dialogs/MediaUploadDialog';
import { DialogStates } from './DialogManager';
import useStore from '../../../store';

// Import new competition submission components
import EnhancedSubmissionCard from '../../../components/competitions/EnhancedSubmissionCard';
import SubmissionDetailView from '../../../components/competitions/SubmissionDetailView';
import SubmissionSuccessDialog from '../../../components/competitions/SubmissionSuccessDialog';
import ModernSubmissionForm from '../../../components/competitions/ModernSubmissionForm';
import SubmissionDashboard from '../../../components/competitions/SubmissionDashboard';

interface DialogContainerProps {
  dialogStates: DialogStates;
  onSendVideo: (fileUrl: string, isPortrait: boolean) => void;
}

export const DialogContainer: React.FC<DialogContainerProps> = ({
  dialogStates,
  onSendVideo
}) => {
  // Access Zustand store for additional state
  const { 
    selectedSubmission = undefined,
    setSelectedSubmission,
    submissionFormOpen,
    setSubmissionFormOpen
  } = useStore();

  // Sample competition object - In a real app, this would come from your data store
  const sampleCompetition = {
    id: '1',
    title: 'Startup Pitch Competition',
    description: 'Submit your startup pitch for a chance to win funding and mentorship',
    startDate: '2024-03-01',
    endDate: '2024-04-01',
    status: 'ongoing' as 'upcoming' | 'ongoing' | 'past',
    organizerName: 'Techstars',
    organizerId: 'org-123',
    dates: {
      registrationStart: '2024-01-01',
      registrationEnd: '2024-02-28',
      competitionStart: '2024-03-01',
      competitionEnd: '2024-04-01',
      start: '2024-03-01',
      end: '2024-04-01',
      submissionDeadline: '2024-02-28'
    },
    prizes: {
      grandPrize: 'First place prize',
      firstPlace: 'Second place prize',
      runnerUp: 'Third place prize',
      otherPrizes: [
        'Fourth place prize',
        'Fifth place prize'
      ]
    },
    rules: 'Submit your pitch by the deadline. Follow the guidelines provided on the competition page.'
  };

  return (
    <>
      <DetailedAnalysisDialog
        open={dialogStates.analysis.isOpen}
        onClose={() => dialogStates.analysis.setOpen(false)}
      />
      <ImprovementsDialog
        open={dialogStates.improvements.isOpen}
        onClose={() => dialogStates.improvements.setOpen(false)}
        improvementsText=""
      />
      <TeamFeedbackDialog
        open={dialogStates.teamFeedback.isOpen}
        onClose={() => dialogStates.teamFeedback.setOpen(false)}
      />
      <CompetitionHub
        open={dialogStates.competitionHub.isOpen}
        onClose={() => dialogStates.competitionHub.setOpen(false)}
      />
      <PitchVersionsDialog
        open={dialogStates.versions.isOpen}
        onClose={() => dialogStates.versions.setOpen(false)}
      />
      
      {/* Updated Submission Dashboard */}
      <SubmissionDashboard 
        open={dialogStates.submissionDashboard.isOpen}
        onClose={() => dialogStates.submissionDashboard.setOpen(false)}
        onCreateNew={() => {
          // Close submission dashboard
          dialogStates.submissionDashboard.setOpen(false);

          // Open submission form using Zustand store method
          setSubmissionFormOpen(true);
        } }
        onView={(id) => {
          // Find the submission by id (mock implementation)
          const foundSubmission = mockSubmissions.find(sub => sub.id === id);
          if (foundSubmission) {
            // Set the selected submission
            setSelectedSubmission(foundSubmission);

            // Open the detail view
            dialogStates.submissionDetail.setOpen(true);

            // Close the dashboard
            dialogStates.submissionDashboard.setOpen(false);
          }
        } }
        onEdit={(id) => {
          // Find the submission by id (mock implementation)
          const foundSubmission = mockSubmissions.find(sub => sub.id === id);
          if (foundSubmission) {
            // Set the selected submission
            setSelectedSubmission(foundSubmission);

            // Close submission dashboard
            dialogStates.submissionDashboard.setOpen(false);

            // Open submission form using Zustand store method
            setSubmissionFormOpen(true);
          }
        } }
        onDelete={(id) => {
          console.log('Delete submission:', id);
          // Implement delete logic
        } }
        submissions={mockSubmissions}
        competition={sampleCompetition} onBack={function (): void {
          throw new Error('Function not implemented.');
        } } submissionDashboardOpen={false} setSubmissionDashboardOpen={function (open: boolean): void {
          throw new Error('Function not implemented.');
        } }      />
      
      {/* Updated Submission Form */}
      <Dialog
        open={submissionFormOpen}
        onClose={() => setSubmissionFormOpen(false)}
        maxWidth="md"
        fullWidth
        fullScreen
        PaperProps={{
          sx: { 
            maxWidth:"800px",
            width: '100%',
            height: '95vh',
            maxHeight: '95vh',
            margin: 2,
            borderRadius: 2
          }
        }}
      >
        <ModernSubmissionForm 
          open={submissionFormOpen}
          competition={sampleCompetition}
          existingSubmission={selectedSubmission || undefined}
          onBack={() => {
            setSubmissionFormOpen(false);
            dialogStates.submissionDashboard.setOpen(true);
          }}
          onClose={() => setSubmissionFormOpen(false)}
          onSubmit={async (data) => {
            console.log('Submitting:', data);
            
            // Close the form
            setSubmissionFormOpen(false);
            
            // Show success dialog
            dialogStates.submissionSuccess.setOpen(true);
          }}
        />
      </Dialog>
      
      {/* Submission Detail View */}
      {selectedSubmission && dialogStates.submissionDetail.isOpen && (
        <SubmissionDetailView
          submission={selectedSubmission}
          onBack={() => {
            dialogStates.submissionDetail.setOpen(false);
            dialogStates.submissionDashboard.setOpen(true);
          }}
          onClose={() => dialogStates.submissionDetail.setOpen(false)}
          onEdit={() => {
            dialogStates.submissionDetail.setOpen(false);
            setSubmissionFormOpen(true);
          }}
        />
      )}
      
      {/* Submission Success Dialog */}
      <SubmissionSuccessDialog
        open={dialogStates.submissionSuccess.isOpen}
        onClose={() => {
          dialogStates.submissionSuccess.setOpen(false);
          dialogStates.submissionDashboard.setOpen(true);
        }}
        competitionName={sampleCompetition.title}
      />
   
      <ProfileView
        open={dialogStates.profile.isOpen}
        onClose={() => dialogStates.profile.setOpen(false)}
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

// Mock submissions for demo
const mockSubmissions = [
  {
    id: '1',
    name: 'Radiant Hue Pitch',
    competitionId: '1',
    competitionName: 'Mentor Madness 2024',
    description: 'Radiant Hue is a makeup brand that changes the narrative. We are dedicated to providing clean beauty products.',
    date: '2024-03-24',
    status: 'submitted' as 'submitted' | 'draft' | 'accepted' | 'rejected',
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
      { id: 't2', name: 'Alex Johnson', role: 'CTO', email: 'alex@radianthue.com' },
      { id: 't3', name: 'Jordan Smith', role: 'Marketing', email: 'jordan@radianthue.com' },
      { id: 't4', name: 'Taylor Brown', role: 'Design', email: 'taylor@radianthue.com' }
    ]
  },
  {
    id: '2',
    name: 'Product Demo v2',
    competitionId: '1',
    competitionName: 'Startup Weekend',
    description: 'Updated demo of our product featuring the latest improvements and user feedback.',
    date: '2024-02-15',
    status: 'draft' as 'submitted' | 'draft' | 'accepted' | 'rejected',
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
      { id: 't6', name: 'Casey White', role: 'Developer', email: 'casey@example.com' },
      { id: 't7', name: 'Riley Green', role: 'UX Designer', email: 'riley@example.com' }
    ]
  }
];

export default DialogContainer;