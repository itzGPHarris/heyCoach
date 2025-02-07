// src/components/ProfileView.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  Grid, 
  Card, 
  CardContent 
} from '@mui/material';

const ProfileView: React.FC = () => {
  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            p: 3 
          }}>
            <Avatar 
              sx={{ 
                width: 120, 
                height: 120, 
                mb: 2 
              }}
              alt="User Profile"
              src="/path/to/avatar.jpg" // Replace with actual avatar path
            />
            <Typography variant="h6">User Name</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Pitch Enthusiast
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography>user@example.com</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Pitches
                  </Typography>
                  <Typography>12</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileView;