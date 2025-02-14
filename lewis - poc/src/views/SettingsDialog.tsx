// src/components/SettingsDialog.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent,
  Dialog, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


interface SettingsDialogrops {
  open: boolean;
  onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogrops> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullScreen sx={{ height: "95vh", display: "flex", margin: 2, flexDirection: "column" }}>
      <DialogTitle sx={{ flexShrink: 0 }}>Settings
      <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Pitch Performance</Typography>
                    <Typography>Metrics coming soon...</Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Recent Activity</Typography>
                    <Typography>No recent activity</Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Goals</Typography>
                    <Typography>Set your pitch goals here</Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>  
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;

