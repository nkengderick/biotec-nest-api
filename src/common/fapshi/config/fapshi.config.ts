import { registerAs } from '@nestjs/config';

export const FapshiConfig = registerAs('fapshi', () => ({
  baseUrl: process.env.FAPSHI_BASE_URL,
  apiUser: process.env.FAPSHI_API_USER,
  apiKey: process.env.FAPSHI_API_KEY,
  redirectUrl: process.env.FRONTEND_URL,
}));
