import { createTheme } from '@mui/material/styles';

// Baseball theme with green field, white bases, and baseball colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue for main actions
      light: '#4791db',
      dark: '#115293',
    },
    secondary: {
      main: '#dc004e', // Red accent color
      light: '#e33371',
      dark: '#9a0036',
    },
    success: {
      main: '#4caf50', // Green for the field
      light: '#81c784',
      dark: '#388e3c',
    },
    error: {
      main: '#f44336', // Red for errors/outs
      light: '#e57373',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ff9800', // Orange for warnings/caution
      light: '#ffb74d',
      dark: '#f57c00',
    },
    info: {
      main: '#2196f3', // Blue for information
      light: '#64b5f6',
      dark: '#1976d2',
    },
    background: {
      default: '#f5f5f5', // Light gray background
      paper: '#ffffff', // White background for cards and papers
    },
    text: {
      primary: '#333333', // Dark text for readability
      secondary: '#666666', // Secondary text
    },
  },
  typography: {
    fontFamily: [
      '"Roboto"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Prevent uppercase buttons
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded buttons
        },
        contained: {
          boxShadow: 'none', // Remove default shadow
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)', // Add shadow on hover
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded papers/cards
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded cards
          overflow: 'hidden',
        },
      },
    },
  },
});

export default theme;