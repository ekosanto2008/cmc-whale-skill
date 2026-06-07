import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CmcClient } from '../src/infrastructure/cmcClient';
import { GeminiClient } from '../src/infrastructure/geminiClient';
import { AnalyzerUseCase } from '../src/application/analyzerUseCase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers untuk jaga-jaga
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const cmcClient = new CmcClient();
    const geminiClient = new GeminiClient();
    const analyzerUseCase = new AnalyzerUseCase(cmcClient, geminiClient);

    const strategy = await analyzerUseCase.execute();
    res.status(200).json({ success: true, data: strategy });
  } catch (error: any) {
    console.error("[Vercel API Error]", error);
    res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
}
