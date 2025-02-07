import { useState } from 'react';
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

interface Submission {
  name: string;
  submissionName: string;
  points: number;
  description: string;
  thumbnail: string;
  externalLink: string;
  rank: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  position: 'relative',
}));

const StyledCloseButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

function WeeklyCompetitionCard({ onRemove }: { onRemove: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const handleViewDetails = () => {
    setIsExpanded(true);
  };

  const handleHideDetails = () => {
    setIsExpanded(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmissionClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsDialogOpen(true);
  };

  const leaders: Submission[] = Array.from({ length: 10 }, (_, index) => ({
    name: `Leader ${index + 1}`,
    submissionName: `Submission ${index + 1}`,
    points: Math.floor(Math.random() * 1000),
    description: `This is a short description for submission ${index + 1}.`,
    thumbnail: "https://via.placeholder.com/150",
    externalLink: "https://example.com/submission",
    rank: index + 1,
  }));

  return (
    <StyledCard elevation={2}>
      <StyledCloseButton
        aria-label="close"
        onClick={() => (isExpanded ? handleHideDetails() : onRemove())}
      >
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
                    <TableRow
                      key={index}
                      onClick={() => handleSubmissionClick(leader)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{leader.rank}</TableCell>
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
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
              <Button variant="text" color="secondary" onClick={handleHideDetails}>
                Hide Details
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>

      {/* Submission Details Dialog */}
      {selectedSubmission && (
        <Dialog fullScreen open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>
            Submission Details
            <Button
              aria-label="close"
              onClick={handleDialogClose}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <img
                src={selectedSubmission.thumbnail}
                alt="Submission Thumbnail"
                style={{ width: 150, height: 150, borderRadius: 8 }}
              />
              <Box>
                <Typography variant="h6">{selectedSubmission.name}</Typography>
                <Typography>Rank: {selectedSubmission.rank}</Typography>
                <Typography>Submission Name: {selectedSubmission.submissionName}</Typography>
                <Typography>Points: {selectedSubmission.points}</Typography>
              </Box>
            </Box>
            <Typography variant="body1" paragraph>
              {selectedSubmission.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href={selectedSubmission.externalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Submission Page
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Back to Leaderboard
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </StyledCard>
  );
}

export default WeeklyCompetitionCard;
