// src/App.tsx
import React from 'react';
import { Box } from '@mui/material';
import AppShell from './components/AppShell/AppShell';
import AICoach from './components/AICoach/AICoach';
import useStore from './store';

const App: React.FC = () => {
  const showAICoach = useStore(state => state.showAICoach);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppShell />
      {showAICoach && <AICoach />}
    </Box>
  );
};

export default App;