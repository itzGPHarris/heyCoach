import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  position: 'relative',
}));

const StyledCloseButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

function WeeklyCompetitionCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = () => {
    setIsExpanded(true);
  };

  const handleHideDetails = () => {
    setIsExpanded(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const leaders = Array.from({ length: 10 }, (_, index) => ({
    name: `Leader ${index + 1}`,
    submissionName: `Submission ${index + 1}`,
    points: Math.floor(Math.random() * 1000),
  }));

  const leaderboard = Array.from({ length: 25 }, (_, index) => ({
    name: `Participant ${index + 1}`,
    submissionName: `Submission ${index + 1}`,
    points: Math.floor(Math.random() * 1000),
  }));

  return (
    <StyledCard elevation={2}>
      <StyledCloseButton aria-label="close" onClick={handleHideDetails}>
        <CloseIcon />
      </StyledCloseButton>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Weekly Competition
        </Typography>
        {!isExpanded ? (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Ends: 3 days left
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Prize: $500
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={handleViewDetails}>
                View Details
              </Button>
              <Button variant="contained" color="primary">
                Enter Competition
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" paragraph>
              Compete in this week’s exciting competition to win amazing prizes and gain recognition!
            </Typography>
            <Typography variant="subtitle1">Leaders:</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Profile</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Submission</TableCell>
                    <TableCell>Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaders.map((leader, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Avatar>{leader.name[0]}</Avatar>
                      </TableCell>
                      <TableCell>{leader.name}</TableCell>
                      <TableCell>{leader.submissionName}</TableCell>
                      <TableCell>{leader.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={handleDialogOpen}>
                View Leaderboard
              </Button>
              <Button variant="text" color="secondary" onClick={handleHideDetails}>
                Hide Details
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>

      {/* Full-Screen Dialog */}
      <Dialog fullScreen open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          Weekly Competition Leaderboard
          <Button
            aria-label="close"
            onClick={handleDialogClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            This leaderboard showcases the top participants of this week’s competition.
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Profile</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Submission</TableCell>
                  <TableCell>Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((participant, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar>{participant.name[0]}</Avatar>
                    </TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell>{participant.submissionName}</TableCell>
                    <TableCell>{participant.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary">
            Enter Competition
          </Button>
          <Button onClick={handleDialogClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
}

export default WeeklyCompetitionCard;
