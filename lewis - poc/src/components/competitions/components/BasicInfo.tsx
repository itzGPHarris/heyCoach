//BasicInfo.tsx

// BasicInfo.tsx
import React from 'react';
import { Stack, TextField, Box, Button } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import type { BasicInfoProps } from '../types';

const BasicInfo: React.FC<BasicInfoProps> = ({
  title,
  description,
  website,
  onTitleChange,
  onDescriptionChange,
  onWebsiteChange,
  errors
}) => {
  return (
    <Stack spacing={2}>
      <TextField
        label="Submission Title"
        fullWidth
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        error={!!errors?.title}
        helperText={errors?.title}
      />

      <TextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        error={!!errors?.description}
        helperText={errors?.description}
      />

      <Box display="flex" gap={1}>
        <TextField
          label="Website"
          fullWidth
          placeholder="https://"
          value={website}
          onChange={(e) => onWebsiteChange(e.target.value)}
        />
        <Button variant="outlined" startIcon={<LinkIcon />}>
          Verify
        </Button>
      </Box>
    </Stack>
  );
};

export default BasicInfo;