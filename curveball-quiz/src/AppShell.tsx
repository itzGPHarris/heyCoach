import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  EmojiEvents as TrophyIcon,
  Close as CloseIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

import Settings from '../components/Settings';
import LeaderboardScreen from '../components/LeaderboardScreen';
import AboutScreen from '../components/AboutScreen';

interface GameSettings {
  sound: boolean;
  timerEnabled: boolean;
  timerDuration: number;
  difficultyBalance: 'equal' | 'weighted';
}

interface AppShellProps {
  children: React.ReactNode;
  onSettingsChange?: (settings: GameSettings) => void;
}

const AppShell: React.FC<AppShellProps> = ({ 
  children,
  onSettingsChange
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Default game settings
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    sound: true,
    timerEnabled: true,
    timerDuration: 15,
    difficultyBalance: 'equal',
  });

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [currentScreen, setCurrentScreen] = useState<'game' | 'leaderboard' | 'about'>('game');

  const handleNavigation = (screen: 'game' | 'leaderboard' | 'about') => {
    setCurrentScreen(screen);
    setDrawerOpen(false);
  };

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  const handleSaveSettings = (newSettings: GameSettings) => {
    setGameSettings(newSettings);
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, screen: 'game' },
    { text: 'Leaderboard', icon: <TrophyIcon />, screen: 'leaderboard' },
    { text: 'About', icon: <InfoIcon />, screen: 'about' }
  ];
  


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Curveball Quiz
          </Typography>
          
          <IconButton 
            color="inherit" 
            aria-label="settings"
            onClick={handleOpenSettings}
            sx={{ mr: 1 }}
          >
            <SettingsIcon />
          </IconButton>
          
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  startIcon={item.icon}
                  onClick={() => handleNavigation(item.screen as 'game' | 'leaderboard' | 'about')}
                  sx={{ 
                    ml: 1,
                    borderBottom: currentScreen === item.screen ? '2px solid white' : 'none',
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 2
          }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider />
          
          <List>
              {menuItems.map((item) => (
                <ListItem 
                  button
                  key={item.text}
                  onClick={() => handleNavigation(item.screen as 'game' | 'leaderboard' | 'about')}
                  sx={{ backgroundColor: currentScreen === item.screen ? 'rgba(0, 0, 0, 0.08)' : 'inherit' }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>

      {/* Settings Dialog */}
      <Settings
        open={settingsOpen}
        onClose={handleCloseSettings}
        settings={gameSettings}
        onSaveSettings={handleSaveSettings}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 3 } 
          }}
        >
          {currentScreen === 'game' && children}
          
          {currentScreen === 'leaderboard' && (
            <LeaderboardScreen onBack={() => handleNavigation('game')} />
          )}
          
          {currentScreen === 'about' && (
            <AboutScreen onBack={() => handleNavigation('game')} />
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.grey[100],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Curveball Quiz | Baseball Trivia Game
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default AppShell;