// src/components/DashboardView.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent 
} from '@mui/material';

const DashboardView: React.FC = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
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
  );
};

export default DashboardView;