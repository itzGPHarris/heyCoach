// src/components/TestDisplay.tsx
import { Box } from '@mui/material';
import CoachAvatar from './CoachAvatar';
import CoachAvatar2 from './CoachAvatar2';

const TestDisplay = () => {
  // Array of different sizes to test
  const sizes = [32, 48, 64, 96];

  return (
    <Box sx={{ 
      p: 4, 
      display: 'flex', 
      flexDirection: 'column',
      gap: 4,
      alignItems: 'center',
      bgcolor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1>Avatar Test Display</h1>
      
      {/* Test different sizes */}
      <Box sx={{ 
        display: 'flex', 
        gap: 4, 
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {sizes.map((size) => (
          <Box key={size} sx={{ 
            width: size, 
            height: size,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}>
            <CoachAvatar />|
            <CoachAvatar2 />

            <div>{size}px</div>
          </Box>
        ))}
      </Box>

      {/* Test in message-like context */}
      <Box sx={{ 
        width: '100%',
        maxWidth: 400,
        p: 2,
        bgcolor: 'white',
        borderRadius: 2,
        display: 'flex',
        gap: 2,
        alignItems: 'flex-end'
      }}>
        <Box sx={{ width: 36, height: 36 }}>
        <CoachAvatar />
        <CoachAvatar2 />
        </Box>
        <Box sx={{ 
          bgcolor: '#f0f0f0',
          p: 2,
          borderRadius: 2,
          flex: 1
        }}>
          Test message context
        </Box>
      </Box>
    </Box>
  );
};

export default TestDisplay;

