import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

// Mock API for testing
app.get('/competitions/current', (req, res) => {
  res.json({ message: 'Current competition data' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
