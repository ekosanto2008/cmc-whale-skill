import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env';

export class GeminiClient {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!config.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is missing');
    }
    this.genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });
  }

  public async generateStrategy(marketData: string): Promise<string> {
    const prompt = `Act as a Quantitative Crypto Trading Strategist.
Read the following market data and design a solid "Quantitative Trading Strategy" (backtestable spec).
Do not provide financial advice. Output only the algorithmic trading strategy specification.

Market Data:
${marketData}

Provide a report with the following format:
1. Market Overview
2. Selected Coins for Trading
3. Entry Conditions
4. Exit Conditions
5. Edge / Rationale`;

    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}
