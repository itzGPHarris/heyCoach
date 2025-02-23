import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import { getTheme } from './styles/theme';
//import CssBaseline from '@mui/material/CssBaseline'
import App from './App'

const theme = getTheme('light');


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />

      <App />
    </ThemeProvider>
  </StrictMode>
)
