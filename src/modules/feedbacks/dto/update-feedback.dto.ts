import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class UpdateFeedbackDto {
  @ApiProperty({ description: 'Updated rating (1-5)', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot be more than 5' })
  rating?: number;

  @ApiProperty({ description: 'Updated feedback or comment', required: false })
  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  comment?: string;
}
