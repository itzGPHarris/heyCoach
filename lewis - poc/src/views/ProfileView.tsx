// src/components/ProfileView.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Avatar,
  Paper, 
  Card, 
  CardContent,
  Dialog, DialogContent, DialogTitle, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


interface ProfileViewProps {
  open: boolean;
  onClose: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ open, onClose }) => {

  return (
    <Dialog open={open} onClose={onClose} fullScreen sx={{ height: "95vh", display: "flex", margin: 2, flexDirection: "column" }}>
    <DialogTitle sx={{ flexShrink: 0 }}>Profile
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
    </DialogTitle>
    <DialogContent sx={{ flexGrow: 1, overflowY: "auto" }}>

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
    </DialogContent>
  </Dialog>
  );
};

export default ProfileView;