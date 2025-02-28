// src/components/Competitions/CompetitionDialogs.tsx
import React, { useState } from 'react';
import CompetitionHub from './CompetitionHub';
import SubmissionDashboard from './SubmissionDashboard';
import SubmissionForm from './SubmissionForm';
import { Competition, SubmissionData } from './types';

interface CompetitionDialogsProps {
  open: boolean;
  onClose: () => void;
}

const CompetitionDialogs: React.FC<CompetitionDialogsProps> = ({
  open,
  onClose
}) => {
  // State management
  const [showSubmissionDashboard, setShowSubmissionDashboard] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  // Handler functions
  const handleViewCompetition = (competition: Competition) => {
    setSelectedCompetition(competition);
    // Additional logic if needed
  };

  const handleSubmitPitch = (competition: Competition) => {
    setSelectedCompetition(competition);
    setShowSubmissionForm(true);
  };


  const handleBackFromSubmissions = () => {
    setShowSubmissionDashboard(false);
  };

  // Conditionally render based on states
  const renderContent = () => {
    if (open) {
      return (
        <CompetitionHub
          open={open}
          onClose={onClose}
          onView={handleViewCompetition}
          onSubmitPitch={handleSubmitPitch}
          onViewLeaderboard={(id) => console.log("View leaderboard for:", id)}
        />
      );
    }

    if (showSubmissionDashboard) {
      return (
        <SubmissionDashboard
          open={showSubmissionDashboard}
          onClose={() => setShowSubmissionDashboard(false)}
          onCreateNew={() => setShowSubmissionForm(true)}
          onBack={handleBackFromSubmissions}
          submissionDashboardOpen={showSubmissionDashboard}
          setSubmissionDashboardOpen={setShowSubmissionDashboard}
        />
      );
    }

    if (showSubmissionForm && selectedCompetition) {
      return (
        <SubmissionForm
          competition={selectedCompetition}
          onBack={() => setShowSubmissionForm(false)}
          onClose={() => {
            setShowSubmissionForm(false);
            setSelectedCompetition(null);
          } }
          onSubmit={async (data: SubmissionData) => {
            console.log('Submitting:', data);
            setShowSubmissionForm(false);
            setSelectedCompetition(null);
            // Show submission dashboard after successful submission
            setShowSubmissionDashboard(true);
          } }
          onViewSubmissions={() => {
            setShowSubmissionForm(false);
            setShowSubmissionDashboard(true);
          } } existingSubmission={null} open={false}        />
      );
    }

    return null;
  };

  return renderContent();
};

export default CompetitionDialogs;