import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Slider,
  Divider,
  Box,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, VolumeUp, VolumeOff } from '@mui/icons-material';

interface GameSettings {
  sound: boolean;
  timerEnabled: boolean;
  timerDuration: number;
  difficultyBalance: 'equal' | 'weighted';
}

interface SettingsProps {
  open: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSaveSettings: (settings: GameSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({
  open,
  onClose,
  settings,
  onSaveSettings,
}) => {
  // Local state for settings during editing
  const [localSettings, setLocalSettings] = useState<GameSettings>(settings);

  // Handler for changing sound setting
  const handleSoundToggle = () => {
    setLocalSettings({
      ...localSettings,
      sound: !localSettings.sound,
    });
  };

  // Handler for changing timer enabled setting
  const handleTimerToggle = () => {
    setLocalSettings({
      ...localSettings,
      timerEnabled: !localSettings.timerEnabled,
    });
  };

  // Handler for changing timer duration
  const handleTimerDurationChange = (_event: Event, newValue: number | number[]) => {
    setLocalSettings({
      ...localSettings,
      timerDuration: newValue as number,
    });
  };

  // Handler for changing difficulty balance
  const handleDifficultyBalanceToggle = () => {
    setLocalSettings({
      ...localSettings,
      difficultyBalance: localSettings.difficultyBalance === 'equal' ? 'weighted' : 'equal',
    });
  };

  // Save settings and close dialog
  const handleSave = () => {
    onSaveSettings(localSettings);
    onClose();
  };

  // Reset local settings when dialog is opened
  React.useEffect(() => {
    if (open) {
      setLocalSettings(settings);
    }
  }, [open, settings]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Game Settings</Typography>
        <IconButton onClick={onClose} edge="end" aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Audio
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={localSettings.sound}
                onChange={handleSoundToggle}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {localSettings.sound ? <VolumeUp sx={{ mr: 1 }} /> : <VolumeOff sx={{ mr: 1 }} />}
                <Typography>Sound Effects</Typography>
              </Box>
            }
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Timer Settings
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={localSettings.timerEnabled}
                onChange={handleTimerToggle}
                color="primary"
              />
            }
            label="Enable Question Timer"
          />

          <Box sx={{ mt: 2, px: 2 }}>
            <Typography gutterBottom>Timer Duration</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ minWidth: 40 }}>10s</Typography>
              <Slider
                disabled={!localSettings.timerEnabled}
                value={localSettings.timerDuration}
                onChange={handleTimerDurationChange}
                step={1}
                min={10}
                max={30}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}s`}
                marks={[
                  { value: 10, label: '10s' },
                  { value: 20, label: '20s' },
                  { value: 30, label: '30s' },
                ]}
              />
              <Typography sx={{ minWidth: 40, ml: 1 }}>30s</Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Questions
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={localSettings.difficultyBalance === 'weighted'}
                onChange={handleDifficultyBalanceToggle}
                color="primary"
              />
            }
            label={
              <Box>
                <Typography>Weighted Difficulty Balance</Typography>
                <Typography variant="caption" color="text.secondary">
                  {localSettings.difficultyBalance === 'weighted'
                    ? 'More singles and doubles, fewer triples and home runs'
                    : 'Equal number of questions at each difficulty level'}
                </Typography>
              </Box>
            }
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;