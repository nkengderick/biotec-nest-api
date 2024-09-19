import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type BlogPostDocument = BlogPost & Document;

@Schema({ timestamps: true })
export class BlogPost {
  @ApiProperty({
    description: 'Author ID, reference to the member who created the post',
  })
  @Prop({ type: Types.ObjectId, ref: 'Member', required: true })
  authorId: Types.ObjectId;

  @ApiProperty({ description: 'Title of the blog post' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Summary or excerpt of the blog post' })
  @Prop()
  summary: string;

  @ApiProperty({ description: 'Main content of the blog post' })
  @Prop({ required: true })
  content: string;

  @ApiProperty({ description: 'Category of the blog post' })
  @Prop()
  category: string;

  @ApiProperty({ description: 'URL to the featured image' })
  @Prop()
  featuredImageUrl: string;

  @ApiProperty({ description: 'Date and time the blog post was published' })
  @Prop({ type: Date })
  publishedAt: Date;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
