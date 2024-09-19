import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ description: 'Title of the service' })
  @IsString({ message: 'The title must be a string' })
  title: string;

  @ApiProperty({ description: 'Description of the service' })
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
    enum: ['health', 'tech', 'microbiology', 'telemedicine'],
  })
  @IsEnum(['health', 'tech', 'microbiology', 'telemedicine'], {
    message:
      'Service category must be one of "health", "tech", "microbiology", or "telemedicine"',
  })
  service_category: string;

  @ApiProperty({
    description: 'Price of the service (optional)',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @ApiProperty({
    description: 'Portfolio URLs for the service (optional)',
    required: false,
  })
  @IsOptional()
  portfolio_urls: string[];
}
