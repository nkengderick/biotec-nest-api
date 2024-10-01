import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  IsEnum,
  ValidateNested,
  IsNumber,
} from 'class-validator';
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
  @IsString({ message: 'The billing cycle must be a string' })
  billing_cycle?: string;
}

export class CreateServiceDto {
  @ApiProperty({ description: 'Title of the service' })
  @IsString({ message: 'The title must be a string' })
  title: string;

  @ApiProperty({ description: 'Short summary of the service' })
  @IsString({ message: 'The summary must be a string' })
  summary: string;

  @ApiProperty({ description: 'Detailed description of the service' })
  @IsString({ message: 'The description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Type of the service',
    enum: ['association', 'member'],
  })
  @IsEnum(['association', 'member'], {
    message: 'Service type must be either "association" or "member"',
  })
  service_type: string;

  @ApiProperty({
    description: 'Category of the service',
    enum: ['health', 'education', 'technology', 'business', 'microbiology', 'telemedicine', 'other'],
    default: 'other',
  })
  @IsEnum(['health', 'education', 'technology', 'business', 'microbiology', 'telemedicine', 'other'], {
    message:
    "Service category must be one of 'health', 'education', 'technology', 'business', 'microbiology', 'telemedicine', 'other'",
  })
  service_category: string;

  @ApiProperty({
    description: 'Pricing plans for the service',
    type: [PricingPlanDto],
  })
  @ValidateNested({ each: true })
  @Type(() => PricingPlanDto)
  pricing_plans: PricingPlanDto[];

  @ApiProperty({
    description: 'Portfolio URLs for the service (optional)',
    required: false,
  })
  @IsOptional()
  @IsArray()
  portfolio_urls: string[];
}
