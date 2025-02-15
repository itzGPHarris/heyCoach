import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { X, Copy, Check, PlusCircle, MoreVertical } from "lucide-react";
//import FeedbackTab from "./FeedbackTab"; // Import the new FeedbackTab component

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
}

interface TeamFeedbackDialogProps {
  open: boolean;
  onClose: () => void;
}

const mockTeam: TeamMember[] = [
  { id: "1", name: "Sarah Chen", role: "Co-founder", email: "sarah@example.com" },
  { id: "2", name: "Michael Patel", role: "Designer", email: "michael@example.com" },
  { id: "3", name: "Alex Kim", role: "Developer", email: "alex@example.com" },
];

const TeamFeedbackDialog: React.FC<TeamFeedbackDialogProps> = ({ open, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [newTeammate, setNewTeammate] = useState("");
  const [team, setTeam] = useState(mockTeam);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleCopy = async () => {
    try {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleAddTeammate = () => {
    if (newTeammate.trim()) {
      setTeam([...team, { id: crypto.randomUUID(), name: newTeammate, role: "Pending" }]);
      setNewTeammate("");
    }
  };

  

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, member: TeamMember) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMember(null);
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen sx={{ height: "95vh", display: "flex", margin:2, flexDirection: "column" }}>
      <DialogTitle sx={{ flexShrink: 0 }}>
        Contacts
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ flexGrow: 1, overflowY: "auto" }}>
      
          <Box sx={{ maxHeight: "100%", overflowY: "auto", p: 2, mt: 2 }}>
              <Box  sx={{display: "flex", alignItems: "center", gap: .5, mb: 2}}>
  <IconButton onClick={handleCopy}>
  {copied ? <Check size={20} /> : <Copy size={20} />}
</IconButton>
<Typography variant="body2"  sx={{color:"#8e50ab"}}>
  Copy to share and invite contacts
</Typography>
</Box>
<Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
<Box >
  <Typography variant="caption" color="text.secondary">
   Add a contact now, or share the link below to invite them to give feedback
 </Typography>
</Box>
<Box sx={{ display: "flex", gap: 1, mt: 1, mb: 2 }}>
  <TextField fullWidth size="small" placeholder="Enter email, LinkedIn ID, or Discord username" value={newTeammate} onChange={(e) => setNewTeammate(e.target.value)} />
  <IconButton color="primary" onClick={handleAddTeammate}>
  <PlusCircle size={20} />
  </IconButton>
</Box>
 <Divider sx={{pt:1, mb:2}} />

</Box>
            <Typography variant="subtitle2" gutterBottom>Team Members</Typography>
            <List>
              {team.map((member) => (
                <ListItem key={member.id} secondaryAction={
                  <IconButton onClick={(event) => handleMenuOpen(event, member)}>
                    <MoreVertical size={20} />
                  </IconButton>
                }>
                  <ListItemAvatar>
                    <Avatar>{member.name.split(" ").map((n) => n[0]).join("")}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={member.name} secondary={`${member.role} • ${member.email}`} />
                </ListItem>
              ))}
            </List>
          </Box>
       
      </DialogContent>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => console.log("Edit User", selectedMember)}>Make collaborator</MenuItem>
        <MenuItem onClick={() => console.log("Delete User", selectedMember)}>Edit</MenuItem>
        <MenuItem onClick={() => console.log("Delete User", selectedMember)}>Remove</MenuItem>

      </Menu>
    </Dialog>
  );
};

export default TeamFeedbackDialog;
