import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PostCommentDocument = PostComment & Document;

@Schema({ timestamps: true })
export class PostComment {
  @ApiProperty({
    description: 'Blog post ID, reference to the associated blog post',
  })
  @Prop({ type: Types.ObjectId, ref: 'BlogPost', required: true })
  postId: Types.ObjectId;

  @ApiProperty({
    description: 'User ID, reference to the user who made the comment',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @ApiProperty({ description: 'The text content of the comment' })
  @Prop({ required: true })
  commentText: string;
}

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);
