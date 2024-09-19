import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate, IsUrl } from 'class-validator';

export class UpdateBlogPostDto {
  @ApiProperty({ description: 'Title of the blog post', required: false })
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @ApiProperty({
    description: 'Summary or excerpt of the blog post',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Summary must be a string' })
  summary?: string;

  @ApiProperty({
    description: 'Main content of the blog post',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Content must be a string' })
  content?: string;

  @ApiProperty({ description: 'Category of the blog post', required: false })
  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  category?: string;

  @ApiProperty({ description: 'URL to the featured image', required: false })
  @IsOptional()
  @IsUrl({}, { message: 'Featured Image URL must be a valid URL' })
  featuredImageUrl?: string;

  @ApiProperty({
    description: 'Date and time when the post was published',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Published date must be a valid date' })
  publishedAt?: Date;
}
