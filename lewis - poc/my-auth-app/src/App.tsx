import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import UnifiedEntry from './components/UnifiedEntry';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Auth0Provider
        domain="Ylewis-poc.us.auth0.com" // Replace with your Auth0 domain
        clientId="6Xak7qG7zqJxoWcMq9FR4HVzAhKCsgVC" // Replace with your Auth0 client ID
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <UnifiedEntry />
      </Auth0Provider>
    </ThemeProvider>
  );
}

export default App;

