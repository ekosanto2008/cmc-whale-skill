import axios from 'axios';
import { config } from '../config/env';

export class CmcClient {
  public async fetchTopTokens(limit: number = 10): Promise<any[]> {
    if (!config.CMC_API_KEY) {
      throw new Error('CMC_API_KEY is missing');
    }

    const response = await axios.get(`${config.CMC_BASE_URL}/v1/cryptocurrency/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': config.CMC_API_KEY,
      },
      params: {
        start: 1,
        limit,
        convert: 'USD',
      },
    });

    return response.data.data;
  }
}
