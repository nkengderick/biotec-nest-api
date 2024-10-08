import { IsOptional, IsString, IsDate, IsEnum, IsUrl, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateEventDto {
  @ApiPropertyOptional({
    description: 'The title of the event',
    example: 'Updated Biotech Conference Title',
  })
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  readonly title?: string;

  @ApiPropertyOptional({
    description: 'A brief text overview of the event (optional)',
    example:
      'An updated short summary of the event purpose and key highlights.',
  })
  @IsOptional()
  @IsString({ message: 'Summary must be a string' })
  readonly summary?: string;

  @ApiPropertyOptional({
    description:
      'A detailed description of the event in HTML format (optional)',
    example: '<p>Updated HTML content of the biotech conference...</p>',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'The start time of the event',
    example: '2024-10-18T09:00:00Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Start time must be a valid date' })
  readonly startTime?: Date;

  @ApiPropertyOptional({
    description: 'The end time of the event',
    example: '2024-10-18T17:00:00Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'End time must be a valid date' })
  readonly endTime?: Date;

  @ApiPropertyOptional({
    description: 'Location of the event (physical or virtual link)',
    example: 'Los Angeles, CA',
  })
  @IsOptional()
  @IsString({ message: 'Location must be a string' })
  readonly location?: string;

  @ApiPropertyOptional({
    description: 'The type of event (online, physical, or hybrid)',
    example: 'physical',
    enum: ['online', 'physical', 'hybrid'],
  })
  @IsOptional()
  @IsEnum(['online', 'physical', 'hybrid'], {
    message: 'Event type must be online, physical, or hybrid',
  })
  readonly eventType?: string;

  @ApiPropertyOptional({
    description: 'URL for the event image (optional)',
    example: 'http://example.com/updated-event-image.png',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Event image must be a valid URL' })
  readonly eventImageUrl?: string;

  @ApiPropertyOptional({
    description: `The registration deadline for the event.  
    **⚠️ Important:** A scheduled **cron job** will automatically close registration by setting **\`isRegistrationOpen\`** to **\`false\`** once this deadline is met.`,
    example: '2024-10-10T23:59:59Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Registration deadline must be a valid date' })
  readonly registrationDeadline?: Date;

  @ApiPropertyOptional({
    description: `Indicates if registration is currently open (optional).  
    **ℹ️ Note:** This field will automatically be set to **\`false\`** by a **cron job** after the **\`registrationDeadline\`** passes.`,
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isRegistrationOpen must be a boolean' })
  readonly isRegistrationOpen?: boolean;
}
