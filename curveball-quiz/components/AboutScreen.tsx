import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import {
  ArrowBack,
  ExpandMore,
  SportsBaseball,
  Timer,
  EmojiEvents,
  Help,
  PlayArrow,
} from '@mui/icons-material';

interface AboutScreenProps {
  onBack: () => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const theme = useTheme();

  const faqs = [
    {
      question: 'How is scoring calculated?',
      answer:
        'You score runs when runners cross home plate. Each correct answer advances runners based on the hit type (Single, Double, Triple, or Home Run). When a runner reaches home plate, you score a run.',
    },
    {
      question: 'What happens when I pass on a question?',
      answer:
        'When you pass, it counts as a strike. Three strikes equals one out. You get a maximum of three passes per game, which means only one out can be caused by passes.',
    },
    {
      question: 'How many questions are in a game?',
      answer:
        'A perfect game would involve 27 questions (equivalent to 27 outs in a complete baseball game). However, most games will end after you receive three outs.',
    },
    {
      question: 'Are the questions the same each time?',
      answer:
        'No! We have a large database of baseball trivia questions that rotate regularly. Questions are grouped by difficulty, so your Single questions will be easier than your Home Run questions.',
    },
    {
      question: 'What years do the questions cover?',
      answer:
        'Our questions cover the entire history of baseball, from the early days in the 1800s through modern MLB. Questions are categorized by era and difficulty to provide a balanced challenge for casual and hardcore fans alike.',
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        maxWidth: 800,
        mx: 'auto',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ mr: 2 }}
          color="inherit"
        >
          Back
        </Button>
        <Typography variant="h4" component="h1">
          About Curveball Quiz
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" gutterBottom>
        How to Play
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon>
            <SportsBaseball color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Choose Your Hit Type"
            secondary="Select between Single, Double, Triple, or Home Run - higher difficulty questions earn more bases"
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <PlayArrow color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Answer Questions"
            secondary="Correct answers advance runners based on your hit type. Three incorrect answers and you're out!"
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Timer color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Beat the Clock"
            secondary="Answer before time runs out - 15 seconds with no runners on base, 18 seconds with runners on base"
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <EmojiEvents color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Score Runs"
            secondary="Get runners around the bases by answering questions correctly to score runs"
          />
        </ListItem>
      </List>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Frequently Asked Questions
        </Typography>

        {faqs.map((faq, index) => (
          <Accordion key={index} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, mb: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
              sx={{ backgroundColor: theme.palette.grey[50] }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Help color="primary" sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="subtitle1">{faq.question}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box textAlign="center">
        <Typography variant="body2" color="text.secondary" paragraph>
          Curveball Quiz was created for baseball fans who love the game's rich history.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Version 1.0.0 | © 2025 Curveball Quiz
        </Typography>
      </Box>
    </Paper>
  );
};

export default AboutScreen;