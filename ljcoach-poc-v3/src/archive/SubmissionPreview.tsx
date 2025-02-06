import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

interface SubmissionPreviewProps {
  open: boolean;
  submission: { submissionName: string; submissionContent: string } | null;
  onClose: () => void;
}

const SubmissionPreview = ({ open, submission, onClose }: SubmissionPreviewProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Submission Preview</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{submission?.submissionName}</Typography>
        <Typography variant="body1">{submission?.submissionContent}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubmissionPreview;
