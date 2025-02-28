/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box, Dialog,
  IconButton,
  Stack
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { VideoUpload, BasicInfo, TeamSection } from './components';
import type { Competition, Submission, TeamMember } from './types';

interface SubmissionFormProps {
  competition: Competition;
  onBack: () => void;
  onClose: () => void;
  onSubmit: (data: SubmissionData) => Promise<void>;
  onViewSubmissions: () => void;
  existingSubmission: Submission | null;
  open: boolean;


}

interface SubmissionData {
  title: string;
  description: string;
  video: File | null;
  videoPreview?: string;
  website?: string;
  team: TeamMember[];
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  competition,
  open = true, // Add default value here
  onBack,
  onClose,
  onSubmit,
  onViewSubmissions,
  existingSubmission,
}) => {

  // Form state
  const [formData, setFormData] = useState<SubmissionData>({
    title: '',
    description: '',
    video: null,
    website: '',
    team: []
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    video?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors = {
      title: !formData.title.trim() ? 'Title is required' : undefined,
      description: !formData.description.trim() ? 'Description is required' : undefined,
      video: !formData.video ? 'Video is required' : undefined
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVideoUpload = (file: File) => {
    setFormData(prev => ({
      ...prev,
      video: file,
      videoPreview: URL.createObjectURL(file)
    }));
    setErrors(prev => ({ ...prev, video: undefined }));
  };

  const handleVideoRemove = () => {
    if (formData.videoPreview) {
      URL.revokeObjectURL(formData.videoPreview);
    }
    setFormData(prev => ({
      ...prev,
      video: null,
      videoPreview: undefined
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

  return (
    <Dialog
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              maxWidth: "800px",
              width: '100%',
              maxHeight: '95vh',
              margin: 2,
              borderRadius: 2
            }
          }}
        >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={onBack} size="small">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">
              Submit to {competition.title}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {/* Video Upload Section */}
          <VideoUpload
            videoFile={formData.video}
            videoPreview={formData.videoPreview}
            onVideoUpload={handleVideoUpload}
            onVideoRemove={handleVideoRemove}
            error={errors.video}
          />

          {/* Basic Info Section */}
          <BasicInfo
            title={formData.title}
            description={formData.description}
            website={formData.website}
            onTitleChange={(title) => {
              setFormData(prev => ({ ...prev, title }));
              setErrors(prev => ({ ...prev, title: undefined }));
            }}
            onDescriptionChange={(description) => {
              setFormData(prev => ({ ...prev, description }));
              setErrors(prev => ({ ...prev, description: undefined }));
            }}
            onWebsiteChange={(website) => {
              setFormData(prev => ({ ...prev, website }));
            }}
            errors={{
              title: errors.title,
              description: errors.description
            }}
          />

          {/* Team Section */}
          <TeamSection
            members={formData.team}
            onAddMember={handleAddTeamMember}
            onRemoveMember={handleRemoveTeamMember}
          />

          {/* Action Buttons */}
          <Box sx={{ mt: 4 }}>
            <Stack spacing={2}>
              {isSubmitted ? (
                <>
                  <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    disabled
                  >
                    Pitch Submitted Successfully
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={onViewSubmissions}
                  >
                    View All Submissions
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={onBack}
                  >
                    Back to Competition
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.video || !formData.title || !formData.description}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Pitch'}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={onBack}
                    disabled={isSubmitting}
                  >
                    Back 
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionForm;