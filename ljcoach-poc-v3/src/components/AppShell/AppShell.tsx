import React, { useState, useEffect, useRef } from 'react';
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
  Fab,
  Menu,
  MenuItem,
} from '@mui/material';
import { User, Bell, Plus, Users, Moon, Sun } from 'lucide-react';
import { getTheme } from '../../styles/theme';
import useStore from '../../store';
import FeedView from '../FeedView';
import DashboardView from '../DashboardView';
import ProfileView from '../ProfileView';
import AICoach from '../AICoach';
import CoachToolbar from '../shared/CoachToolbar';
import { ViewType } from '../../store/types';


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
  const [isVisible, setIsVisible] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    activeTab,
    setActiveTab,
    setShowNewPitchModal,
    setShowTeamModal,
    showAICoach,
    userProfile,
  } = useStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('IntersectionObserver:', entry.isIntersecting); // Log visibility changes
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) observer.unobserve(currentObserverRef);
    };
  }, []);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = (view: ViewType) => {
    setActiveTab(view);
    handleMenuClose();
  };

  const handleSignOut = () => {
    handleMenuClose();
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <StyledAppBar position="fixed" elevation={0} className={isVisible ? 'visible' : 'hidden'}>
          <HeaderToolbar>
            <Box
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setActiveTab('feed')}
            >
              <img
                src="../src/assets/logo.svg"
                alt="LongJump Logo"
                style={{ height: 32, marginRight: 8 }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton onClick={() => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))}>
                {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </IconButton>
              <IconButton>
                <Badge badgeContent={notifications.filter((n) => !n.read).length} color="error">
                  <Bell size={20} />
                </Badge>
              </IconButton>
              <IconButton onClick={handleProfileClick}>
                <Avatar src={userProfile?.avatar}>
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
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => handleMenuSelect('profile')}>Profile</MenuItem>
          <MenuItem onClick={() => handleMenuSelect('dashboard')}>My Pitches</MenuItem>
          <MenuItem onClick={() => handleMenuSelect('settings')}>Account Settings</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>

        <MainContent>
          <div ref={observerRef} style={{ height: 1 }} /> {/* Tracking element */}
          {activeTab === 'feed' && <FeedView />}
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'settings' && <ProfileView />}
        </MainContent>

        {showAICoach && <AICoach />}

        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            px: 4,
          }}
          className={isVisible ? 'visible' : 'hidden'}
        >
          <Fab color="primary" onClick={() => setShowNewPitchModal(true)}>
            <Plus />
          </Fab>
          <Fab color="secondary" onClick={() => setShowTeamModal(true)}>
            <Users />
          </Fab>
        </Box>

        <CoachToolbar
          onNewPitch={() => setShowNewPitchModal(true)}
          onTeamClick={() => setShowTeamModal(true)}
          className={isVisible ? 'visible' : 'hidden'}
        />
      </Box>
    </ThemeProvider>
  );
}

export default AppShell;
