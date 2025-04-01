// CompetitionSubmissionFlow.tsx

import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import SubmissionDashboard from './SubmissionDashboard';
import SubmissionForm from './SubmissionForm';
import SubmissionDetailView from './SubmissionDetailView';
import SubmissionSuccessDialog from './SubmissionSuccessDialog';
import { Competition, Submission, SubmissionData } from './types';

interface CompetitionSubmissionFlowProps {
  competition: Competition;
  existingSubmissions?: Submission[];
  onClose: () => void;
}

const CompetitionSubmissionFlow: React.FC<CompetitionSubmissionFlowProps> = ({
  competition,
  existingSubmissions = [],
  onClose
}) => {
  // View state management
  const [activeView, setActiveView] = useState<'dashboard' | 'form' | 'detail'>('dashboard');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>(existingSubmissions);

  // Form handlers
  const handleCreateNew = () => {
    setSelectedSubmission(null);
    setActiveView('form');
  };

  const handleEditSubmission = (id: string) => {
    const submission = submissions.find(sub => sub.id === id);
    if (submission) {
      setSelectedSubmission(submission);
      setActiveView('form');
    }
  };

  const handleViewSubmission = (id: string) => {
    const submission = submissions.find(sub => sub.id === id);
    if (submission) {
      setSelectedSubmission(submission);
      setActiveView('detail');
    }
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(sub => sub.id !== id));
  };

  const handleSubmit = async (data: SubmissionData): Promise<void> => {
    // Create a new submission or update existing one
    if (selectedSubmission) {
      // Update existing submission
      const updatedSubmissions = submissions.map(sub => 
        sub.id === selectedSubmission.id 
          ? { 
              ...sub, 
              ...data, 
              updatedAt: new Date().toISOString(),
              video: {
                url: data.videoPreview || sub.video.url,
                thumbnailUrl: data.videoPreview || sub.video.thumbnailUrl,
                duration: sub.video.duration
              }
            }
          : sub
      );
      setSubmissions(updatedSubmissions);
    } else {
      // Create new submission
      const newSubmission: Submission = {
        id: Date.now().toString(),
        name: data.title,
        competitionName: competition.title,
        competitionId: competition.id,
        date: new Date().toLocaleDateString(),
        status: 'draft',
        teamSize: data.team.length,
        description: data.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        video: {
          url: data.videoPreview || '',
          thumbnailUrl: data.videoPreview,
          duration: 0 // Would be calculated from the actual video
        },
        documents: [],
        team: data.team
      };
      setSubmissions(prev => [...prev, newSubmission]);
    }
    
    // Show success dialog
    setShowSuccessDialog(true);
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    setActiveView('dashboard');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {activeView === 'dashboard' && (
          <SubmissionDashboard
                      open={true}
                      onClose={onClose}
                      onCreateNew={handleCreateNew}
                      onView={handleViewSubmission}
                      onEdit={handleEditSubmission}
                      onDelete={handleDeleteSubmission}
                      submissions={submissions}
                      competition={competition} onBack={function (): void {
                          throw new Error('Function not implemented.');
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      } } submissionDashboardOpen={false} setSubmissionDashboardOpen={function (open: boolean): void {
                          throw new Error('Function not implemented.');
                      } }          />
        )}

        {activeView === 'form' && (
          <SubmissionForm
            competition={competition}
            existingSubmission={selectedSubmission}
            onBack={() => setActiveView('dashboard')}
            onClose={onClose}
            onSubmit={handleSubmit}
            onViewSubmissions={() => setActiveView('dashboard')}
            open={true}
          />
        )}

        {activeView === 'detail' && selectedSubmission && (
          <SubmissionDetailView
            submission={selectedSubmission}
            onBack={() => setActiveView('dashboard')}
            onClose={onClose}
            onEdit={() => setActiveView('form')}
          />
        )}

        <SubmissionSuccessDialog
          open={showSuccessDialog}
          onClose={handleSuccessDialogClose}
          competitionName={competition.title}
        />
      </Box>
    </Container>
  );
};

export default CompetitionSubmissionFlow;