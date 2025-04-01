import React from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  PlayArrow,
  SportsBaseball,
  Timer,
  Close,
  EmojiEvents,
} from '@mui/icons-material';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        maxWidth: 800,
        mx: 'auto',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Curveball Quiz!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Test your baseball knowledge in this trivia game that combines
          questions with baseball mechanics
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" gutterBottom>
        How to Play
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon>
            <SportsBaseball color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Choose Your Hit Type"
            secondary="Select between Single, Double, Triple, or Home Run - higher difficulty questions earn more bases"
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Timer color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Answer Questions"
            secondary="Correct answers advance runners based on your hit type. Three incorrect answers and you're out!"
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Close color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Use Passes Wisely"
            secondary="You get three passes per game. Each pass counts as a strike. Three strikes equal one out."
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <EmojiEvents color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Score Runs"
            secondary="Get runners around the bases by answering questions correctly to score runs"
          />
        </ListItem>
      </List>

      <Box sx={{ backgroundColor: theme.palette.primary.light, p: 2, borderRadius: 2, mt: 3, mb: 4 }}>
        <Typography variant="subtitle1" color="white" fontWeight="medium">
          ⚾ Pro Tip: Choose your questions strategically! When you have runners on base, 
          consider going for a higher difficulty question to maximize your chances of 
          scoring runs in a single at-bat.
        </Typography>
      </Box>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          startIcon={<PlayArrow />}
          onClick={onStartGame}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 3,
            fontSize: '1.1rem',
          }}
        >
          Play Ball!
        </Button>
      </Box>
    </Paper>
  );
};

export default WelcomeScreen;