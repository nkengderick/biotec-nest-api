import { Module } from '@nestjs/common';
import { ChatbotService } from './services/chatbot.service';
import { ChatbotController } from './controllers/chatbot.controller';

@Module({
  providers: [ChatbotService],
  controllers: [ChatbotController]
})
export class ChatbotModule {}
