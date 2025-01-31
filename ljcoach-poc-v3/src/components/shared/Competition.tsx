import { useState } from "react";
import { Box, Card, CardHeader, CardContent, Typography, Button, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from "@mui/material";
import { Trophy, Clock } from "lucide-react";
import SubmissionPreview from "./SubmissionPreview";

const mockCompetition = {
  title: "Startup Pitch Challenge",
  description: "Compete with the best startup founders!",
  prize: "$10,000 Prize",
  deadline: "March 15, 2025",
  status: "Open for Submissions",
};

const mockLeaders = [
  { rank: 1, name: "Alice", submissionName: "GreenTech Pitch", points: 95, submissionContent: "A groundbreaking pitch on sustainable energy solutions." },
  { rank: 2, name: "Bob", submissionName: "AI for Healthcare", points: 90, submissionContent: "An AI-driven solution for early disease detection." },
  { rank: 3, name: "Charlie", submissionName: "FinTech Innovation", points: 85, submissionContent: "Revolutionizing financial transactions with blockchain." },
];

interface Leader {
  rank: number;
  name: string;
  submissionName: string;
  points: number;
  submissionContent: string;
}

const Competition = () => {
  const [isCompetitionExpanded, setIsCompetitionExpanded] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Leader | null>(null);

  return (
    <Card sx={{ mb: 4, borderLeft: "5px solid gold" }}>
      <CardHeader title={mockCompetition.title} subheader={mockCompetition.description} />
      <CardContent>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <Trophy size={24} color="gold" />
          <Typography variant="body2">{mockCompetition.prize}</Typography>
          <Clock size={18} color="gray" />
          <Typography variant="body2">Deadline: {mockCompetition.deadline}</Typography>
        </Box>
        <Typography variant="body2" color="primary">{mockCompetition.status}</Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => setIsCompetitionExpanded(!isCompetitionExpanded)}>
            {isCompetitionExpanded ? "Hide Details" : "View Details"}
          </Button>
          <Button variant="contained" color="primary">Submit My Pitch</Button>
        </Box>
        <Collapse in={isCompetitionExpanded}>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Profile</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Submission</TableCell>
                  <TableCell>Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockLeaders.map((leader, index) => (
                  <TableRow key={index} style={{ cursor: "pointer" }} onClick={() => setSelectedSubmission(leader)}>
                    <TableCell>{leader.rank}</TableCell>
                    <TableCell><Avatar>{leader.name[0]}</Avatar></TableCell>
                    <TableCell>{leader.name}</TableCell>
                    <TableCell>{leader.submissionName}</TableCell>
                    <TableCell>{leader.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </CardContent>
      <SubmissionPreview open={!!selectedSubmission} submission={selectedSubmission} onClose={() => setSelectedSubmission(null)} />
    </Card>
  );
};

export default Competition;
