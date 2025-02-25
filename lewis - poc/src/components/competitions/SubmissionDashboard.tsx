/* eslint-disable @typescript-eslint/no-unused-vars */
// SubmissionDashboard.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  Stack, 
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import EnhancedSubmissionCard from './EnhancedSubmissionCard';

import type { SubmissionDashboardProps, Submission } from './types';

const SubmissionDashboard: React.FC<SubmissionDashboardProps> = ({
  open,
  onClose,
  onCreateNew
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Commented out search functionality
 // const [searchQuery] = useState('');

  // Sample data - would come from your data store
  const submissions: Submission[] = [
    {
      id: '1',
      name: 'Radiant Hue Pitch',
      competitionName: 'Mentor Madness 2024',
      date: 'Feb 20, 2024',
      status: 'submitted',
      teamSize: 4,
      competitionId: '',
      description: '',
      createdAt: '',
      updatedAt: '',
      video: {
        url: '',
        thumbnailUrl: undefined,
        duration: undefined
      },
      documents: [],
      team: []
    },
    {
      id: '2',
      name: 'Product Demo v2',
      competitionName: 'Startup Weekend',
      date: 'Feb 15, 2024',
      status: 'draft',
      teamSize: 3,
      competitionId: '',
      description: '',
      createdAt: '',
      updatedAt: '',
      video: {
        url: '',
        thumbnailUrl: undefined,
        duration: undefined
      },
      documents: [],
      team: []
    }
  ];

  const handlePlay = (id: string) => {
    console.log('Preview submission:', id);
  };

  const handleSelect = (id: string) => {
    console.log('Select submission:', id);
  };

  const handleView = (id: string) => {
    console.log('View submission:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit submission:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete submission:', id);
  };

  // Commented out filter functionality
  const filteredSubmissions = submissions; // submissions.filter(sub =>
  function handleUnpublish(id: string): void {
    throw new Error('Function not implemented.');
  }

  

  //   sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   sub.competitionName.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullScreen={fullScreen}
      PaperProps={{
       sx: { 
            maxWidth:"800px",
            width: '100%',
            height: '95vh',
            maxHeight: '95vh',
            margin: 2,
            borderRadius: 0
            }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Submissions Dashboard</Typography>
          <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Commented out search functionality */}
        {/* <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            placeholder="Search submissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box> */}

        <Stack 
          spacing={2} 
          sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            paddingRight: 1 
          }}
        >
          {filteredSubmissions.map(submission => (
            <EnhancedSubmissionCard
            key={submission.id}
            submission={submission}
            onPlay={handlePlay}
            onEdit={handleEdit}
            onUnpublish={handleUnpublish}
            onSelect={handleSelect}
          />
          
          
          ))}
           <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onCreateNew}  // This will now open the Submission Form
              sx={{ width: '100%' }} 
            >
              Create New
            </Button>
            
          </Box>
        </Stack>
       
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionDashboard;