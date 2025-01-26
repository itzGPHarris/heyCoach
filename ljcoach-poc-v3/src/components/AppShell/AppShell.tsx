import React, { useState } from 'react';

import FeedView from '../FeedView';
import DashboardView from '../DashboardView';
import CollaborateView from '../CollaborateView';
import ProfileView from '../ProfileView';
import AICoach from '../AICoach';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Fab,
  ThemeProvider,
  CssBaseline,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add,
  Group,
  Notifications,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { getTheme } from '../../styles/theme';
import useStore from '../../store';

const AppShell: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const {
    notifications,
    activeTab,
    setActiveTab,
    setShowNewPitchModal,
    setShowTeamModal,
    showAICoach,
    userProfile
  } = useStore();

  const theme = getTheme(mode);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" elevation={1}>
          <Toolbar>
            <IconButton 
              edge="start" 
              color="inherit" 
              onClick={handleMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ flexGrow: 1, color: 'inherit' }}
            >
              LongJump
            </Typography>
            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={unreadCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton sx={{ ml: 1 }}>
              <Avatar 
                src={userProfile?.avatar} 
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => { setActiveTab('feed'); handleCloseMenu(); }}>Home</MenuItem>
          <MenuItem onClick={() => { setActiveTab('dashboard'); handleCloseMenu(); }}>My Pitches</MenuItem>
          <MenuItem onClick={() => { setActiveTab('profile'); handleCloseMenu(); }}>Settings</MenuItem>
        </Menu>

        <Box sx={{ 
          flex: 1, 
          overflow: 'auto', 
          bgcolor: 'background.default',
          position: 'relative'
        }}>
          {activeTab === 'feed' && <FeedView />}
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'collaborate' && <CollaborateView />}
          {activeTab === 'profile' && <ProfileView />}
        </Box>

        {showAICoach && <AICoach />}

        <Box sx={{ 
          position: 'fixed', 
          bottom: 16, 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          px: 4 
        }}>
          <Fab 
            color="primary"
            onClick={() => setShowNewPitchModal(true)}
          >
            <Add />
          </Fab>
          <Fab 
            color="secondary"
            onClick={() => setShowTeamModal(true)}
          >
            <Group />
          </Fab>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppShell;