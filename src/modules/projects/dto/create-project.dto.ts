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

export class CreateProjectDto {
  @ApiProperty({
    description: 'The title of the project',
    example: 'Biotech Research Project',
  })
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title must be a string' })
  readonly title: string;

  @ApiProperty({
    description: 'Detailed description of the project',
    example: 'This project focuses on biotech innovations.',
  })
  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description must be a string' })
  readonly description: string;

  @ApiProperty({
    description: 'Start date of the project',
    example: '2024-09-18',
  })
  @IsNotEmpty({ message: 'Start date is required' })
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  readonly startDate: Date;

  @ApiProperty({
    description: 'End date of the project (Optional)',
    example: '2025-05-01',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  readonly endDate?: Date;

  @ApiProperty({
    description: 'Current status of the project',
    example: 'ongoing',
    enum: ['ongoing', 'completed'],
  })
  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(['ongoing', 'completed'], {
    message: 'Status must be either ongoing or completed',
  })
  readonly status: 'ongoing' | 'completed';

  @ApiProperty({
    description: 'Category of the project (e.g., research, education)',
    example: 'research',
  })
  @IsNotEmpty({ message: 'Category should not be empty' })
  @IsString({ message: 'Category must be a string' })
  readonly category: string;

  @ApiProperty({
    description: 'URL to the project image (Optional)',
    example: 'http://example.com/image.png',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Project image must be a valid URL' })
  readonly projectImageUrl?: string;
}
