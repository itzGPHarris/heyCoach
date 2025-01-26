// src/components/CollaborateView.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  Divider 
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const CollaborateView: React.FC = () => {
  // Placeholder team members
  const teamMembers = [
    { name: 'Alex Johnson', role: 'Pitch Coach' },
    { name: 'Sam Rodriguez', role: 'Mentor' },
    { name: 'Jordan Lee', role: 'Team Lead' }
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Team Collaboration
      </Typography>
      <List>
        {teamMembers.map((member, index) => (
          <React.Fragment key={member.name}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={member.name} 
                secondary={member.role} 
              />
            </ListItem>
            {index < teamMembers.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default CollaborateView;