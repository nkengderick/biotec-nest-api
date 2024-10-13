import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAttendeeDto {
  @ApiProperty({
    description: 'The ID of the event',
    example: '6149fcf09b2e45b9a5f8e589',
  })
  @IsNotEmpty({ message: 'Event ID is required' })
  @IsString({ message: 'Event ID must be a string' })
  readonly eventId: string;

  @ApiProperty({
    description: 'The ID of the user registering for the event',
    example: '6151e4a20d5d45ccaa8e688e',
  })
  @IsNotEmpty({ message: 'User ID is required' })
  @IsString({ message: 'User ID must be a string' })
  readonly userId: string;
  
  @ApiProperty({
    description: 'Additional notes from the user about the event, including referral source and expectations',
    example: 'Heard about this event through social media; expecting to learn about networking strategies.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Notes must be a string' })
  readonly notes?: string;
}
