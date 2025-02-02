// src/App.tsx
import React from 'react';
import { useEffect } from "react";

import { Box } from '@mui/material';
import AppShell from './components/AppShell/AppShell';
import AICoach from './components/AICoach/AICoach';
import useStore from './store';

const App: React.FC = () => {
  useEffect(() => {
    const hideAddressBar = () => {
      if (window.scrollY === 0) {
        window.scrollTo(0, 1); // ✅ Slight scroll hides the Safari address bar!
      }
    };

    window.addEventListener("load", hideAddressBar);
    window.addEventListener("resize", hideAddressBar);

    return () => {
      window.removeEventListener("load", hideAddressBar);
      window.removeEventListener("resize", hideAddressBar);
    };
  }, []);
  const showAICoach = useStore(state => state.showAICoach);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppShell />
      {showAICoach && <AICoach />}
    </Box>
  );
};

export default App;