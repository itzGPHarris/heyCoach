// src/features/dialogs/DialogContainer.tsx
import React from 'react';
import DetailedAnalysisDialog from '../../../components/shared/dialogs/DetailedAnalysisDialog';
import ImprovementsDialog from '../../../components/shared/dialogs/ImprovementsDialog';
import TeamFeedbackDialog from '../../../components/shared/dialogs/TeamFeedbackDialog';
import CompetitionDialog from '../../../components/shared/dialogs/CompetitionDialog';
import PitchVersionsDialog from '../../../components/shared/dialogs/PitchVersionsDialog';
import DashboardView from '../../../components/shared/dialogs/DashboardView';
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
        <CompetitionDialog
          open={dialogStates.competition.isOpen}
          onClose={() => dialogStates.competition.setOpen(false)}
        />
        <PitchVersionsDialog
          open={dialogStates.versions.isOpen}
          onClose={() => dialogStates.versions.setOpen(false)}
        />
        <DashboardView
          open={dialogStates.dashboard.isOpen}
          onClose={() => dialogStates.dashboard.setOpen(false)}
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
  