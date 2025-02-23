// src/components/Competitions/CompetitionDialogs.tsx
import React, { useState } from 'react';
import CompetitionHub from './CompetitionHub';
import SubmissionDashboard from './SubmissionDashboard';
import SubmissionForm from './SubmissionForm';
import { Competition } from './types';

interface CompetitionDialogsProps {
  open: boolean;
  onClose: () => void;
}

const CompetitionDialogs: React.FC<CompetitionDialogsProps> = ({
  open,
  onClose
}) => {
  const [showSubmissionDashboard, setShowSubmissionDashboard] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  const handleCreateSubmission = (competition: Competition) => {
    setSelectedCompetition(competition);
    setShowSubmissionForm(true);
  };

  const handleViewSubmissions = () => {
    setShowSubmissionDashboard(true);
  };

  return (
    <>
      <CompetitionHub
              open={open}
              onClose={onClose}
              onCreateSubmission={handleCreateSubmission}
              onViewSubmissions={handleViewSubmissions} isOpen={false}      />

      <SubmissionDashboard
        open={showSubmissionDashboard}
        onClose={() => setShowSubmissionDashboard(false)}
        onCreateNew={() => setShowSubmissionForm(true)}
      />

      {selectedCompetition && (
        <SubmissionForm
                  open={showSubmissionForm}
                  onClose={() => {
                      setShowSubmissionForm(false);
                      setSelectedCompetition(null);
                  } }
                  competition={selectedCompetition}
                  onSubmit={async (submission) => {
                      // Handle submission
                      console.log('Submitting:', submission);
                      setShowSubmissionForm(false);
                      setSelectedCompetition(null);
                  } }
                  onSaveDraft={async (submission) => {
                      // Handle draft save
                      console.log('Saving draft:', submission);
                      setShowSubmissionForm(false);
                      setSelectedCompetition(null);
                  } } competitionName={''}        />
      )}
    </>
  );
};

export default CompetitionDialogs;