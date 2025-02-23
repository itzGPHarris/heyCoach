import React from 'react';
import DashboardView from '../shared/dialogs/DashboardView';
import ProfileView from '../shared/dialogs/ProfileView';
import SettingsDialog from '../shared/dialogs/SettingsDialog';
//import CompetitionsDialog from '../shared/dialogs/CompetitionDialog';
import PitchVersionsDialog from '../shared/dialogs/PitchVersionsDialog';
import MediaUploadDialog from '../shared/dialogs/MediaUploadDialog';
import CompetitionDialogs from '../competitions/CompetitionDialogs';


interface DialogsProps {
  dialogStates: {
    dashboard: { isOpen: boolean; setOpen: (open: boolean) => void };
    profile: { isOpen: boolean; setOpen: (open: boolean) => void };
    settings: { isOpen: boolean; setOpen: (open: boolean) => void };
    media: { isOpen: boolean; setOpen: (open: boolean) => void };
    competition: { isOpen: boolean; setOpen: (open: boolean) => void };
    versions: { isOpen: boolean; setOpen: (open: boolean) => void };
  };
  onSendVideo: (fileUrl: string, isPortrait: boolean) => void;
}
export const Dialogs: React.FC<DialogsProps> = ({ dialogStates, onSendVideo }) => (
  <>
    <DashboardView 
      open={dialogStates.dashboard.isOpen} 
      onClose={() => dialogStates.dashboard.setOpen(false)} 
    />
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
      />    <PitchVersionsDialog 
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
