import React from 'react';
import DetailedAnalysisDialog from '../../../components/shared/dialogs/DetailedAnalysisDialog';
import ImprovementsDialog from '../../../components/shared/dialogs/ImprovementsDialog';
import TeamFeedbackDialog from '../../../components/shared/dialogs/TeamFeedbackDialog';
import CompetitionDialog from '../../../components/shared/dialogs/CompetitionDialog';
//import MediaUploadDialog from '../../../components/shared/dialogs/MediaUploadDialog';

interface FeedDialogsProps {
  dialogs: {
    teamFeedback: { isOpen: boolean; setOpen: (open: boolean) => void };
    improvements: { isOpen: boolean; setOpen: (open: boolean) => void };
    analysis: { isOpen: boolean; setOpen: (open: boolean) => void };
    competition: { isOpen: boolean; setOpen: (open: boolean) => void };
    media: { isOpen: boolean; setOpen: (open: boolean) => void };
  };
  onSendVideo: (fileUrl: string, isPortrait: boolean) => void;
  isVersionUpload: boolean;
  mediaAnchorEl?: HTMLElement | null;
}

export const FeedDialogs: React.FC<FeedDialogsProps> = ({
  dialogs,
 // onSendVideo,
  //isVersionUpload
}) => {
  return (
    <>
      <DetailedAnalysisDialog
        open={dialogs.analysis.isOpen}
        onClose={() => dialogs.analysis.setOpen(false)}
      />
      <ImprovementsDialog
        open={dialogs.improvements.isOpen}
        onClose={() => dialogs.improvements.setOpen(false)}
        improvementsText=""
      />
      <TeamFeedbackDialog
        open={dialogs.teamFeedback.isOpen}
        onClose={() => dialogs.teamFeedback.setOpen(false)}
      />
      <CompetitionDialog
        open={dialogs.competition.isOpen}
        onClose={() => dialogs.competition.setOpen(false)}
      />
     {/* <MediaUploadDialog
        open={dialogs.media.isOpen}
        onClose={() => dialogs.media.setOpen(false)}
        onSendVideo={onSendVideo}
        isVersionUpload={isVersionUpload}
      />*/}
    </>
  );
};