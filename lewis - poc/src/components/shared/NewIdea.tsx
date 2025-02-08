import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useFirstRun } from '../../contexts/context/FirstRunContext';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: theme.spacing(3),
  textAlign: 'center',
  position: 'relative'
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(2)
}));

interface NewIdeaProps {
  firstRun?: boolean;
}

const NewIdea: React.FC<NewIdeaProps> = ({ firstRun = false }) => {
  const { idea, setIdea } = useFirstRun(); // Use global context
  const navigate = useNavigate();

  const exampleIdeas = [
    'A smart assistant for startup pitches',
    'An app to track daily habits',
    'A tool to improve public speaking skills'
  ];

  return (
    <Container>
      <ButtonContainer>
        <Button variant="outlined" onClick={() => navigate('/full-ui')}>Skip</Button>
        <Button 
          variant="contained" 
          color="primary" 
          disabled={!idea.trim()} 
          onClick={() => navigate('/add-video')}
        >
          Next: Add a Video
        </Button>
      </ButtonContainer>
      
      {firstRun && <LinearProgress variant="determinate" value={25} sx={{ width: '100%', mb: 2 }} />} 
      
      <Typography variant="h4" gutterBottom>
        {firstRun ? 'Let’s Get Started!' : 'Create a New Idea'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {firstRun ? 'Think of a name for your idea—it doesn’t need to be perfect! You can change it later.' : 'Describe your idea in a few words.'}
      </Typography>
      
      <TextField
        label="Your Idea"
        variant="outlined"
        fullWidth
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder={firstRun ? exampleIdeas[Math.floor(Math.random() * exampleIdeas.length)] : 'Enter your idea here'}
        sx={{ maxWidth: 400, mb: 2 }}
      />
      
    </Container>
  );
};

export default NewIdea;
