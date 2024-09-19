import { IsOptional, IsString, IsDate, IsEnum, IsUrl } from 'class-validator';
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
    description: 'The description of the event',
    example: 'Updated description of the biotech conference.',
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
    description: 'The registration deadline for the event',
    example: '2024-10-10T23:59:59Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Registration deadline must be a valid date' })
  readonly registrationDeadline?: Date;
}
