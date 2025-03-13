// src/components/UnifiedEntry.stories.tsx
import { StoryObj, Meta } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import UnifiedEntry from './UnifiedEntry';
import { MockAuth0Provider } from '../../mocks/auth0-context';
import theme from '../theme';

// Define the meta type
const meta: Meta<typeof UnifiedEntry> = {
  title: 'Authentication/UnifiedEntry',
  component: UnifiedEntry,
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
  parameters: {
    layout: 'fullscreen',
  },
  // Add argTypes for new props
  argTypes: {
    initialState: {
      control: 'select',
      options: ['default', 'loading'],
      description: 'Initial state of the component',
    },
    email: {
      control: 'text',
      description: 'Initial email value',
    },
    companyName: {
      control: 'text',
      description: 'Your company name',
    },
    logoSrc: {
      control: 'text',
      description: 'URL to your company logo',
    },
    backgroundImageUrl: {
      control: 'text',
      description: 'Background image URL',
    },
  },
  // Set default args
  args: {
    companyName: 'Your Company Name',
    // You can add a placeholder logo URL here
    logoSrc: 'https://via.placeholder.com/150x50',
    // Optional background image
    backgroundImageUrl: '',
  },
};

export default meta;

// Define the story type
type Story = StoryObj<typeof UnifiedEntry>;

// Basic state - initial view
export const Default: Story = {};

// Branded example
export const Branded: Story = {
  args: {
    companyName: 'Acme Corporation',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMGdyYWRpZW50fGVufDB8fDB8fHww',
  }
};

// Email submission story with play function
export const EmailSubmission: Story = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Fill in email
    await userEvent.type(
      canvas.getByLabelText('Email'), 
      'test@example.com'
    );
    
    // Click continue button
    await userEvent.click(canvas.getByRole('button', { name: /continue/i }));
  }
};

// Existing user flow
export const ExistingUserFlow: Story = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Fill in email with "existing" to trigger existing user path
    await userEvent.type(
      canvas.getByLabelText('Email'), 
      'existing@example.com'
    );
    
    // Click continue button
    await userEvent.click(canvas.getByRole('button', { name: /continue/i }));
  }
};

// New user flow
export const NewUserFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Fill in email without "existing" to trigger new user path
    await userEvent.type(
      canvas.getByLabelText('Email'), 
      'newuser@example.com'
    );
    
    // Click continue button
    await userEvent.click(canvas.getByRole('button', { name: /continue/i }));
  }
};

// Error state - empty email
export const ErrorState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Click continue button without entering email
    await userEvent.click(canvas.getByRole('button', { name: /continue/i }));
    
    // Verify error message appears
    await expect(canvas.getByText(/please enter your email address/i)).toBeInTheDocument();
  }
};

// Google sign-in click
export const GoogleSignIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Click Google button
    await userEvent.click(canvas.getByRole('button', { name: /continue with google/i }));
  }
};

// Loading state
export const LoadingState: Story = {
  args: {
    initialState: 'loading',
    email: 'test@example.com'
  }
};

// Dark mode example
export const DarkMode: Story = {
  decorators: [
    (Story) => {
      // Create a dark version of the theme
      const darkTheme = { ...theme };
      darkTheme.palette = { 
        ...theme.palette,
        mode: 'dark',
        background: {
          default: '#121212',
          paper: '#242424'
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.5)',
        }
      };
      
      return (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <MockAuth0Provider>
            <Story />
          </MockAuth0Provider>
        </ThemeProvider>
      );
    }
  ]
};