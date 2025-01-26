// components/AICoach/ContextPanel.tsx
import React from 'react';
import {
  Paper,
  Typography,
  Tab,
  Tabs,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import useStore from '../../store';
import { Pitch } from '../../store/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ContextPanel: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const selectedPitch = useStore(state => {
    const pitchId = state.selectedPitch;
    return pitchId ? state.pitches[pitchId] : null;
  });

  if (!selectedPitch) {
    return null;
  }

  return (
    <Paper sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Analysis" />
          <Tab label="Transcript" />
          <Tab label="History" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <AnalysisView pitch={selectedPitch} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TranscriptView />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <HistoryView />
      </TabPanel>
    </Paper>
  );
};

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    sx={{ 
      flex: 1,
      overflow: 'auto',
      display: value === index ? 'block' : 'none',
      p: 2
    }}
  >
    {children}
  </Box>
);

const AnalysisView: React.FC<{ pitch: Pitch }> = ({ pitch }) => (
  <List>
    <ListItem>
      <ListItemText
        primary="Clarity Score"
        secondary={`${pitch.metrics.clarity}% - ${getScoreDescription(pitch.metrics.clarity)}`}
      />
    </ListItem>
    <Divider />
    <ListItem>
      <ListItemText
        primary="Engagement Level"
        secondary={`${pitch.metrics.engagement}% - ${getScoreDescription(pitch.metrics.engagement)}`}
      />
    </ListItem>
    <Divider />
    <ListItem>
      <ListItemText
        primary="Key Suggestions"
        secondary={
          <ul>
            <li>Maintain consistent pace</li>
            <li>Emphasize unique value proposition</li>
            <li>Structure with clear beginning and end</li>
          </ul>
        }
      />
    </ListItem>
  </List>
);

const TranscriptView: React.FC = () => (
  <Box>
    <Typography variant="body1">
      {/* Replace with actual transcript */}
      This is where the pitch transcript would appear, with highlighted key phrases 
      and timestamps for reference.
    </Typography>
  </Box>
);

const HistoryView: React.FC = () => (
  <List>
    {/* Replace with actual history data */}
    <ListItem>
      <ListItemText
        primary="Version 1.0"
        secondary="Initial recording - 2024-01-20"
      />
    </ListItem>
    <Divider />
    <ListItem>
      <ListItemText
        primary="Version 1.1"
        secondary="Updated after clarity feedback - 2024-01-22"
      />
    </ListItem>
  </List>
);

const getScoreDescription = (score: number): string => {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Fair";
  return "Needs Improvement";
};

export default ContextPanel;