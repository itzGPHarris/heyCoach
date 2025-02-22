import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Tabs,
  Tab,
  Stack,
  IconButton,
  TextField,
} from '@mui/material';
import {
  Share as ShareIcon,
  Close as CloseIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import CompetitionCard from './CompetitionCard';
import CompetitionPreview from './CompetitionPreview';
import type { Competition, CompetitionHubProps } from './types';


const CompetitionHub: React.FC<CompetitionHubProps> = ({
  open,
  onClose
}) => {
  // Tab and filtering state
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewCompetition, setPreviewCompetition] = useState<Competition | null>(null);

  // Sample data - would come from your data store
  const competitions: Competition[] = [
    {
      id: '1',
      title: 'Mentor Madness 2024',
      description: 'The most exciting business competition on the Internet!',
      dates: {
        start: 'June 17th, 2024',
        end: 'July 5th, 2024',
        submissionDeadline: 'July 5th, 2024'
      },
      prizes: {
        grandPrize: '$25,000',
        firstPlace: '$15,000',
        runnerUp: '$10,000'
      },
      status: 'ongoing',
      rules: [
        'Submit a 1-3 minute video pitch',
        'Original ideas only',
        'Clear business model required'
      ],
      maxTeamSize: 4,
      eligibility: [
        'Open to all startups less than 2 years old',
        'Must have a working prototype',
        'International participants welcome'
      ]
    }
    // Add more sample competitions as needed
  ];

  // Event handlers
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePreview = (competition: Competition) => {
    setPreviewCompetition(competition);
  };

  const handleClosePreview = () => {
    setPreviewCompetition(null);
  };

  const handleEnterCompetition = (id: string) => {
    console.log('Entering competition:', id);
    // Implementation
  };

  const handleViewLeaderboard = (id: string) => {
    console.log('Viewing leaderboard:', id);
    // Implementation
  };

  const handleViewSubmission = (id: string) => {
    console.log('Viewing submission:', id);
    // Implementation
  };

  // Filter competitions based on search and tab
  const filteredCompetitions = competitions.filter(comp => {
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 0 ? true : // Featured
                      activeTab === 1 ? comp.status === 'ongoing' : // Active
                      comp.status === 'past'; // Past
    
    return matchesSearch && matchesTab;
  });

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">My Competitions</Typography>
            <Box>
              <IconButton size="small" onClick={() => {}}>
                <ShareIcon />
              </IconButton>
              <IconButton size="small" onClick={onClose} sx={{ ml: 1 }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              aria-label="competition tabs"
            >
              <Tab label="Featured" />
              <Tab label="Active" />
              <Tab label="Past" />
            </Tabs>
          </Box>

          <Box sx={{ mt: 2, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search competitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
              }}
              size="small"
            />
          </Box>

          <Stack spacing={2} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
            {filteredCompetitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                competition={competition}
                onPreview={handlePreview}
                onEnter={handleEnterCompetition}
                onViewLeaderboard={handleViewLeaderboard}
                onViewSubmission={handleViewSubmission}
              />
            ))}
            {filteredCompetitions.length === 0 && (
              <Box textAlign="center" py={4}>
                <Typography color="text.secondary">
                  No competitions found matching your criteria
                </Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>
      </Dialog>

      <CompetitionPreview
        competition={previewCompetition}
        open={!!previewCompetition}
        onClose={handleClosePreview}
        onEnterCompetition={handleEnterCompetition}
      />
    </>
  );
};

export default CompetitionHub;