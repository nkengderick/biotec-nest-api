import * as dotenv from 'dotenv';

dotenv.config(); // Ensure that dotenv loads the .env variables first

export const ChatbotConfig = {
  botpressUrl:
    process.env.BOTPRESS_URL || 'http://localhost:3000/api/v1/bots/default_bot',
  botpressUser: process.env.BOTPRESS_USER || 'default_user',
};
