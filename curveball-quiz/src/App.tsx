import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Box, CircularProgress, Typography } from '@mui/material';
import theme from '../styles/theme';
import Game from '../components/Game';
import AppShell from './AppShell';
import { initializeQuestionDatabase } from '../data/questions';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        await initializeQuestionDatabase();
        setLoading(false);
      } catch (err) {
        console.error('Failed to initialize questions:', err);
        setError('Failed to load questions. Please try again later.');
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppShell>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="50vh"
            textAlign="center"
            p={3}
          >
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" component="h1" sx={{ mt: 3 }}>
              Loading Curveball Quiz...
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Getting the questions ready for you
            </Typography>
          </Box>
        </AppShell>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppShell>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="50vh"
            textAlign="center"
            p={3}
          >
            <Typography variant="h5" component="h1" color="error" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1">{error}</Typography>
          </Box>
        </AppShell>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppShell>
        <Game />
      </AppShell>
    </ThemeProvider>
  );
};

export default App;