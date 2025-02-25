/* eslint-disable @typescript-eslint/no-unused-vars */
// SubmissionDetailView.tsx

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Grid,
  Paper,
  Divider,
  Link,
  Tab,
  Tabs,
  Card,
  CardContent,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  PlayArrow as PlayIcon,
  Download as DownloadIcon,
  Person as PersonIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import type { Submission } from './types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`submission-tabpanel-${index}`}
      aria-labelledby={`submission-tab-${index}`}
      {...other}
      style={{ paddingTop: 16 }}
    >
      {value === index && children}
    </div>
  );
}

interface SubmissionDetailViewProps {
  submission: Submission;
  onBack: () => void;
  onClose: () => void;
  onEdit: () => void;
}

const SubmissionDetailView: React.FC<SubmissionDetailViewProps> = ({
  submission,
  onBack,
  onClose,
  onEdit
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for competition results
  const competitionResults = {
    rank: 3,
    points: 500,
    feedback: "Great pitch! Your product vision is clear and the market opportunity is well-defined. Consider adding more details about your go-to-market strategy.",
    criteria: [
      { name: "Clarity", score: 9.2, outOf: 10 },
      { name: "Market Fit", score: 8.5, outOf: 10 },
      { name: "Innovation", score: 9.0, outOf: 10 },
      { name: "Feasibility", score: 7.8, outOf: 10 }
    ]
  };

  // Format competition name and status
  const formattedCompetition = `${submission.competitionName}: ${competitionResults.points} points, ${competitionResults.rank}${getOrdinalSuffix(competitionResults.rank)} place`;
  const formattedStatus = `Competition ended: ${submission.date}`;

  // Format category tags
  const categoryTags = ['A', 'B', 'D', 'R'];

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          maxWidth: "900px",
          width: '100%',
          height: '95vh',
          maxHeight: '95vh',
          margin: 2,
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={onBack} size="small" edge="start">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Submission Details
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent 
        sx={{ 
          p: 0,
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: 'background.default'
        }}
      >
        {/* Main content container */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          overflow: 'hidden'
        }}>
          {/* Video header section */}
          <Box 
            sx={{
              position: 'relative',
              height: 300,
              bgcolor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover .play-overlay': {
                opacity: 1
              }
            }}
          >
            {/* Video thumbnail or player would go here */}
            <Box
              component="img"
              src={submission.video.thumbnailUrl || ''}
              alt={submission.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7
              }}
            />
            
            {/* Play overlay */}
            <Box 
              className="play-overlay"
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.9,
                transition: 'opacity 0.2s'
              }}
            >
              <IconButton 
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  width: 70,
                  height: 70,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <PlayIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          </Box>

          {/* Content section */}
          <Box sx={{ flex: 1, overflow: 'auto', px: 3, py: 3 }}>
            <Grid container spacing={3}>
              {/* Left column - Submission details */}
              <Grid item xs={12} md={8}>
                {/* Competition info */}
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={formattedCompetition}
                    color="primary"
                    variant="outlined"
                    sx={{ borderRadius: 16, mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {formattedStatus}
                  </Typography>
                </Box>

                {/* Submission title */}
                <Typography 
                  variant="h4" 
                  component="h1"
                  sx={{ 
                    fontWeight: 700,
                    mb: 2
                  }}
                >
                  {submission.name}
                </Typography>

                {/* Category tags */}
                <Box 
                  sx={{ 
                    display: 'flex',
                    gap: 1,
                    mb: 3
                  }}
                >
                  {categoryTags.map((tag) => (
                    <Avatar 
                      key={tag} 
                      sx={{ 
                        bgcolor: 'secondary.light',
                        width: 30,
                        height: 30,
                        fontSize: '0.875rem'
                      }}
                    >
                      {tag}
                    </Avatar>
                  ))}
                </Box>

                {/* Tabs for different views */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange}
                    aria-label="submission tabs"
                  >
                    <Tab label="Overview" id="submission-tab-0" />
                    <Tab label="Feedback" id="submission-tab-1" />
                    <Tab label="Documents" id="submission-tab-2" />
                  </Tabs>
                </Box>

                {/* Tab panels */}
                <TabPanel value={tabValue} index={0}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Description</Typography>
                  <Typography paragraph>
                    {submission.description || "No description provided."}
                  </Typography>

                  {/* Default content if description is empty */}
                  {!submission.description && (
                    <Typography paragraph>
                      RadiantHue is a makeup brand that changes the narrative. We're dedicated to providing clean beauty products that are safe for all skin types and tones without compromising on quality or performance. Our inclusive range is designed to celebrate everyone's unique beauty using ethically sourced natural ingredients.
                    </Typography>
                  )}

                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Team Members</Typography>
                  <Grid container spacing={2}>
                    {submission.team && submission.team.map((member, index) => (
                      <Grid item xs={12} sm={6} key={member.id || index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar>
                            {member.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body1">{member.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {member.role || 'Team Member'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                    {(!submission.team || submission.team.length === 0) && (
                      <Grid item xs={12}>
                        <Typography color="text.secondary">
                          No team members added.
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Judges Feedback</Typography>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Typography paragraph>
                        {competitionResults.feedback}
                      </Typography>
                    </Paper>
                  </Box>

                  <Typography variant="h6" sx={{ mb: 2 }}>Scoring Criteria</Typography>
                  <Grid container spacing={2}>
                    {competitionResults.criteria.map((criterion, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            borderRadius: 2,
                            height: '100%'
                          }}
                        >
                          <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                              {criterion.name}
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                              {criterion.score.toFixed(1)}
                              <Typography 
                                component="span" 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ ml: 1 }}
                              >
                                / {criterion.outOf}
                              </Typography>
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Attached Documents</Typography>
                  {submission.documents && submission.documents.length > 0 ? (
                    <Grid container spacing={2}>
                      {submission.documents.map((doc, index) => (
                        <Grid item xs={12} key={index}>
                          <Paper 
                            variant="outlined" 
                            sx={{ 
                              p: 2, 
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{ bgcolor: 'primary.light' }}>
                                {doc.type === 'pdf' ? 'PDF' : doc.type.toUpperCase()}
                              </Avatar>
                              <Typography>{doc.name || `Document ${index + 1}`}</Typography>
                            </Box>
                            <IconButton>
                              <DownloadIcon />
                            </IconButton>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography color="text.secondary">
                      No documents attached to this submission.
                    </Typography>
                  )}
                </TabPanel>
              </Grid>

              {/* Right column - Competition info and actions */}
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    mb: 3 
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>Competition Results</Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Rank</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {competitionResults.rank}<sup>{getOrdinalSuffix(competitionResults.rank)}</sup>
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Points</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {competitionResults.points}
                    </Typography>
                  </Box>
                </Paper>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Links</Typography>
                  <Box
                    component={Paper}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <LinkIcon color="primary" fontSize="small" />
                      <Link href="#" underline="hover">
                        Executive Summary
                      </Link>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <LinkIcon color="primary" fontSize="small" />
                      <Link href="#" underline="hover">
                        Company Website
                      </Link>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<EditIcon />}
                    onClick={onEdit}
                    sx={{ mb: 2 }}
                  >
                    Edit Submission
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                  >
                    Unpublish
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to get ordinal suffix
function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
}

export default SubmissionDetailView;