import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  ThemeProvider,
  CssBaseline,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import { User, Bell, Moon, Sun } from 'lucide-react';
import { getTheme } from '../../styles/theme';
import useStore from '../../store';
import FeedView from '../FeedView';
import AICoach from '../AICoach';
import ChatAIDrawer from '../shared/ChatAIDrawer';
import PitchCarouselNewUser from '../shared/PitchCarouselNewUser';

const DebugBar = styled('div')({
  position: 'fixed',
  top: 55,
  left: 0,
  width: '100%',
  height: '10px',
  backgroundColor: "white", opacity: 0.01,
  cursor: 'pointer',
  zIndex: 1000,
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: 'opacity 0.3s ease',
}));

const HeaderToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
});

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  marginTop: '64px',
}));

function AppShell() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const store = useStore();
  const notifications = store.notifications || [];
  const showAICoach = store.showAICoach || false;
  const location = useLocation();
  const firstRunData = location.state || {};

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <DebugBar onClick={() => {
        localStorage.removeItem('hasSeenOnboarding');
        window.location.reload();
      }} />

      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <StyledAppBar position="fixed" elevation={0}>
          <HeaderToolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
              <img src="/img/logo.svg" alt="LongJump Logo" style={{ height: 32, marginRight: 8 }} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton onClick={() => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))}>
                {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </IconButton>
              <IconButton>
                <Badge badgeContent={notifications.filter((n) => !n.read).length || 0} color="error">
                  <Bell size={20} />
                </Badge>
              </IconButton>
              <IconButton onClick={handleProfileClick}>
                <Avatar src=''>
                  <User size={20} />
                </Avatar>
              </IconButton>
            </Box>
          </HeaderToolbar>
        </StyledAppBar>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My Pitches</MenuItem>
          <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>

        <MainContent>
          {firstRunData.idea && firstRunData.videoSrc ? (
            <PitchCarouselNewUser
              videoUrl={firstRunData.videoSrc}
              isPortrait={firstRunData.isPortrait ?? false}
              title={firstRunData.idea}
            />
          ) : (
            <>
              <FeedView />
            </>
          )}
        </MainContent>

        {showAICoach && <AICoach />}
        <ChatAIDrawer />
      </Box>
    </ThemeProvider>
  );
}

export default AppShell;
