/* eslint-disable @typescript-eslint/no-unused-vars */
// ModernSubmissionForm.tsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Grid,
  Divider,
  Chip,
  FormHelperText,
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  PlayArrow as PlayIcon
} from '@mui/icons-material';
import { Competition, Submission, SubmissionData, TeamMember } from './types';

interface TeamMemberInputProps {
  onAdd: (member: TeamMember) => void;
}

// Team member input component
const TeamMemberInput: React.FC<TeamMemberInputProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      onAdd({
        id: Date.now().toString(),
        name: name.trim(),
        role: role.trim() || 'Team Member',
        email: email.trim()
      });
      setName('');
      setRole('');
      setEmail('');
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Team member name"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            onClick={handleAdd}
            startIcon={<AddIcon />}
            disabled={!name.trim()}
            fullWidth
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

interface ModernSubmissionFormProps {
  open: boolean;
  competition: Competition;
  existingSubmission?: Submission;
  onClose: () => void;
  onBack: () => void;
  onSubmit: (data: SubmissionData) => Promise<void>;
}

const ModernSubmissionForm: React.FC<ModernSubmissionFormProps> = ({
  open,
  competition,
  existingSubmission,
  onClose,
  onBack,
  onSubmit
}) => {
  const theme = useTheme(); 
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // Form state
  const [formData, setFormData] = useState<SubmissionData>({
    title: '',
    description: '',
    video: null,
    videoPreview: '',
    website: '',
    team: [],
    categories: []
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    video?: string;
  }>({});

  // Available colors/categories for selection
  const availableCategories = [
    { id: 'black', label: 'BLACK', color: '#000000' },
    { id: 'white', label: 'WHITE', color: '#FFFFFF', textColor: '#000000' },
    { id: 'grey', label: 'GREY', color: '#9E9E9E' },
    { id: 'yellow', label: 'YELLOW', color: '#FFC107' },
    { id: 'blue', label: 'BLUE', color: '#2196F3' },
    { id: 'purple', label: 'PURPLE', color: '#9C27B0' },
    { id: 'green', label: 'GREEN', color: '#4CAF50' },
    { id: 'red', label: 'RED', color: '#F44336' },
    { id: 'pink', label: 'PINK', color: '#E91E63' },
    { id: 'orange', label: 'ORANGE', color: '#FF9800' },
    { id: 'gold', label: 'GOLD', color: '#FFD700' },
    { id: 'silver', label: 'SILVER', color: '#C0C0C0', textColor: '#000000' }
  ];

  // Initialize form with existing submission data if available
  useEffect(() => {
    if (existingSubmission) {
      setFormData({
        title: existingSubmission.name,
        description: existingSubmission.description,
        video: null, // Can't populate File object from existing submission
        videoPreview: existingSubmission.video.thumbnailUrl,
        website: '',
        team: existingSubmission.team,
        categories: ['blue', 'purple', 'green', 'red'] // Mock data based on mockup
      });
    }
  }, [existingSubmission]);

  const validateForm = (): boolean => {
    const newErrors = {
      title: !formData.title.trim() ? 'Pitch name is required' : undefined,
      description: !formData.description.trim() ? 'Description is required' : undefined,
      video: !formData.video && !formData.videoPreview ? 'Video is required' : undefined
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const file = event.target.files?.[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          video: file,
          videoPreview: URL.createObjectURL(file)
        }));
        setErrors(prev => ({ ...prev, video: undefined }));
      }
      setUploading(false);
    }, 1500);
  };

  const handleVideoRemove = () => {
    if (formData.videoPreview && formData.video) {
      URL.revokeObjectURL(formData.videoPreview);
    }
    
    setFormData(prev => ({
      ...prev,
      video: null,
      videoPreview: ''
    }));
  };

  const handleAddTeamMember = (member: TeamMember) => {
    setFormData(prev => ({
      ...prev,
      team: [...prev.team, member]
    }));
  };

  const handleRemoveTeamMember = (id: string) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.filter(member => member.id !== id)
    }));
  };

  const toggleCategory = (categoryId: string) => {
    setFormData(prev => {
      const categories = prev.categories || [];
      if (categories.includes(categoryId)) {
        return {
          ...prev,
          categories: categories.filter(id => id !== categoryId)
        };
      } else {
        return {
          ...prev,
          categories: [...categories, categoryId]
        };
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          maxWidth: "800px",
          width: '100%',
          height: fullScreen ? '100%' : '95vh',
          maxHeight: '95vh',
          margin: 2,
          borderRadius: 2
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
              {existingSubmission ? 'Edit Submission' : 'Create New Submission'}
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
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            px: 3,
            py: 3
          }}
        >
          {/* AI Coach feedback */}
          <Box 
            sx={{ 
              display: 'flex', 
              mb: 4, 
              bgcolor: 'primary.50', 
              p: 2, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'primary.100'
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main', 
                mr: 2,
                width: 40,
                height: 40
              }}
            >
              C
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Here is the pitch I recommend for this competition
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Based on your past submissions and the competition requirements
              </Typography>
            </Box>
          </Box>

          {/* Video upload/preview */}
          <Box sx={{ mb: 4 }}>
          {formData.videoPreview ? (
  <Box
    sx={{
      position: 'relative',
      borderRadius: 2,
      overflow: 'hidden',
      height: 240,
      bgcolor: 'black',
      '&:hover .video-controls': {
        opacity: 1
      }
    }}
  >
    <Box
      component="img"
      src={formData.videoPreview}
      alt="Video preview"
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
    
    <Box
      className="video-controls"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.3)',
        opacity: 0.7,
        transition: 'opacity 0.2s'
      }}
    >
      <IconButton
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark'
          },
          mr: 2
        }}
      >
        <PlayIcon />
      </IconButton>
      <IconButton
        onClick={handleVideoRemove}
        sx={{
          bgcolor: 'error.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'error.dark'
          }
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  </Box>
) : (
  <Box
    sx={{
      position: 'relative',
      border: '2px dashed',
      borderColor: errors.video ? 'error.main' : 'divider',
      borderRadius: 2,
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 240,
      bgcolor: errors.video ? 'error.50' : 'background.default',
      transition: 'all 0.2s'
    }}
  >
    {uploading ? (
      <CircularProgress size={40} sx={{ mb: 2 }} />
    ) : (
      <UploadIcon 
        sx={{ 
          fontSize: 40, 
          mb: 2,
          color: errors.video ? 'error.main' : 'action.active' 
        }} 
      />
    )}
    
    <Typography 
      variant="body1" 
      gutterBottom
      color={errors.video ? 'error' : 'text.primary'}
    >
      {uploading ? 'Uploading video...' : 'Upload your pitch video'}
    </Typography>
    
    <Typography 
      variant="body2" 
      color={errors.video ? 'error' : 'text.secondary'}
      gutterBottom
      textAlign="center"
    >
      Drag and drop your video file here, or click to browse
    </Typography>
    
    <Typography 
      variant="caption" 
      color={errors.video ? 'error' : 'text.secondary'}
    >
      Supported formats: MP4, MOV, AVI (max 500MB)
    </Typography>
    
    {/* Fixed the input to only cover the upload area */}
    <Box
      component="label"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: uploading ? 'default' : 'pointer',
      }}
    >
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        style={{
          position: 'absolute',
          opacity: 0,
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
        disabled={uploading}
      />
    </Box>
  </Box>
)}

            
            {formData.videoPreview && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  mt: 2
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mr: 1 }}
                >
                  Submit this version
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ ml: 1 }}
                >
                  Choose a different version
                </Button>
              </Box>
            )}
            
            {errors.video && (
              <FormHelperText error>{errors.video}</FormHelperText>
            )}
          </Box>

          {/* Basic information */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Team name"
              value={formData.title}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, title: e.target.value }));
                setErrors(prev => ({ ...prev, title: undefined }));
              }}
              error={!!errors.title}
              helperText={errors.title}
              placeholder="Enter your team name"
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, description: e.target.value }));
                setErrors(prev => ({ ...prev, description: undefined }));
              }}
              error={!!errors.description}
              helperText={errors.description}
              placeholder="Describe your submission"
              multiline
              rows={4}
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              label="Executive Summary Link"
              value={formData.website || ''}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, website: e.target.value }));
              }}
              placeholder="https://link"
              sx={{ mb: 1 }}
            />
            
            <Button
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
              sx={{ mb: 3 }}
            >
              Edit links
            </Button>
          </Box>

          {/* Categories */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Categories
              </Typography>
              <Typography 
                variant="caption" 
                color="primary" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  bgcolor: 'primary.50',
                  p: 0.5,
                  px: 1,
                  borderRadius: 10
                }}
              >
                1
              </Typography>
            </Box>
            
            <Grid container spacing={1} sx={{ mb: 3 }}>
              {availableCategories.map(category => (
                <Grid item key={category.id}>
                  <Chip
                    label={category.label}
                    onClick={() => toggleCategory(category.id)}
                    sx={{
                      bgcolor: category.color,
                      color: category.textColor || 'white',
                      opacity: formData.categories?.includes(category.id) ? 1 : 0.7,
                      '&:hover': {
                        opacity: 1
                      }
                    }}
                    clickable
                    variant={formData.categories?.includes(category.id) ? 'filled' : 'outlined'}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Team members */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Teammates
            </Typography>
            
            {formData.team && formData.team.length > 0 ? (
              <Box sx={{ mb: 3 }}>
                {formData.team.map((member, index) => (
                  <Box 
                    key={member.id || index}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      p: 1.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1
                    }}
                  >
                    <Avatar sx={{ mr: 2 }}>
                      {member.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1">{member.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.role || 'Team Member'} {member.email && `• ${member.email}`}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleRemoveTeamMember(member.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                No team members added yet.
              </Typography>
            )}
            
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              fullWidth
              sx={{ mb: 2 }}
            >
              Edit teammates
            </Button>
            
            <Divider sx={{ mb: 3 }} />
            
            <TeamMemberInput onAdd={handleAddTeamMember} />
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button 
              variant="outlined" 
              color="error"
              sx={{ flex: 1 }}
            >
              Delete
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.videoPreview}
              sx={{ flex: 2 }}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
            
            <Button
              variant="contained"
              color="secondary"
              sx={{ flex: 2 }}
            >
              Un-publish
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModernSubmissionForm;