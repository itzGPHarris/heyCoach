// src/components/SiteHeader.tsx
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import logoUrl from '../assets/logo.svg';
import Logo from './Logo';

interface SiteHeaderProps {
  logoSrc?: string;
  title?: string;
  showLoginButton?: boolean;
  onLoginClick?: () => void;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ 
  logoSrc = logoUrl, 
  title = 'Lewis POC', 
  showLoginButton = false,
  onLoginClick = () => {}
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        color: '#0090f2',
        backgroundColor: 'transparent',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {logoSrc ? (
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <img 
                src={logoSrc} 
                alt={`${title} logo`} 
                style={{ 
                  height: isMobile ? '30px' : '40px', 
                  maxWidth: '100%' 
                }} 
              />
            </Box>
          ) : (
            <Logo height={isMobile ? 30 : 40} />
          )}
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              display: { xs: logoSrc ? 'none' : 'block', sm: 'block' }
            }}
          >
            {title}
          </Typography>
        </Box>
        
        {showLoginButton && (
          <Button 
            color="inherit" 
            variant="outlined"
            onClick={onLoginClick}
            sx={{ 
              ml: 2,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default SiteHeader;