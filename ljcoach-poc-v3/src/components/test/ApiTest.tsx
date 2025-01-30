// src/components/test/ApiTest.tsx
import { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import apiClient from '../../api';
import useStore from '../../store'; // ✅ Import Zustand store

interface ApiTestState {
  isLoading: boolean;
  error: string | null;
  data: Record<string, unknown> | null;  // Use a more specific type
  endpoint: string | null;
}

function ApiTest() {
  const [apiState, setApiState] = useState<ApiTestState>({
    isLoading: false,
    error: null,
    data: null,
    endpoint: null
  });

  const testEndpoint = async (endpointName: string, apiCall: () => Promise<unknown>) => {
    setApiState(prev => ({ 
      ...prev, 
      isLoading: true, 
      error: null, 
      endpoint: endpointName 
    }));

    try {
      const result = await apiCall();
      setApiState(prev => ({ 
        ...prev, 
        data: result as Record<string, unknown>, 
        isLoading: false 
      }));
      console.log(`${endpointName} result:`, result);
    } catch {
      setApiState(prev => ({ 
        ...prev, 
        error: 'API call failed', // Simple error message for POC
        isLoading: false
      }));
    }
  };

  // ✅ Fix: Update PitchVersion correctly (e.g., transcript, playbackId)
  const updatePitchVersion = () => {
    const pitchId = 'demo-pitch-1';
    const updates = { 
      transcript: 'Updated pitch transcript',
      playbackId: 'new-mux-playback-id' // ✅ Only properties from PitchVersion
    };

    console.log(`Updating pitch version for ${pitchId}...`);
    useStore.getState().updatePitch(pitchId, updates); // ✅ Uses Zustand store
  };

  // ✅ Fix: Update Pitch metadata separately (e.g., title, description)
  const updatePitchMetadata = () => {
    const pitchId = 'demo-pitch-1';
    const updatedMetadata = { title: 'Updated Pitch Title', description: 'New pitch description!' };

    console.log(`Updating pitch metadata for ${pitchId}...`);
    useStore.setState(state => ({
      pitches: {
        ...state.pitches,
        [pitchId]: {
          ...state.pitches[pitchId],
          ...updatedMetadata
        }
      }
    })); // ✅ Directly updates Zustand state for metadata changes
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>API Test Dashboard</Typography>
      
      <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => testEndpoint('Competitions', apiClient.getCompetitions)}
        >
          Test Competitions
        </Button>
        <Button
          variant="contained"
          onClick={() => testEndpoint('Current Competition', apiClient.getCurrentCompetition)}
        >
          Test Current Competition
        </Button>
        <Button
          variant="contained"
          onClick={updatePitchVersion} // ✅ Updates PitchVersion (e.g., transcript)
        >
          Update Pitch Version
        </Button>
        <Button
          variant="contained"
          onClick={updatePitchMetadata} // ✅ Updates Pitch metadata (e.g., title, description)
        >
          Update Pitch Metadata
        </Button>
      </Stack>

      {apiState.isLoading && <CircularProgress />}
      {apiState.error && <Alert severity="error">{apiState.error}</Alert>}
      {apiState.data && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {apiState.endpoint} Response:
          </Typography>
          <Box sx={{ 
            backgroundColor: '#000000', 
            p: 2, 
            borderRadius: 1,
            overflow: 'scroll' 
          }}>
            <pre>{JSON.stringify(apiState.data, null, 2)}</pre>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default ApiTest;
