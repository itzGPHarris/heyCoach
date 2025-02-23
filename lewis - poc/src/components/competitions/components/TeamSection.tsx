import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  IconButton,
  Stack
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import type { TeamMember } from '../types';

// Sample team members data
const AVAILABLE_TEAM_MEMBERS = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: 'Technical Co-Founder',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus.r@example.com',
    role: 'Product Lead',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '3',
    name: 'Alex Kim',
    email: 'alex.kim@example.com',
    role: 'Design Lead',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '4',
    name: 'Jordan Taylor',
    email: 'j.taylor@example.com',
    role: 'Marketing Director',
    avatar: '/api/placeholder/40/40'
  }
];

interface TeamSectionProps {
  members: TeamMember[];
  onAddMember: (member: TeamMember) => void;
  onRemoveMember: (id: string) => void;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  members,
  onAddMember,
  onRemoveMember
}) => {
  const [showTeamSelect, setShowTeamSelect] = useState(false);

  // Filter out already selected members
  const availableMembers = AVAILABLE_TEAM_MEMBERS.filter(
    member => !members.find(m => m.id === member.id)
  );

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Team Members
          </Typography>
          
          <Stack spacing={2}>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {members.map((member) => (
                <Chip
                  key={member.id}
                  avatar={
                    <Avatar src={member.avatar}>
                      {member.name.charAt(0)}
                    </Avatar>
                  }
                  label={member.name}
                  onDelete={() => onRemoveMember(member.id)}
                />
              ))}
            </Box>
            
            <Button
              variant="outlined"
              startIcon={<PersonAddIcon />}
              onClick={() => setShowTeamSelect(true)}
              disabled={availableMembers.length === 0}
              fullWidth
            >
              {availableMembers.length === 0 
                ? 'All team members added' 
                : 'Add Team Members'
              }
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Team Member Selection Dialog */}
      <Dialog
        open={showTeamSelect}
        onClose={() => setShowTeamSelect(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton 
                size="small" 
                onClick={() => setShowTeamSelect(false)}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6">
                Add Team Members
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={() => setShowTeamSelect(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <List sx={{ pt: 1 }}>
            {availableMembers.map((member) => (
              <ListItem 
                key={member.id}
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    onAddMember(member);
                    setShowTeamSelect(false);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={member.avatar}>
                      {member.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={member.name}
                    secondary={member.role}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamSection;