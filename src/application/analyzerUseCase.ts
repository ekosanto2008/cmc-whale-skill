import { CmcClient } from '../infrastructure/cmcClient';
import { GeminiClient } from '../infrastructure/geminiClient';

export class AnalyzerUseCase {
  constructor(
    private readonly cmcClient: CmcClient,
    private readonly geminiClient: GeminiClient
  ) {}

  public async execute(): Promise<void> {
    console.log('[AnalyzerUseCase] Initiating market scan...');

    try {
      const tokens = await this.cmcClient.fetchTopTokens();
      const formattedData = this.formatMarketData(tokens);
      
      console.log('[AnalyzerUseCase] Market data formatted, generating strategy spec...');
      const strategy = await this.geminiClient.generateStrategy(formattedData);

      console.log('\n--- QUANTITATIVE STRATEGY SPECIFICATION ---\n');
      console.log(strategy);
      console.log('\n-------------------------------------------\n');

    } catch (error) {
      console.error('[AnalyzerUseCase] Execution failed:', error);
    }
  }

  private formatMarketData(tokens: any[]): string {
    let dataText = "Top 10 Cryptocurrencies Data:\n\n";
    tokens.forEach((t, i) => {
      dataText += `${i + 1}. ${t.name} (${t.symbol}) | Price: $${t.quote.USD.price.toFixed(2)} | Vol 24h: $${t.quote.USD.volume_24h.toFixed(2)} | Change 24h: ${t.quote.USD.percent_change_24h.toFixed(2)}%\n`;
    });
    return dataText;
  }
}
