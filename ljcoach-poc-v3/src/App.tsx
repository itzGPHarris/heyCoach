//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppShell from "./components/AppShell";
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', width:'100%', maxWidth:'800px', flexDirection: 'column' }}>

    <Router>
      <Routes>
        <Route path="/*" element={<AppShell />} /> {/* ✅ Directly loads FeedView */}
      </Routes>
    </Router>
  
  </Box>);
}

export default App;
