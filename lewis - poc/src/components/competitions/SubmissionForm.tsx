import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, Stack } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { VideoUpload, BasicInfo, TeamSection, ActionButtons } from './components';
import type { TeamMember } from './types';

interface SubmissionFormProps {
  open: boolean;
  onClose: () => void;
  competitionName: string;
  onSubmit: (data: SubmissionData) => Promise<void>;
  onSaveDraft: (data: SubmissionData) => Promise<void>;
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
  open,
  onClose,
  competitionName,
  onSubmit,
  onSaveDraft
}) => {
  const [formData, setFormData] = useState<SubmissionData>({
    title: '',
    description: '',
    video: null,
    website: '',
    team: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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
      onClose();
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

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{competitionName} Submission</Typography>
          <Button
            startIcon={<CloseIcon />}
            onClick={onClose}
            size="small"
          >
            Cancel
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <VideoUpload
            videoFile={formData.video}
            videoPreview={formData.videoPreview}
            onVideoUpload={handleVideoUpload}
            onVideoRemove={handleVideoRemove}
            error={errors.video}
          />

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

          <TeamSection
            members={formData.team}
            onAddMember={() => {
              // Will implement team member selection dialog
            }}
            onRemoveMember={(id) => {
              setFormData(prev => ({
                ...prev,
                team: prev.team.filter(member => member.id !== id)
              }));
            }}
          />

          <ActionButtons
            onSaveDraft={() => onSaveDraft(formData)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            disabled={!formData.video || !formData.title || !formData.description}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionForm;