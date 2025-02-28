// src/pages/AuthPage.tsx
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import CombinedAuth from '../components/CombinedAuth';
import { Box } from '@mui/material';
import coachLogo from '../assets/coachlogo.svg';

const AuthPage: React.FC = () => {
  console.log("Coach logo import:", coachLogo); // Debug: check what's being imported
  
  return (
    <AuthLayout
      companyName="Your Company"
      // Very explicit hero implementation
      heroGraphic={
        <Box 
          component="img" 
          src={coachLogo} 
          alt="Coach Logo"
          sx={{ 
            width: '250px', 
            height: 'auto',
            display: 'block',
            margin: '0 auto'
          }} 
        />
      }
      heroHeight={200}
    >
      <CombinedAuth />
    </AuthLayout>
  );
};

export default AuthPage;