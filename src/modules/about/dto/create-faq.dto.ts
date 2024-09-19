import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({
    description: 'The question being asked in the FAQ',
    example: 'What is NestJS?',
  })
  @IsNotEmpty({ message: 'Question must not be empty' })
  @IsString({ message: 'Question must be a string' })
  question: string;

  @ApiProperty({
    description: 'The answer to the FAQ question',
    example:
      'NestJS is a framework for building efficient, scalable Node.js server-side applications.',
  })
  @IsNotEmpty({ message: 'Answer must not be empty' })
  @IsString({ message: 'Answer must be a string' })
  answer: string;

  @ApiProperty({
    description: 'The category the FAQ belongs to',
    example: 'Technology',
  })
  @IsNotEmpty({ message: 'Category must not be empty' })
  @IsString({ message: 'Category must be a string' })
  category: string;
}
