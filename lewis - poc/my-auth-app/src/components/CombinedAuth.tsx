// src/components/CombinedAuth.tsx
import { useState, FormEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Paper
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

interface CombinedAuthProps {
  initialMode?: 'signin' | 'signup';
  email?: string;
  companyName?: string;
  logoSrc?: string;
  backgroundImageUrl?: string;
  isLoading?: boolean;
}

const CombinedAuth: React.FC<CombinedAuthProps> = ({ 
  initialMode = 'signin',
  email: initialEmail = '',
  companyName = 'Your Company',
  logoSrc,
  backgroundImageUrl,
  isLoading: initialLoading = false
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState<string>(initialEmail);
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<string>('');
  
  const { loginWithRedirect } = useAuth0();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue === 0 ? 'signin' : 'signup');
    setError(''); // Clear any errors when switching modes
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (mode === 'signup') {
      // Additional validation for sign-up
      if (!password) {
        setError('Please enter a password');
        return;
      }
      
      handleSignup();
    } else {
      // Sign-in validation
      if (!password) {
        setError('Please enter your password');
        return;
      }
      
      handleSignin();
    }
  };

  const handleSignin = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await loginWithRedirect({
        authorizationParams: {
          ...(email ? { login_hint: email } : {})
        }
      } as RedirectOptions);
    } catch (err) {
      setError('Unable to sign in. Please try again.');
      console.error('Auth0 login error:', err);
      setIsLoading(false);
    }
  };

  const handleSignup = async (): Promise<void> => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: 'google-oauth2',
          ...(mode === 'signup' ? { screen_hint: 'signup' } : {})
        }
      } as RedirectOptions);
    } catch (err) {
      setError(`Unable to ${mode === 'signup' ? 'sign up' : 'sign in'} with Google. Please try again.`);
      console.error('Google auth error:', err);
      setIsLoading(false);
    }
  };

  // Loading screen content
  if (isLoading) {
    return (
      <AuthLayout
        companyName={companyName}
        logoSrc={logoSrc}
        backgroundImageUrl={backgroundImageUrl}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h6" gutterBottom>
            {mode === 'signup' ? 'Creating your account...' : 'Signing you in...'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {email}
          </Typography>
        </Box>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      companyName={companyName}
      logoSrc={logoSrc}
      backgroundImageUrl={backgroundImageUrl}
    >
      <Paper elevation={0}>
        <Tabs
          value={mode === 'signin' ? 0 : 1}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label="Sign In" 
            id="auth-tab-0" 
            aria-controls="auth-tabpanel-0"
            sx={{ fontWeight: 600 }}
          />
          <Tab 
            label="Create Account" 
            id="auth-tab-1" 
            aria-controls="auth-tabpanel-1"
            sx={{ fontWeight: 600 }}
          />
        </Tabs>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
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
            required
            autoFocus
          />
          
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {mode === 'signup' && (
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <TextField
                id="firstName"
                label="First Name"
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                id="lastName"
                label="Last Name"
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
          )}
          
          {mode === 'signin' && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button 
                color="primary" 
                size="small" 
                sx={{ textTransform: 'none' }}
                onClick={() => {
                  // Handle forgot password
                  console.log('Forgot password clicked');
                }}
              >
                Forgot password?
              </Button>
            </Box>
          )}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
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
          onClick={handleGoogleAuth}
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          size="large"
        >
          {mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
        </Button>
      </Paper>
    </AuthLayout>
  );
};

export default CombinedAuth;