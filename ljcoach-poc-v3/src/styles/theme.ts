
import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseTheme = {
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 }
  },
  shape: {
    borderRadius: 8
  }
};

const lightTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5',
      light: '#818CF8',
      dark: '#3730A3'
    },
    secondary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669'
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF'
    }
  }
};

const darkTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#818CF8',
      light: '#A5B4FC',
      dark: '#4F46E5'
    },
    secondary: {
      main: '#34D399',
      light: '#6EE7B7',
      dark: '#10B981'
    },
    background: {
      default: '#111827',
      paper: '#1F2937'
    }
  }
};

export const getTheme = (mode: 'light' | 'dark') => 
  createTheme(mode === 'light' ? lightTheme : darkTheme);