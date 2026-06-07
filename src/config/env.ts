import dotenv from 'dotenv';
dotenv.config();

export const config = {
  CMC_API_KEY: process.env.CMC_API_KEY || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  CMC_BASE_URL: 'https://pro-api.coinmarketcap.com',
};
