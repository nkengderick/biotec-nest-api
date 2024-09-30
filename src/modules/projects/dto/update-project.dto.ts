import { IsOptional, IsString, IsDate, IsEnum, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiPropertyOptional({
    description: 'The title of the project',
    example: 'Updated Project Title',
  })
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  readonly title?: string;

  @ApiPropertyOptional({
    description: 'A short summary of the project',
    example: 'This project focuses on biotech innovations.',
  })
  @IsString({ message: 'Summary must be a string' })
  readonly summary: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the project',
    example: '<p>This project focuses on biotech innovations...</p>',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'Start date of the project',
    example: '2024-09-18',
  })
  @IsOptional()
  @IsDate({ message: 'Start date must be a valid date' })
  readonly startDate?: Date;

  @ApiPropertyOptional({
    description: 'End date of the project',
    example: '2025-05-01',
  })
  @IsOptional()
  @IsDate({ message: 'End date must be a valid date' })
  readonly endDate?: Date;

  @ApiPropertyOptional({
    description: 'Current status of the project',
    example: 'completed',
    enum: ['ongoing', 'completed'],
  })
  @IsOptional()
  @IsEnum(['ongoing', 'completed'], {
    message: 'Status must be either ongoing or completed',
  })
  readonly status?: 'ongoing' | 'completed';

  @ApiPropertyOptional({
    description: 'Category of the project (e.g., research, education)',
    example: 'education',
  })
  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  readonly category?: string;

  @ApiPropertyOptional({
    description: 'URL to the project image',
    example: 'http://example.com/image.png',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Project image must be a valid URL' })
  readonly projectImageUrl?: string;
}
