import React, {  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { Box } from '@mui/material';
import AppShell from './components/AppShell/AppShell';
import AICoach from './components/AICoach/AICoach';
import CoverScreen from './components/CoverScreen';
import useStore from './store';
import { styled } from '@mui/system';
import FirstRunRoutes from './components/shared/FirstRunRoutes';
import { FirstRunProvider } from './context/FirstRunContext';


const DebugBar = styled('div')({
  position: 'fixed',
  top: 55, // Prevent overlap with header
  left: 0,
  width: '100%',
  height: '10px',
  backgroundColor: 'white',
  opacity: 0.01,
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
        <Route path="/" element={<CoverScreen  />} />
        <Route path="/*" element={<FirstRunRoutes />} />
        <Route path="/full-ui" element={<AppShell />} />
        <Route path="/app" element={<AppShell />} /> {/* ✅ Ensure this exists */}

      </Routes>

      {showAICoach && <AICoach />}
    </Router>
        </FirstRunProvider>

  );
};

export default App;
