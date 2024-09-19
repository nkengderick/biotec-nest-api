import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsUrl,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateBlogPostDto {
  @ApiProperty({ description: 'Title of the blog post' })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({ description: 'Summary or excerpt of the blog post' })
  @IsOptional()
  @IsString({ message: 'Summary must be a string' })
  summary?: string;

  @ApiProperty({ description: 'Main content of the blog post' })
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  content: string;

  @ApiProperty({ description: 'Category of the blog post' })
  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  category?: string;

  @ApiProperty({ description: 'URL to the featured image' })
  @IsOptional()
  @IsUrl({}, { message: 'Featured image URL must be a valid URL' })
  featuredImageUrl?: string;

  @ApiProperty({
    description: 'Author ID, reference to the member who created the post',
  })
  @IsNotEmpty({ message: 'Author ID is required' })
  @IsString({ message: 'Author ID must be a string' })
  @IsMongoId({ message: 'Author ID must be a valid MongoDB ObjectId' })
  authorId: Types.ObjectId;

  @ApiProperty({
    description: 'Date and time when the post was published',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Published date must be a valid date' })
  publishedAt?: Date;
}
