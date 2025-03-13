/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/UnifiedEntry.tsx
import { useState, FormEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AuthLayout from './AuthLayout';

interface RedirectOptions {
  authorizationParams?: {
    screen_hint?: string;
    login_hint?: string;
    connection?: string;
  };
  simulateSuccessfulLogin?: boolean;
  mockUser?: Record<string, unknown>;
}

interface UnifiedEntryProps {
  initialState?: 'default' | 'loading';
  email?: string;
  companyName?: string;
  logoSrc?: string;
  backgroundImageUrl?: string;
}

const UnifiedEntry: React.FC<UnifiedEntryProps> = ({ 
  initialState = 'default',
  email: initialEmail = '',
  companyName = 'Your Company',
  logoSrc,
  backgroundImageUrl
}) => {
  const [email, setEmail] = useState<string>(initialEmail);
  const [isLoading, setIsLoading] = useState<boolean>(initialState === 'loading');
  const [error, setError] = useState<string>('');
  //const [isExistingUser, setIsExistingUser] = useState<boolean>(false);
  
  const { loginWithRedirect } = useAuth0();

  // Mock function to check if user exists
  const checkExistingUser = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError('');
    
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // For Storybook testing, we'll use a simple rule:
      // If email contains "existing", treat as existing user
      const exists = email.includes('existing');
      //setIsExistingUser(exists);
      if (exists) {
        // Existing user flow - would redirect to Okta
        // For now, we'll just use Auth0 login
        handleAuth0Login();
      } else {
        // New user flow - Auth0 registration
        handleAuth0Signup();
      }
    } catch (err) {
      setError('Unable to verify account status. Please try again.');
      console.error('Error checking user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    checkExistingUser(email);
  };

  const handleAuth0Login = async (): Promise<void> => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          ...(email ? { login_hint: email } : {})
        }
      } as RedirectOptions);
    } catch (err) {
      setError('Unable to sign in. Please try again.');
      console.error('Auth0 login error:', err);
    }
  };

  const handleAuth0Signup = async (): Promise<void> => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup',
          ...(email ? { login_hint: email } : {})
        }
      } as RedirectOptions);
    } catch (err) {
      setError('Unable to create your account. Please try again.');
      console.error('Auth0 signup error:', err);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: 'google-oauth2'
        }
      } as RedirectOptions);
    } catch (err) {
      setError('Unable to sign in with Google. Please try again.');
      console.error('Google login error:', err);
    }
  };

  // Loading screen content
  const loadingContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CircularProgress size={60} sx={{ mb: 3 }} />
      <Typography variant="h6" gutterBottom>
        Checking account status...
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {email}
      </Typography>
    </Box>
  );

  // Main form content
  const formContent = (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Box component="form" onSubmit={handleEmailSubmit} sx={{ mb: 3 }}>
        <TextField
          id="email"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="yourname@example.com"
          helperText="Enter your email to continue"
          disabled={isLoading}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          Continue
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
          or
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      
      <Button
        onClick={handleGoogleLogin}
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        size="large"
        disabled={isLoading}
      >
        Continue with Google
      </Button>
    </>
  );

  return (
    <AuthLayout 
      companyName={companyName}
      logoSrc={logoSrc}
      backgroundImageUrl={backgroundImageUrl}
    >
      {isLoading ? loadingContent : formContent}
    </AuthLayout>
  );
};
export default UnifiedEntry;
