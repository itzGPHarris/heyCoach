import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Menu,
  
  MenuItem,
  Badge,
} from "@mui/material";
import useStore from "../../store";
import TeamFeedbackDialog from "./TeamFeedbackDialog";
import GroupsIcon from "@mui/icons-material/Groups";
import harperAvatar from "../../assets/harper.png"; // ✅ Import the image

interface AppHeaderProps {
  setDashboardOpen: (open: boolean) => void;
  anchorEl: HTMLElement | null;
  handleProfileClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  setDashboardOpen,  // Accept the prop
  anchorEl,
  handleProfileClick,
  handleMenuClose,
}) => {
  const setActiveTab = useStore((state) => state.setActiveTab);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const newTeamMessages = 3;

  function handleOpenDashboard(): void {
    console.log("Opening Dashboard from AppHeader"); 
    setDashboardOpen(true);  // ✅ Open the dashboard
    handleMenuClose(); 
  }

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "white", borderBottom: "1px solid #ddd" }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "left", cursor: "pointer" }} onClick={() => setActiveTab("feed")}>
            <img src="/img/logo.svg" alt="LongJump Logo" style={{ height: 32, marginRight: 8 }} />
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginLeft: "auto" }}>
            <IconButton sx={{ mt: 2 }} onClick={() => setTeamDialogOpen(true)}> 
              <Badge
                badgeContent={newTeamMessages}
                sx={{ "& .MuiBadge-badge": { backgroundColor: "#8e50ab", color: "white", fontSize: "9px" } }}
              >
                <GroupsIcon fontSize="large" />
              </Badge>
            </IconButton>

            <IconButton onClick={handleProfileClick}>
              <Avatar src={harperAvatar} sx={{ width: 40, height: 40 }} />
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
        <MenuItem
          onClick={() => {
            setActiveTab("profile");
            handleMenuClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={handleOpenDashboard}>  {/* ✅ Use new function */}
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
      </Menu>

      <TeamFeedbackDialog open={teamDialogOpen} onClose={() => setTeamDialogOpen(false)} />
    </>
  );
};

export default AppHeader;
