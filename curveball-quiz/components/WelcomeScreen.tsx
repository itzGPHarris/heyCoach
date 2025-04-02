// components/WelcomeScreen.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import {
  PlayArrow,
  SportsBaseball,
  Timer,
  EmojiEvents,
  Help,
  Close as CloseIcon,
} from '@mui/icons-material';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  const theme = useTheme();
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 2,
        maxWidth: 800,
        mx: 'auto',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background image - Replace with your actual stadium image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.palette.success.light,
          backgroundImage: 'url(/baseball-stadium.jpg)', // Add your stadium image to public folder
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
          zIndex: -1,
        }}
      />

      <Paper
        elevation={3}
        sx={{
          p: 5,
          my: 4,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(5px)',
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        {/* Logo (placeholder for your logo) */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <SportsBaseball sx={{ fontSize: 60, color: theme.palette.primary.main }} />
        </Box>

        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Curveball Quiz
        </Typography>
        
        <Typography variant="h5" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
          Test your baseball knowledge and score big!
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300, mx: 'auto' }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            startIcon={<PlayArrow />}
            onClick={onStartGame}
            sx={{
              py: 1.5,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: 8,
            }}
          >
            Play Ball!
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            color="primary"
            startIcon={<Help />}
            onClick={() => setInstructionsOpen(true)}
            sx={{
              py: 1.5,
              borderRadius: 8,
            }}
          >
            How to Play
          </Button>
        </Box>
      </Paper>

      {/* How to Play Dialog */}
      <Dialog
        open={instructionsOpen}
        onClose={() => setInstructionsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">How to Play</Typography>
          <Button 
            onClick={() => setInstructionsOpen(false)} 
            color="inherit"
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        
        <DialogContent dividers>
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
                <PlayArrow color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Answer Questions"
                secondary="Correct answers advance runners based on your hit type. Three incorrect answers and you're out!"
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Timer color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Beat the Clock"
                secondary="Answer before time runs out - 15 seconds with no runners on base, 18 seconds with runners on base"
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
          
          <Box sx={{ backgroundColor: theme.palette.primary.light, p: 2, borderRadius: 2, mt: 3 }}>
            <Typography variant="subtitle1" color="white" fontWeight="medium">
              ⚾ Pro Tip: Choose your questions strategically! When you have runners on base, 
              consider going for a higher difficulty question to maximize your chances of 
              scoring runs in a single at-bat.
            </Typography>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setInstructionsOpen(false)} color="primary" variant="contained">
            Got It!
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WelcomeScreen;