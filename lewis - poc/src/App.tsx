// Updated on - 2025-02-04, Time: [YOUR TIMEZONE]

// Updated App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell';
import AICoach from './components/AICoach/AICoach';
import CoverScreen from './components/shared/CoverScreen';
import useStore from './store';
import { styled } from '@mui/system';
import FirstRunRoutes from './components/shared/FirstRunRoutes';
import { FirstRunProvider } from './contexts/context/FirstRunContext';

const DebugBar = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '1px',
  backgroundColor: 'white',
  opacity: 0,
  cursor: 'pointer',
  zIndex: 1000,
});

const App: React.FC = () => {
  const showAICoach = useStore(state => state.showAICoach);

  return (
    <FirstRunProvider>
      <Router>
        <DebugBar onClick={() => {
          localStorage.removeItem('hasSeenOnboarding');
          window.location.reload();
        }} />

        <Routes>
          <Route path="/" element={<CoverScreen />} />
          <Route path="/*" element={<FirstRunRoutes />} />
          <Route path="/full-ui" element={<AppShell />} />
          <Route path="/app" element={<AppShell />} />
        </Routes>

        {showAICoach && <AICoach />}
      </Router>
    </FirstRunProvider>
  );
};

export default App;