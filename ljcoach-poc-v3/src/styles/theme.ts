import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: '2.5rem', fontWeight: 900 },
    h2: { fontSize: '2rem', fontWeight: 900 },
    h3: { fontSize: '1.75rem', fontWeight: 900 },
    h4: { fontSize: '1rem', fontWeight: 900 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
  },
  shape: {
    borderRadius: 1,
  },
  breakpoints: {
    values: {
      xs: 0,    // Extra-small screens
      sm: 600,  // Small screens
      md: 960,  // Medium screens
      lg: 1280, // Large screens
      xl: 1920, // Extra-large screens
    },
  },
};

const lightTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#333333',
      light: '#818CF8',
      dark: '#666666',
    },
    secondary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    error: {
      main: red[500],
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 900,
          borderRadius: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
        },
      },
    },
  },
};

const darkTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#818CF8',
      light: '#A5B4FC',
      dark: '#4F46E5',
    },
    secondary: {
      main: '#34D399',
      light: '#6EE7B7',
      dark: '#10B981',
    },
    error: {
      main: red[500],
    },
    background: {
      default: '#111827',
      paper: '#1F2937',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 900,
          borderRadius: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
        },
      },
    },
  },
};

export const getTheme = (mode: 'light' | 'dark') => 
  responsiveFontSizes(createTheme(mode === 'light' ? lightTheme : darkTheme));
