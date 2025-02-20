// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell';
//import AICoach from './components/AICoach/_AICoach';
//import useStore from './store';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  //const showAICoach = useStore(state => state.showAICoach);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<AppShell />} />
        </Routes>

      </Router>
    </ThemeProvider>
  );
};

export default App;