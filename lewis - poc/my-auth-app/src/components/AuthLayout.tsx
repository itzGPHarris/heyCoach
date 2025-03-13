/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/AuthLayout.tsx
import React, { ReactNode } from 'react';
import { Box, Container, Paper, useTheme, Typography } from '@mui/material';
import SiteHeader from './SiteHeader';
import coachLogo from '../assets/coachlogo.svg';

interface AuthLayoutProps {
  children: ReactNode;
  logoSrc?: string;
  companyName?: string;
  backgroundImageUrl?: string;
  heroGraphic?: React.ReactNode; // This prop should exist
  heroAlt?: string;
  heroHeight?: number | string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  logoSrc,
  companyName = 'Your Company',
  backgroundImageUrl,
  heroGraphic,
  //heroAlt = 'Hero image',
  //heroHeight = 200
}) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <SiteHeader
        logoSrc={logoSrc}
        title={companyName}
      />
      
      <Box 
          component="img" 
          src={coachLogo} 
          alt="Coach Logo"
          sx={{ 
            pt: 12,
            width: '250px', 
            height: 'auto',
            display: 'block',
            margin: '0 auto'
          }} 
        />
      <Typography variant="h4" align="center" sx={{ mt: 2, mb: 4 }}>
        {companyName}
      </Typography>
      <Container 
        component="main" 
        maxWidth="sm" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1,
          justifyContent: 'center', 
          py: 4,
          // Adjust padding if there's a hero graphic
          ...(heroGraphic && { pt: 2 })
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ 
            p: { xs: 3, sm: 4 },
            width: '100%', 
            borderRadius: 2,
            backgroundColor: 'background.paper'
          }}
        >
          {children}
        </Paper>
        
        {/* Optional footer */}
        <Box 
          component="footer" 
          sx={{ 
            mt: 3, 
            textAlign: 'center', 
            color: 'text.secondary',
            fontSize: '0.875rem'
          }}
        >
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;