/* eslint-disable @typescript-eslint/no-empty-object-type */
// src/theme.ts
import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

// Extend the theme to add custom properties if needed
declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
    // Add custom theme properties here if needed
  }

  // Allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    // Similar custom properties like above
  }
}

// Create and export the theme with your brand colors
const theme: Theme = createTheme({
  palette: {
    // Replace these with your brand colors
    primary: {
      main: '#1e88e5', // Change to your primary brand color
      light: '#6ab7ff',
      dark: '#005cb2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff6d00', // Change to your secondary brand color
      light: '#ff9e40',
      dark: '#c43e00',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f7fa', // Light background color
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Prevents all-caps buttons
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners for components
  },
  components: {
    // Customize MUI components globally
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e88e5', // Match your primary color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 22px',
        },
        containedPrimary: {
          boxShadow: '0 4px 6px rgba(30, 136, 229, 0.25)', // Use your primary color
          '&:hover': {
            boxShadow: '0 6px 10px rgba(30, 136, 229, 0.3)', // Use your primary color
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1e88e5', // Match your primary color
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation6: {
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

export default theme;