import React from "react";
import { AppBar, Toolbar, Box, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { User, Bell } from "lucide-react";
import useStore from "../../store"; // ✅ Import Zustand store

interface AppHeaderProps {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  notifications: unknown[];
  anchorEl: HTMLElement | null;
  handleProfileClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ anchorEl, handleProfileClick, handleMenuClose }) => {
  const setActiveTab = useStore((state) => state.setActiveTab); // ✅ Get Zustand setter

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "white", borderBottom: "1px solid #ddd" }}>
        <Toolbar>
          {/* ✅ Clicking the logo sends user to 'feed' */}
          <Box sx={{ display: "flex", alignItems: "left", cursor: "pointer" }} onClick={() => setActiveTab("feed")}>
            <img src="/img/logo.svg" alt="LongJump Logo" style={{ height: 32, marginRight: 8 }} />
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginLeft: "auto" }}>
            <IconButton>
              <Bell size={20} />
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
        {/* ✅ Updates activeTab on click */}
        <MenuItem
          onClick={() => {
            setActiveTab("profile");
            handleMenuClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            setActiveTab("dashboard");
            handleMenuClose();
          }}
        >
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
      </Menu>
    </>
  );
};

export default AppHeader;
