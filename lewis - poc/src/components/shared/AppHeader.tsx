import React from "react";
import { AppBar, Toolbar, Box, IconButton, Avatar, Badge, Menu, MenuItem } from "@mui/material";
import { User, Bell, Moon, Sun } from "lucide-react";

interface AppHeaderProps {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notifications: any[];
  anchorEl: HTMLElement | null;
  handleProfileClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ mode, setMode, notifications, anchorEl, handleProfileClick, handleMenuClose }) => {
  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "white", borderBottom: "1px solid #ddd" }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <img src="/img/logo.svg" alt="LongJump Logo" style={{ height: 32, marginRight: 8 }} />
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
              {mode === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </IconButton>
            <IconButton>
              <Badge badgeContent={notifications.filter((n) => !n.read).length || 0} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
            <IconButton onClick={handleProfileClick}>
              <Avatar src="">
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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My Pitches</MenuItem>
        <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
      </Menu>
    </>
  );
};

export default AppHeader;
