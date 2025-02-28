// .storybook/preview.tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Preview } from '@storybook/react';
import { MockAuth0Provider } from '../mocks/auth0-context';
import theme from '../src/theme';

// Parameters for all stories
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Optional: set a default viewport for responsive testing
    viewport: {
      defaultViewport: 'responsive',
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  // Global decorator to wrap all stories with providers
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MockAuth0Provider>
          <Story />
        </MockAuth0Provider>
      </ThemeProvider>
    ),
  ],
  // Global types for Storybook controls
  globalTypes: {
    // Add a control for authentication state if needed
    authState: {
      name: 'Authentication State',
      description: 'Authentication state of the user',
      defaultValue: 'unauthenticated',
      toolbar: {
        icon: 'user',
        items: [
          { value: 'unauthenticated', title: 'Not Authenticated' },
          { value: 'authenticated', title: 'Authenticated' },
          { value: 'loading', title: 'Loading' },
        ],
      },
    },
    // Optional: add dark mode toggle
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
      },
    },
  },
};

export default preview;

// Optional: Add withAuthState decorator to dynamically change auth state
// This can be uncommented and added to the decorators array if needed
/*
export const withAuthState = (StoryFn: any, context: any) => {
  const { authState } = context.globals;
  
  const authProps = {
    isAuthenticated: authState === 'authenticated',
    isLoading: authState === 'loading',
    user: authState === 'authenticated' ? {
      name: 'Test User',
      email: 'testuser@example.com',
      picture: 'https://via.placeholder.com/150',
      sub: 'auth0|123456789',
      email_verified: true
    } : null
  };
  
  return (
    <MockAuth0Provider {...authProps}>
      <StoryFn />
    </MockAuth0Provider>
  );
};
*/