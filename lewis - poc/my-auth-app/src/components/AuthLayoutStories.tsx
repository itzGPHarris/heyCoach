// src/components/AuthLayout.stories.tsx
import { StoryObj, Meta } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {  Typography, Paper } from '@mui/material';
import AuthLayout from './AuthLayout';
import CombinedAuth from './CombinedAuth';
import theme from '../theme';

// Sample SVG hero for the story
const SampleHeroSVG = () => (
  <svg width="300" height="150" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="75" cy="75" r="50" fill="#1E88E5" opacity="0.8" />
    <rect x="125" y="50" width="100" height="50" rx="6" fill="#FF6D00" opacity="0.7" />
    <path d="M225 75 L275 50 L275 100 Z" fill="#2E7D32" opacity="0.7" />
    <text x="150" y="130" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333333">Secure Authentication</text>
  </svg>
);

// Define the meta type
const meta: Meta<typeof AuthLayout> = {
  title: 'Layout/AuthLayout',
  component: AuthLayout,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  // Add argTypes for props
  argTypes: {
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
    heroHeight: {
      control: { type: 'range', min: 100, max: 400, step: 10 },
      description: 'Height of the hero section',
    },
  },
  // Set default args
  args: {
    companyName: 'Acme Corporation',
    logoSrc: 'https://via.placeholder.com/150x50',
    backgroundImageUrl: '',
    heroHeight: 200,
  },
};

export default meta;

// Define the story type
type Story = StoryObj<typeof AuthLayout>;

// Basic story with placeholder content
export const Basic: Story = {
  args: {
    heroGraphic: undefined, // No hero graphic
  },
  render: (args) => (
    <AuthLayout {...args}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Authentication Form</Typography>
        <Typography variant="body1">
          This is a placeholder for the authentication form content.
        </Typography>
      </Paper>
    </AuthLayout>
  ),
};

// With SVG hero graphic
export const WithSVGHero: Story = {
  args: {
    heroGraphic: <SampleHeroSVG />,
    heroHeight: 180,
  },
  render: (args) => (
    <AuthLayout {...args}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Authentication Form</Typography>
        <Typography variant="body1">
          This is a placeholder for the authentication form content.
        </Typography>
      </Paper>
    </AuthLayout>
  ),
};

// With image hero graphic
export const WithImageHero: Story = {
  args: {
    heroGraphic: 'https://via.placeholder.com/800x200',
    heroAlt: 'Authentication hero image',
    heroHeight: 200,
  },
  render: (args) => (
    <AuthLayout {...args}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Authentication Form</Typography>
        <Typography variant="body1">
          This is a placeholder for the authentication form content.
        </Typography>
      </Paper>
    </AuthLayout>
  ),
};

// With combined auth form
export const WithAuthForm: Story = {
  args: {
    heroGraphic: <SampleHeroSVG />,
    heroHeight: 180,
  },
  render: (args) => (
    <AuthLayout {...args}>
      <CombinedAuth />
    </AuthLayout>
  ),
};

// With full branding
export const FullBranding: Story = {
  args: {
    companyName: 'Acme Corporation',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMGdyYWRpZW50fGVufDB8fDB8fHww',
    heroGraphic: <SampleHeroSVG />,
    heroHeight: 200,
  },
  render: (args) => (
    <AuthLayout {...args}>
      <CombinedAuth />
    </AuthLayout>
  ),
};