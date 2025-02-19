import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Link,
  Chip,
  Avatar,
  AvatarGroup,
  Stack,
  styled
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  OpenInNew as OpenInNewIcon,
  Storefront as SponsorIcon
} from '@mui/icons-material';

type Competitor = {
  id: string;
  name: string;
  avatarUrl: string;
};

type CompetitionCardProps = {
  id: string;
  name: string;
  type: string;
  grandPrize: string;
  startDate: string;
  endDate: string;
  detailsUrl: string;
  competitors: Competitor[];
  isSponsored?: boolean;
  sponsorName?: string;
  sponsorUrl?: string;
  onEnter: (competitionId: string) => void;
  disabled: boolean;
};

const StyledCard = styled(Card)(({ theme }) => ({
  border: `2px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.primary.dark}0D, ${theme.palette.background.paper})`,
  margin: theme.spacing(1, 0),
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',  // Subtle shadow
  '& .MuiCardHeader-root': {
    padding: theme.spacing(3),
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(2),
  },
  '&:hover': {
    borderColor: theme.palette.primary.light,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',  // Larger shadow on hover
    transition: 'all 0.3s ease'
  }
}));



const CompetitionCard = ({
  id,
  name,
  type,
  grandPrize,
  startDate,
  endDate,
  detailsUrl,
  competitors,
  isSponsored,
  sponsorName,
  sponsorUrl,
  onEnter,
  disabled
}: CompetitionCardProps) => {
  return (
    <StyledCard variant="outlined">
      <CardContent>
        {/* Sponsor badge */}
        {isSponsored && sponsorName && (
          <Box mb={2}>
            <Chip
              icon={<SponsorIcon />}
              label={
                <Typography variant="body2">
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
              }
              variant="outlined"
              color="primary"
            />
          </Box>
        )}

        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6" gutterBottom>
              {name}
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                {type}
              </Typography>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrophyIcon color="warning" />
                Prize: {grandPrize}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
              </Typography>
            </Stack>
          </Box>

          <Stack spacing={1}>
            <Button
              endIcon={<OpenInNewIcon />}
              href={detailsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Details
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onEnter(id)}
              disabled={disabled}
            >
              Enter Competition
            </Button>
          </Stack>
        </Stack>

        {/* Competitors section */}
        {competitors.length > 0 && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {competitors.length} competitors
            </Typography>
            <AvatarGroup max={5} sx={{ justifyContent: 'flex-start' }}>
              {competitors.map(competitor => (
                <Avatar
                  key={competitor.id}
                  src={competitor.avatarUrl}
                  alt={competitor.name}
                  title={competitor.name}
                />
              ))}
            </AvatarGroup>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default CompetitionCard;