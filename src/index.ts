import express from 'express';
import cors from 'cors';
import path from 'path';
import { CmcClient } from './infrastructure/cmcClient';
import { GeminiClient } from './infrastructure/geminiClient';
import { AnalyzerUseCase } from './application/analyzerUseCase';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

const cmcClient = new CmcClient();
const geminiClient = new GeminiClient();
const analyzerUseCase = new AnalyzerUseCase(cmcClient, geminiClient);

app.get('/api/analyze', async (req, res) => {
  try {
    const strategy = await analyzerUseCase.execute();
    res.json({ success: true, data: strategy });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`[Server] CMC Whale Skill GUI running at http://localhost:${port}`);
});
