import { ApiProperty } from '@nestjs/swagger';

export class ChatbotMessageDto {
  @ApiProperty({
    description: 'The message sent by the user to the chatbot',
    example: 'Hello, how can I book a service?',
  })
  message: string;
}
