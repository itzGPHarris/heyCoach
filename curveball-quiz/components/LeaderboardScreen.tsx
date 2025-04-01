import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
  useTheme,
  Chip,
} from '@mui/material';
import { ArrowBack, EmojiEvents } from '@mui/icons-material';

// Define the high score entry type
interface HighScoreEntry {
  id: string;
  name: string;
  score: number;
  date: string;
  questionsAnswered: number;
  accuracy: number;
}

interface LeaderboardScreenProps {
  onBack: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const theme = useTheme();

  // Sample data - in a real app, this would come from a database or localStorage
  const sampleHighScores: HighScoreEntry[] = [
    {
      id: '1',
      name: 'BaseballFan99',
      score: 12,
      date: '2025-03-30',
      questionsAnswered: 18,
      accuracy: 88,
    },
    {
      id: '2',
      name: 'DiamondKing',
      score: 10,
      date: '2025-03-29',
      questionsAnswered: 15,
      accuracy: 93,
    },
    {
      id: '3',
      name: 'MajorLeaguer',
      score: 9,
      date: '2025-03-28',
      questionsAnswered: 17,
      accuracy: 76,
    },
    {
      id: '4',
      name: 'HomeRunHero',
      score: 8,
      date: '2025-03-27',
      questionsAnswered: 14,
      accuracy: 85,
    },
    {
      id: '5',
      name: 'SluggerSam',
      score: 7,
      date: '2025-03-26',
      questionsAnswered: 16,
      accuracy: 81,
    },
  ];

  // Function to format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Medal colors for top 3
  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return theme.palette.warning.main; // Gold
      case 1:
        return theme.palette.grey[400]; // Silver
      case 2:
        return theme.palette.warning.dark; // Bronze
      default:
        return undefined;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        maxWidth: 800,
        mx: 'auto',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ mr: 2 }}
          color="inherit"
        >
          Back
        </Button>
        <Typography variant="h4" component="h1">
          Leaderboard
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <TableContainer component={Paper} elevation={0} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Player</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Score
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Accuracy
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleHighScores.map((entry, index) => (
              <TableRow
                key={entry.id}
                sx={{
                  backgroundColor: index < 3 ? `${getMedalColor(index)}22` : undefined, // Light tint for top 3
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>
                  {index < 3 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmojiEvents
                        sx={{ color: getMedalColor(index), mr: 1 }}
                        fontSize="small"
                      />
                      {index + 1}
                    </Box>
                  ) : (
                    index + 1
                  )}
                </TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold">{entry.score}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={`${entry.accuracy}%`}
                    size="small"
                    color={
                      entry.accuracy >= 90
                        ? 'success'
                        : entry.accuracy >= 70
                        ? 'primary'
                        : 'default'
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{formatDate(entry.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box textAlign="center">
        <Typography variant="body2" color="text.secondary">
          Think you can make the leaderboard? Keep playing to improve your score!
        </Typography>
      </Box>
    </Paper>
  );
};

export default LeaderboardScreen;