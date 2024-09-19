import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignSpeakerDto {
  @ApiProperty({
    description: 'The ID of the event',
    example: '6149fcf09b2e45b9a5f8e589',
  })
  @IsNotEmpty({ message: 'Event ID is required' })
  @IsString({ message: 'Event ID must be a string' })
  readonly eventId: string;

  @ApiProperty({
    description: 'The ID of the member assigned as a speaker',
    example: '6151e4a20d5d45ccaa8e688e',
  })
  @IsNotEmpty({ message: 'Member ID is required' })
  @IsString({ message: 'Member ID must be a string' })
  readonly memberId: string;

  @ApiProperty({
    description: 'The role of the member in the event',
    example: 'Keynote Speaker',
  })
  @IsNotEmpty({ message: 'Speaker role is required' })
  @IsString({ message: 'Speaker role must be a string' })
  readonly speakerRole: string;
}
