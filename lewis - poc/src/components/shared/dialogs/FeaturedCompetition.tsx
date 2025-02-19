import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  Link,
  IconButton,
  Collapse,
  Paper,
  Stack,
  styled
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Storefront as SponsorIcon,
  //PlayCircle as PlayCircleIcon
} from '@mui/icons-material';
import MuxPlayer from "@mux/mux-player-react";
import { COMPETITION_ICONS } from '../../../utils/mediaResources';

type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
};

type FeaturedCompetitionProps = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  welcomeVideoUrl: string;
  sponsorName: string;
  sponsorUrl: string;
  leaderboard: LeaderboardEntry[];
  onSubmit: (competitionId: string) => void;
  disabled: boolean;
};

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,  // Lighter border color
  borderRadius: theme.spacing(2),  // Rounded corners
  background: `linear-gradient(45deg, ${theme.palette.primary.dark}0D, ${theme.palette.background.paper})`,
  margin: theme.spacing(2, 0),  // Vertical margin
  '& .MuiCardHeader-root': {
  padding: theme.spacing(3),  // More padding in header
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3),  // More padding in content
  },
  // Optional: hover effect
  '&:hover': {
    borderColor: theme.palette.primary.light,
    transition: 'border-color 0.3s ease'
  }
}));


const LogoWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 80,
  height: 80,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius
  }
}));
const challengIconURL = COMPETITION_ICONS.IMPACT_CHALLENGE;

const TrophyBadge = styled(Box)({
  position: 'absolute',
  top: -8,
  right: -30,
  borderRadius: '50%',
  padding: 0
});

{/*const VideoPlaceholder = styled(Paper)(({ theme }) => ({
  aspectRatio: '16/9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover,
  marginBottom: theme.spacing(3)
}));*/}

const LeaderboardItem = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isTopThree'
})<{ isTopThree?: boolean }>(({ theme, isTopThree }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: isTopThree ? theme.palette.warning.light + '1A' : theme.palette.background.default
}));

const FeaturedCompetition = ({
  id,
  name,
  description,
  //logoUrl,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  welcomeVideoUrl,
  sponsorName,
  sponsorUrl,
  leaderboard,
  onSubmit,
  disabled
}: FeaturedCompetitionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <StyledCard elevation={3}>
      <CardHeader
        avatar={
          <LogoWrapper>
            <img src={challengIconURL} alt="Challenge Icon" />
            <TrophyBadge>
              <TrophyIcon sx={{ color: "#fff", opacity: 0, }} />
            </TrophyBadge>
          </LogoWrapper>
        }
        action={
          <IconButton
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label="show more"
          >
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
        title={
          <Typography variant="h6" component="h2">
            {name}
          </Typography>
        }
        subheader={
          <Stack direction="row" alignItems="center" spacing={1}>
            <SponsorIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              Sponsored by{' '}
              <Link
                href={sponsorUrl}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                {sponsorName}
              </Link>
            </Typography>
          </Stack>
        }
      />

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
          <Box sx={{ mt:2}}>
                <MuxPlayer
                  streamType="on-demand"
                  playbackId="ulXSeoy4rgSxgL02hqIlr58BZ66aiXqflANbiakPKLiM" // 🔹 Replace with real competition admin video
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    aspectRatio: "16 / 9",
                  }}
                />
              </Box>
          {/* Video Player Placeholder
          <VideoPlaceholder>
            <Stack spacing={1} alignItems="center">
              <PlayCircleIcon sx={{ fontSize: 48 }} color="action" />
              <Typography variant="body2" color="text.secondary">
                Welcome Video
              </Typography>
            </Stack>
          </VideoPlaceholder> */}

          {/* Leaderboard */}
          <Box mb={3}>
            <Typography variant="h6" gutterBottom sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1 
            }}>
              <TrophyIcon color="warning" />
              Current Standings
            </Typography>
            {leaderboard.map(entry => (
              <LeaderboardItem 
                key={entry.rank} 
                isTopThree={entry.rank <= 3}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography
                    variant="h6"
                    color={entry.rank <= 3 ? 'warning.main' : 'text.secondary'}
                  >
                    #{entry.rank}
                  </Typography>
                  <Typography variant="body1">
                    {entry.name}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {entry.score} points
                </Typography>
              </LeaderboardItem>
            ))}
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={() => onSubmit(id)}
            disabled={disabled}
          >
            Submit My Pitch
          </Button>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

export default FeaturedCompetition;