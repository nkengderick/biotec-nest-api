import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ChatbotConfig } from 'src/common/config/chatbot.config';

@Injectable()
export class ChatbotService {
  private botpressUrl = ChatbotConfig.botpressUrl;
  private botpressUser = ChatbotConfig.botpressUser;

  async sendMessage(userMessage: string) {
    try {
      const response = await axios.post(`${this.botpressUrl}/converse`, {
        text: userMessage,
        user: this.botpressUser,
      });

      return response.data;
    } catch (error) {
      console.error('Error interacting with chatbot:', error);
      throw error;
    }
  }
}
