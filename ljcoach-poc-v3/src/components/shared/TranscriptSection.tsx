import { Box, Typography, Paper } from '@mui/material';

interface TranscriptEntry {
  time: string;
  text: string;
}

const TranscriptSection = ({ transcript }: { transcript: string }) => {
  const entries: TranscriptEntry[] = transcript.split('\n').map((line, index) => ({
    time: formatTime(index * 15),
    text: line
  }));

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Transcript</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {entries.map((entry, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ minWidth: 45 }}>
              {entry.time}
            </Typography>
            <Typography variant="body2">
              {entry.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default TranscriptSection;