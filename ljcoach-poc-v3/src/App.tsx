//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppShell from "./components/AppShell";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppShell />} /> {/* ✅ Directly loads FeedView */}
      </Routes>
    </Router>
  );
}

export default App;
