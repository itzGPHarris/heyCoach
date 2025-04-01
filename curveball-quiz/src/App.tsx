/* eslint-disable @typescript-eslint/no-unused-vars */
// src/App.tsx
import { CssBaseline } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell';
import { getTheme } from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';

const App: React.FC = () => {
  const theme = getTheme('light');

  return (
    <ThemeProvider theme={{theme}}>
      <Router>
        <Routes>
          <Route path="/*" element={<AppShell />} />
        </Routes>

      </Router>
    </ThemeProvider>
  );
};

export default App;