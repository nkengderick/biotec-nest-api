import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ChatbotService } from '../services/chatbot.service';
import { ChatbotMessageDto } from '../dto/chatbot-message.dto';

@ApiTags('Chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('interact')
  @ApiOperation({
    summary: 'Interact with the chatbot',
    description: 'Send a message to the chatbot and get a response',
  }) // Describes the API operation
  @ApiBody({
    type: ChatbotMessageDto,
    description: 'Message sent by the user to the chatbot',
  }) // Defines the request body
  @ApiResponse({
    status: 200,
    description: 'The chatbot response',
    schema: {
      example: { botResponse: 'Hello! How can I assist you today?' }, // Example response
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or message format',
  })
  async interactWithChatbot(@Body() chatbotMessageDto: ChatbotMessageDto) {
    const { message } = chatbotMessageDto;
    return this.chatbotService.sendMessage(message);
  }
}
