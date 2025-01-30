// src/App.tsx
/*
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
*/


import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import AppShell from './components/AppShell/AppShell';
import AICoach from './components/AICoach/AICoach';
import useStore from './store';
import ApiTest from './components/test/ApiTest';

const App: React.FC = () => {
  const showAICoach = useStore(state => state.showAICoach);
  const [showApiTest, setShowApiTest] = useState(true); // Start with API test visible

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toggle button for testing */}
      <Button 
        onClick={() => setShowApiTest(!showApiTest)}
        variant="contained"
        sx={{  
          opacity: 0.5,
          padding: '0.1rem',
          margin: '0.1 rem',
          position: 'fixed', 
          borderRadius: 0,
          width: '1rem',
          top: 0, 
          right: 0, 
          zIndex: 9999 
        }}
      >
        {showApiTest ? '1' : '2'}
      </Button>

      {showApiTest ? (
        <Box sx={{ p: 3 }}>
          <ApiTest />
        </Box>
      ) : (
        <>
          <AppShell />
          {showAICoach && <AICoach />}
        </>
      )}
    </Box>
  );
};

export default App;
