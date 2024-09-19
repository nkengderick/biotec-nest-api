import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  IsMongoId,
  IsOptional,
  IsEnum,
  ValidateIf,
} from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'The type of feedback, either "testimonial" or "review"',
    enum: ['testimonial', 'review'],
  })
  @IsNotEmpty({ message: 'Type is required' })
  @IsEnum(['testimonial', 'review'], {
    message: 'Type must be either "testimonial" or "review"',
  })
  type: string;

  @ApiProperty({
    description: 'ID of the service being reviewed (required for testimonials)',
  })
  @ValidateIf((o) => o.type === 'testimonial') // This ensures serviceId is required for testimonials
  @IsMongoId({ message: 'Service ID must be a valid Mongo ID' })
  @IsNotEmpty({ message: 'Service ID is required for testimonials' })
  serviceId?: string;

  @ApiProperty({
    description: 'ID of the event being reviewed (required for reviews)',
  })
  @ValidateIf((o) => o.type === 'review') // This ensures eventId is required for reviews
  @IsMongoId({ message: 'Event ID must be a valid Mongo ID' })
  @IsNotEmpty({ message: 'Event ID is required for reviews' })
  eventId?: string;

  @ApiProperty({ description: 'ID of the user leaving the feedback' })
  @IsNotEmpty({ message: 'User ID is required' })
  @IsMongoId({ message: 'User ID must be a valid Mongo ID' })
  userId: string;

  @ApiProperty({ description: 'Rating (1-5)' })
  @IsNotEmpty({ message: 'Rating is required' })
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot be more than 5' })
  rating: number;

  @ApiProperty({ description: 'Feedback or comment' })
  @IsNotEmpty({ message: 'Comment is required' })
  @IsString({ message: 'Comment must be a string' })
  comment: string;
}
