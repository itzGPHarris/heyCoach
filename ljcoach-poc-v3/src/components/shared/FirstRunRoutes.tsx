import { Routes, Route } from 'react-router-dom';
import NewIdea from './NewIdea';
import FirstRunVideo from './FirstRunVideo';
import FirstRunDashboard from './FirstRunDashboard';
import FirstRunFeedback from './FirstRunFeedback';

function FirstRunRoutes() {
  return (
    <Routes>
      <Route path="/new-idea" element={<NewIdea firstRun />} />
      <Route path="/add-video" element={<FirstRunVideo />} />
      <Route path="/dashboard" element={<FirstRunDashboard />} />
      <Route path="/feedback" element={<FirstRunFeedback />} />
    </Routes>
  );
}

export default FirstRunRoutes;
