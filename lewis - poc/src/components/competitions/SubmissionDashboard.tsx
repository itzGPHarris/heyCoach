// SubmissionDashboard.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  TextField,
  Stack, IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import SubmissionCard from './SubmissionCard';
import type { SubmissionDashboardProps, Submission } from './types';

const SubmissionDashboard: React.FC<SubmissionDashboardProps> = ({
  open,
  onClose,
  onCreateNew
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - would come from your data store
  const submissions: Submission[] = [
    {
      id: '1',
      name: 'Radiant Hue Pitch',
      competitionName: 'Mentor Madness 2024',
      date: 'Feb 20, 2024',
      status: 'submitted',
      teamSize: 4
    },
    {
      id: '2',
      name: 'Product Demo v2',
      competitionName: 'Startup Weekend',
      date: 'Feb 15, 2024',
      status: 'draft',
      teamSize: 3
    }
  ];

  const handlePreview = (id: string) => {
    console.log('Preview submission:', id);
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

  const filteredSubmissions = submissions.filter(sub =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.competitionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Submissions Dashboard</Typography>
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onCreateNew}
            >
              Create New
            </Button>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            placeholder="Search submissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Stack spacing={2} sx={{ maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}>
            {filteredSubmissions.map(submission => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                onPreview={handlePreview}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionDashboard;