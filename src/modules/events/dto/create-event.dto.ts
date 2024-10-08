import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
  IsUrl,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @ApiProperty({
    description: 'The title of the event',
    example: 'Biotech Innovation Conference',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  readonly title: string;

  @ApiProperty({
    description: 'A brief text overview of the event',
    example: 'A short summary of the event purpose and key highlights.',
  })
  @IsNotEmpty({ message: 'Summary is required' })
  @IsString({ message: 'Summary must be a string' })
  readonly summary: string;

  @ApiProperty({
    description: 'A detailed description of the event in HTML format',
    example:
      '<p>A conference focusing on the latest biotech innovations...</p>',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  readonly description: string;

  @ApiProperty({
    description: 'The start time of the event',
    example: '2024-10-18T09:00:00Z',
  })
  @IsNotEmpty({ message: 'Start time is required' })
  @Type(() => Date)
  @IsDate({ message: 'Start time must be a valid date' })
  readonly startTime: Date;

  @ApiProperty({
    description: 'The end time of the event',
    example: '2024-10-18T17:00:00Z',
  })
  @IsNotEmpty({ message: 'End time is required' })
  @Type(() => Date)
  @IsDate({ message: 'End time must be a valid date' })
  readonly endTime: Date;

  @ApiProperty({
    description: 'Location of the event (physical or virtual link)',
    example: 'New York City, NY',
  })
  @IsNotEmpty({ message: 'Location is required' })
  @IsString({ message: 'Location must be a string' })
  readonly location: string;

  @ApiProperty({
    description: 'The type of event (online, physical, or hybrid)',
    example: 'hybrid',
    enum: ['online', 'physical', 'hybrid'],
  })
  @IsNotEmpty({ message: 'Event type is required' })
  @IsEnum(['online', 'physical', 'hybrid'], {
    message: 'Event type must be online, physical, or hybrid',
  })
  readonly eventType: string;

  @ApiProperty({
    description: 'URL for the event image (optional)',
    example: 'http://example.com/event-image.png',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Event image must be a valid URL' })
  readonly eventImageUrl?: string;

  @ApiProperty({
    description: `The registration deadline for the event.  
    **⚠️ Important:** A scheduled **cron job** will automatically close registration by setting **\`isRegistrationOpen\`** to **\`false\`** once this deadline is met.`,
    example: '2024-10-10T23:59:59Z',
  })
  @IsNotEmpty({ message: 'Registration deadline is required' })
  @Type(() => Date)
  @IsDate({ message: 'Registration deadline must be a valid date' })
  readonly registrationDeadline: Date;

  @ApiProperty({
    description: `Indicates if registration is currently open (optional).  
    **ℹ️ Note:** This field will automatically be set to **\`false\`** by a **cron job** after the **\`registrationDeadline\`** passes.`,
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isRegistrationOpen must be a boolean' })
  readonly isRegistrationOpen?: boolean;
}
