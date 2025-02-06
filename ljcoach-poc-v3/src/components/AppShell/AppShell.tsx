// Updated on - 2025-02-05, Time: Pacific Time (PT), 12:50

// Restored Correct App Header Implementation and Ensured CoachCardBanner Integration
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, AppBar, Toolbar, IconButton, Avatar, Badge, Menu, MenuItem } from "@mui/material";
import { User, Bell, Moon, Sun } from "lucide-react";
import { getTheme } from "../../styles/theme";
import useStore from "../../store";
import FeedView from "../FeedView";
import DashboardView from "../DashboardView";
import ProfileView from "../ProfileView";
import AICoach from "../AICoach";
import ChatAIDrawer from "../shared/ChatAIDrawer";
import PitchCarouselNewUser from "../shared/PitchCarouselNewUser";
import CoachCardBanner from "../shared/CoachCardBanner";

function AppShell() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const store = useStore();
  const location = useLocation();
  const isFirstRun = location.state?.firstRun || localStorage.getItem("firstRun") === "true";
  const [progress, setProgress] = useState<"first_run_complete" | "refined" | "branched" | null>(null);

  useEffect(() => {
    const storedProgress = localStorage.getItem("userProgress") as "first_run_complete" | "refined" | "branched" | null;
    if (storedProgress) {
      setProgress(storedProgress);
    }
  }, []);

  const notifications = store.notifications || [];
  const activeTab = store.activeTab || 'feed';
  const showAICoach = store.showAICoach || false;

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        {/* ✅ Restored App Header */}
        <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "white", borderBottom: "1px solid #ddd" }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
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
          </Toolbar>
        </AppBar>

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
          <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1, overflow: "auto", backgroundColor: "background.default", position: "relative", marginTop: "64px" }}>
          {isFirstRun ? (
            <>
              <PitchCarouselNewUser 
                videoUrl={location.state?.videoSrc || ""} 
                isPortrait={location.state?.isPortrait || false} 
                title={location.state?.idea || "My First Pitch"} 
              />
              {/* ✅ Ensure CoachCardBanner is visible during first-run */}
              <CoachCardBanner progress={progress || "first_run_complete"} onChatOpen={() => console.log("💬 AI Chat Opened")} />
            </>
          ) : (
            activeTab === 'feed' ? <FeedView /> : activeTab === 'dashboard' ? <DashboardView /> : <ProfileView />
          )}
        </Box>

        {showAICoach && <AICoach />}
        <ChatAIDrawer onOpenAnalysis={() => console.log("📜 Opening AI Analysis from AppShell...")} />
      </Box>
    </ThemeProvider>
  );
}

export default AppShell;
