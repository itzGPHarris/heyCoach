// 📌 Fully Updated AppShell.tsx with Fixes for Missing Properties
import React, { useState } from 'react';
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
import DashboardView from '../DashboardView';
import ProfileView from '../ProfileView';
import AICoach from '../AICoach';
import ChatAIDrawer from '../shared/ChatAIDrawer';
//import { ViewType } from '../../store/types';

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
  const activeTab = store.activeTab || 'feed';
  
  const showAICoach = store.showAICoach || false;
  

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = () => {
    handleMenuClose();
  };

  const handleSignOut = () => {
    handleMenuClose();
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <StyledAppBar position="fixed" elevation={0}>
          <HeaderToolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
              <img src="../src/assets/logo.svg" alt="LongJump Logo" style={{ height: 32, marginRight: 8 }} />
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
          <MenuItem onClick={handleMenuSelect}>Profile</MenuItem>
          <MenuItem onClick={handleMenuSelect}>My Pitches</MenuItem>
          <MenuItem onClick={handleMenuSelect}>Account Settings</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>

        <MainContent>
          {activeTab === 'feed' && <FeedView />}
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'profile' && <ProfileView />}
        </MainContent>

        {showAICoach && <AICoach />}
        <ChatAIDrawer />
      </Box>
    </ThemeProvider>
  );
}

export default AppShell;
