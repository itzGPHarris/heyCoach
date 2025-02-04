import { useNavigate } from 'react-router-dom';
import { Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const CoverContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#0090f2', // Updated background color
  padding: theme.spacing(3),
}));

const OptionCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  transition: '0.3s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DebugBar = styled('div')({
  position: 'fixed',
  top: 55, // Adjusted to prevent overlap with header
  left: 0,
  width: '100%',
  height: '10px',
  backgroundColor: 'white',
  opacity: 0.01,
  cursor: 'pointer',
  zIndex: 1000,
});

function CoverScreen({ onSelect }: { onSelect?: (option: string) => void }) {
  const navigate = useNavigate();

  const handleSelection = (option: string) => {
    console.log(`Button clicked: ${option}`);
    
    if (onSelect) {
      console.log("onSelect is defined, executing onSelect...");
      onSelect(option);
      return;
    }
  
    console.log("Navigating using useNavigate...");
    if (option === 'Start Fresh') {
      localStorage.setItem('hasSeenOnboarding', 'true');
      navigate('/new-idea');
    } else if (option === 'Explore First') {
      navigate('/dashboard');
    } else {
      navigate('/full-ui');
    }
  };
  

  return (
    <>
      <DebugBar onClick={() => {
        localStorage.removeItem('hasSeenOnboarding');
        window.location.reload();
      }} />
      <CoverContainer>
        <Typography variant="h4" gutterBottom>
          Welcome to AI Coach
        </Typography>
        <Typography variant="body1" gutterBottom>
          How would you like to begin?
        </Typography>
        
        <OptionCard onClick={() => handleSelection('Start Fresh')}>
          <Typography variant="h6">Start Fresh</Typography>
          <Typography variant="body2">
            Create your first pitch idea and upload or record a video.
          </Typography>
        </OptionCard>
        
        <OptionCard onClick={() => handleSelection('Explore First')}>
          <Typography variant="h6">Explore First</Typography>
          <Typography variant="body2">
            Check out AI Coach with mock content before diving in.
          </Typography>
        </OptionCard>
        
        <OptionCard onClick={() => handleSelection('Skip to Full UI')}>
          <Typography variant="h6">Skip to Full UI</Typography>
          <Typography variant="body2">
            (For testing) Jump straight into the full experience.
          </Typography>
        </OptionCard>
        
        <Button variant="contained" color="secondary" onClick={() => {
          localStorage.removeItem('hasSeenOnboarding');
          window.location.reload();
        }}>
          Return to Cover Screen
        </Button>
      </CoverContainer>
    </>
  );
}

export default CoverScreen;
