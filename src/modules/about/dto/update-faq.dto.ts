import { PartialType } from '@nestjs/mapped-types';
import { CreateFaqDto } from './create-faq.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateFaqDto extends PartialType(CreateFaqDto) {
  @ApiPropertyOptional({
    description: 'The updated question in the FAQ',
    example: 'What is the updated question?',
  })
  @IsOptional()
  @IsString({ message: 'Question must be a string' })
  @IsNotEmpty({ message: 'Question must not be empty' })
  question?: string;

  @ApiPropertyOptional({
    description: 'The updated answer to the FAQ',
    example: 'The updated answer for this FAQ.',
  })
  @IsOptional()
  @IsString({ message: 'Answer must be a string' })
  @IsNotEmpty({ message: 'Answer must not be empty' })
  answer?: string;

  @ApiPropertyOptional({
    description: 'The updated category for the FAQ',
    example: 'Updated Technology',
  })
  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty({ message: 'Category must not be empty' })
  category?: string;
}
