import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
  IsUrl,
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
    description: 'The description of the event',
    example: 'A conference focusing on the latest biotech innovations.',
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
    description: 'The registration deadline for the event',
    example: '2024-10-10T23:59:59Z',
  })
  @IsNotEmpty({ message: 'Registration deadline is required' })
  @Type(() => Date)
  @IsDate({ message: 'Registration deadline must be a valid date' })
  readonly registrationDeadline: Date;
}
