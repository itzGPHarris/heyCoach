/* eslint-disable @typescript-eslint/no-unused-vars */
// src/features/dialogs/DialogContainer.tsx
import React from 'react';
import DetailedAnalysisDialog from '../../../components/shared/dialogs/DetailedAnalysisDialog';
import ImprovementsDialog from '../../../components/shared/dialogs/ImprovementsDialog';
import TeamFeedbackDialog from '../../../components/shared/dialogs/TeamFeedbackDialog';
import CompetitionHub from '../../../components/competitions/CompetitionHub';
import PitchVersionsDialog from '../../../components/shared/dialogs/PitchVersionsDialog';
import SubmissionDashboard from '../../../components/competitions/SubmissionDashboard';
import ProfileView from '../../../components/shared/dialogs/ProfileView';
import MediaUploadDialog from '../../../components/shared/dialogs/MediaUploadDialog';
import { DialogStates } from './DialogManager';

interface DialogContainerProps {
  dialogStates: DialogStates;
  onSendVideo: (fileUrl: string, isPortrait: boolean) => void;
}

export const DialogContainer: React.FC<DialogContainerProps> = ({
  dialogStates,
  onSendVideo
}) => {
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
          <SubmissionDashboard 
        open={dialogStates.submissionDashboard.isOpen}
        onClose={() => dialogStates.submissionDashboard.setOpen(false)}
        onCreateNew={() => {
          dialogStates.submissionDashboard.setOpen(false);
          dialogStates.competitionHub.setOpen(true);
        } }
        onBack={() => dialogStates.submissionDashboard.setOpen(false)} submissionDashboardOpen={false} setSubmissionDashboardOpen={function (open: boolean): void {
          throw new Error('Function not implemented.');
        } }    />
   
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

export default DialogContainer;