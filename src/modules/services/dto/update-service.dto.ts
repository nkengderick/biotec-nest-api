import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

class PricingPlanDto {
  @ApiProperty({ description: 'Name of the pricing plan' })
  @IsString({ message: 'The name of the pricing plan must be a string' })
  name: string;

  @ApiProperty({ description: 'Price of the pricing plan' })
  @IsNumber({}, { message: 'The price must be a number' })
  price: number;

  @ApiProperty({
    description: 'Description of the pricing plan (optional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'The description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'Description of the pricing plan (optional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'The billing must be a string' })
  billing_cycle?: string;
}

export class UpdateServiceDto {
  @ApiProperty({ description: 'Title of the service', required: false })
  @IsOptional()
  @IsString({ message: 'The title must be a string' })
  title?: string;

  @ApiProperty({ description: 'Short summary of the service', required: false })
  @IsOptional()
  @IsString({ message: 'The summary must be a string' })
  summary?: string;

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
    enum: ['health', 'technology', 'business', 'microbiology', 'telemedicine', 'other'],
  })
  @IsOptional()
  @IsEnum(['health', 'technology', 'business', 'microbiology', 'telemedicine', 'other'], {
    message:
      'Service category must be one of "health", "technology", "microbiology", "business", "health" or "telemedicine", "other"',
  })
  service_category?: string;

  @ApiProperty({
    description: 'Pricing plans for the service',
    required: false,
    type: [PricingPlanDto],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PricingPlanDto)
  pricing_plans?: PricingPlanDto[];

  @ApiProperty({
    description: 'Portfolio URLs for the service (optional)',
    required: false,
  })
  @IsOptional()
  @IsArray()
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
