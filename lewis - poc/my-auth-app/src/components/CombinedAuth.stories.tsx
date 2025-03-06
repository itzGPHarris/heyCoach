// src/components/CombinedAuth.stories.tsx
import { StoryObj, Meta } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CombinedAuth from './CombinedAuth';
import { MockAuth0Provider } from '../../mocks/auth0-context';
import theme from '../theme';
import logoUrl from '../assets/logo.svg';

// Define the meta type
const meta: Meta<typeof CombinedAuth> = {
  title: 'Authentication/CombinedAuth',
  component: CombinedAuth,
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
  // Add argTypes for props
  argTypes: {
    initialMode: {
      control: 'radio',
      options: ['signin', 'signup'],
      description: 'Initial mode of the component',
    },
    email: {
      control: 'text',
      description: 'Initial email value',
    },
    companyName: {
      control: 'text',
      description: 'Lewis Unified Sign In - POC',
    },
    logoSrc: {
      control: 'text',
      description: 'URL to your company logo',
    },
    backgroundImageUrl: {
      control: 'text',
      description: 'Background image URL',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
  // Set default args
  args: {
    initialMode: 'signin',
    companyName: 'Auth0 POC',
    logoSrc: logoUrl,
    backgroundImageUrl: '',
    isLoading: false,
  },
};

export default meta;

// Define the story type
type Story = StoryObj<typeof CombinedAuth>;

// Default Sign In View
export const SignInMode: Story = {
  args: {
    initialMode: 'signin',
  }
};

// Sign Up View
export const SignUpMode: Story = {
  args: {
    initialMode: 'signup',
  }
};

// Branded example
export const BrandedExample: Story = {
  args: {
    initialMode: 'signin',
    companyName: 'Lews POC',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMGdyYWRpZW50fGVufDB8fDB8fHww',
  }
};

// Loading state
export const LoadingState: Story = {
  args: {
    isLoading: true,
    email: 'user@example.com',
  }
};

// Switch between modes
export const SwitchingModes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Click the Sign Up tab
    await userEvent.click(canvas.getByRole('tab', { name: /Create account/i }));
    
    // Verify first name field appears
    await expect(canvas.getByLabelText(/first name/i)).toBeInTheDocument();
    
    // Click back to Sign In tab
    await userEvent.click(canvas.getByRole('tab', { name: /sign in/i }));
    
    // Verify forgot password link appears
    await expect(canvas.getByText(/forgot password/i)).toBeInTheDocument();
  }
};

// Sign In flow
export const SignInFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Fill in email
    await userEvent.type(
      canvas.getByLabelText('Email'), 
      'user@example.com'
    );
    
    // Fill in password
    await userEvent.type(
      canvas.getByLabelText('Password'), 
      'password123'
    );
    
    // Click sign in button
    await userEvent.click(canvas.getByRole('button', { name: /sign in/i }));
  }
};

// Sign Up flow
export const SignUpFlow: Story = {
  args: {
    initialMode: 'signup',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Fill in email
    await userEvent.type(
      canvas.getByLabelText('Email'), 
      'newuser@example.com'
    );
    
    // Fill in password
    await userEvent.type(
      canvas.getByLabelText('Password'), 
      'password123'
    );
    
    // Fill in first name
    await userEvent.type(
      canvas.getByLabelText('First Name'), 
      'John'
    );
    
    // Fill in last name
    await userEvent.type(
      canvas.getByLabelText('Last Name'), 
      'Doe'
    );
    
    // Click create account button
    await userEvent.click(canvas.getByRole('button', { name: /create account/i }));
  }
};

// Google Sign In
export const GoogleSignIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Click Google sign in button
    await userEvent.click(canvas.getByRole('button', { name: /sign in with google/i }));
  }
};

// Google Sign Up
export const GoogleSignUp: Story = {
  args: {
    initialMode: 'signup',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Click Google sign up button
    await userEvent.click(canvas.getByRole('button', { name: /sign up with google/i }));
  }
};

// Error state - missing fields
export const ValidationError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Click sign in button without entering anything
    await userEvent.click(canvas.getByRole('button', { name: /sign in/i }));
    
    // Wait for error message
    await expect(canvas.getByText(/please enter your email address/i)).toBeInTheDocument();
  }
};