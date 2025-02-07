import { Box, Typography, styled } from '@mui/material';

const MessageBubble = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
}));

interface CoachChatProps {
  messages: string[];
}

const CoachChat = ({ messages }: CoachChatProps) => {
  return (
    <Box>
      {messages.map((msg, index) => (
        <MessageBubble key={index}>
          <Typography variant="body1">{msg}</Typography>
        </MessageBubble>
      ))}
    </Box>
  );
};

export default CoachChat;
