import { Routes, Route } from 'react-router-dom';
import FirstRunVideo from './FirstRunVideo';
import InterstitialScreen from './InterstitialScreen';


function FirstRunRoutes() {
  return (
    <Routes>
      <Route path="/first-run/video" element={<FirstRunVideo />} />
      <Route path="/first-run/interstitial" element={<InterstitialScreen />} />

      </Routes>
  );
}

export default FirstRunRoutes;
