import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateServiceDto {
  @ApiProperty({ description: 'Title of the service', required: false })
  @IsOptional()
  @IsString({ message: 'The title must be a string' })
  title?: string;

  @ApiProperty({ description: 'Description of the service', required: false })
  @IsOptional()
  @IsString({ message: 'The description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'Type of the service',
    required: false,
    enum: ['association', 'member'],
  })
  @IsOptional()
  @IsEnum(['association', 'member'], {
    message: 'Service type must be either "association" or "member"',
  })
  service_type?: string;

  @ApiProperty({
    description: 'Category of the service',
    required: false,
    enum: ['health', 'tech', 'microbiology', 'telemedicine'],
  })
  @IsOptional()
  @IsEnum(['health', 'tech', 'microbiology', 'telemedicine'], {
    message:
      'Service category must be one of "health", "tech", "microbiology", or "telemedicine"',
  })
  service_category?: string;

  @ApiProperty({
    description: 'Price of the service (optional)',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  price?: number;

  @ApiProperty({
    description: 'Portfolio URLs for the service (optional)',
    required: false,
  })
  @IsOptional()
  portfolio_urls?: string[];

  @ApiProperty({
    description: 'Is the service verified?',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;


  @ApiProperty({
    description: 'Bookings associated with the service',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  bookings?: Types.ObjectId[];

  @ApiProperty({
    description: 'Service providers associated with the service',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  service_providers?: Types.ObjectId[];
}

