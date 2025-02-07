import React, { useState } from "react";
import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Collapse,
} from "@mui/material";
import MuxPlayer from "@mux/mux-player-react";

interface LeaderData {
  rank: number;
  name: string;
  submissionName: string;
  submissionDetails: string;
  points: number;
  videoId: string; // ✅ MUX Video ID
  submissionLink: string; // ✅ Submission link
}

interface LeaderboardProps {
  leaders: LeaderData[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaders }) => {
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  const togglePreview = (rank: number) => {
    setSelectedRank(selectedRank === rank ? null : rank); // ✅ Toggle open/close per row
  };

  return (
    <Box sx={{ mt: 2, backgroundColor: "#f8f8f8", p: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>🏆 Leaderboard</Typography>
      
      <TableContainer component={Paper}>
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
            {leaders.map((leader, index) => (
              <React.Fragment key={index}>
                {/* 🔹 Leaderboard Row */}
                <TableRow
                  style={{ cursor: "pointer", backgroundColor: selectedRank === leader.rank ? "#d3e3fc" : "inherit" }}
                  onClick={() => togglePreview(leader.rank)}
                  hover
                >
                  <TableCell>{leader.rank}</TableCell>
                  <TableCell><Avatar>{leader.name[0]}</Avatar></TableCell>
                  <TableCell>{leader.name}</TableCell>
                  <TableCell>{leader.submissionName}</TableCell>
                  <TableCell>{leader.points}</TableCell>
                </TableRow>

                {/* 🔹 Submission Preview (Expands inside the table row) */}
                <TableRow>
                  <TableCell colSpan={5} style={{ padding: 0, borderBottom: "none" }}>
                    <Collapse in={selectedRank === leader.rank} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: 1 }}>
                        
                        {/* 🔹 MUX Video Preview */}
                        <MuxPlayer
                          streamType="on-demand"
                          playbackId={leader.videoId} // ✅ Displays the selected leader's video
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            aspectRatio: "16 / 9",
                          }}
                        />

                        {/* 🔹 Submission Details (Ensures always visible) */}
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>Submission Details:</Typography>
                          <Typography variant="body2">
                            {leader.submissionDetails || "This is a placeholder submission description. It gives insight into the key highlights of the pitch, focusing on clarity, engagement, and effectiveness."}
                          </Typography>
                        </Box>

                        {/* 🔹 Submission Link */}
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ mt: 2 }}
                          href={leader.submissionLink}
                          target="_blank"
                        >
                          View Full Submission
                        </Button>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leaderboard;

