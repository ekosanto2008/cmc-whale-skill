import { CmcClient } from './infrastructure/cmcClient';
import { GeminiClient } from './infrastructure/geminiClient';
import { AnalyzerUseCase } from './application/analyzerUseCase';

async function bootstrap() {
  const cmcClient = new CmcClient();
  const geminiClient = new GeminiClient();
  const analyzerUseCase = new AnalyzerUseCase(cmcClient, geminiClient);

  await analyzerUseCase.execute();
}

bootstrap().catch((error) => {
  console.error('[Bootstrap Error]', error);
  process.exit(1);
});
