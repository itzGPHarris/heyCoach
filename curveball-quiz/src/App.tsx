
// curveball-quiz/src/App.tsx
// components/App.tsx
// curveball-quiz/src/App.tsx
// This is the main entry point for the Curveball Quiz application.
// It initializes the question database and handles loading states and errors.
//
// It uses Material-UI for theming and styling, and includes a loading spinner
// and error message display while the questions are being loaded.
//
// The main game component is rendered once the questions are successfully loaded.
//
// The application is wrapped in a ThemeProvider to apply the custom theme throughout.
// The AppShell component provides a consistent layout for the application,
// including a header and footer.
// The Game component is the main game interface where users can interact with the quiz.
// The application uses React hooks for managing state and side effects,
// including loading states and error handling.
// import React, { useEffect, useState } from 'react';
// import { ThemeProvider, CssBaseline, Box, CircularProgress, Typography } from '@mui/material';
// import theme from '../styles/theme';
// import Game from '../components/Game';
// import AppShell from './AppShell';
// import { initializeQuestionDatabase } from '../data/questions';
//
import React, { useEffect, useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
  Typography
} from '@mui/material';
import theme from '../styles/theme';
import Game from '../components/Game';
import AppShell from './AppShell';
import {
  initializeQuestionDatabase,
  getDailyQuestions
} from '../data/questions';
import { Question } from '../types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        await initializeQuestionDatabase();
        const allQuestions = await getDailyQuestions();
        setQuestions(allQuestions);
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
            <Typography variant="h6" sx={{ mt: 3 }}>
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
            <Typography variant="h5" color="error" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography>{error}</Typography>
          </Box>
        </AppShell>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppShell>
        <Game questions={questions} />
      </AppShell>
    </ThemeProvider>
  );
};

export default App;
