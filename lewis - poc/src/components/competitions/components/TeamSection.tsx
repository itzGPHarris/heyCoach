// TeamSection.tsx

import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Chip, 
  Avatar, 
  Stack 
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import type { TeamSectionProps } from '../types';

const TeamSection: React.FC<TeamSectionProps> = ({
  members,
  onAddMember,
  onRemoveMember
}) => {
  return (
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
                    {member.name.charAt(0).toUpperCase()}
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
            fullWidth
            onClick={onAddMember}
          >
            Add Team Members
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TeamSection;