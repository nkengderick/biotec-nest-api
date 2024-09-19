import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PostReactionDocument = PostReaction & Document;

@Schema({ timestamps: true })
export class PostReaction {
  @ApiProperty({
    description: 'Blog post ID, reference to the associated blog post',
  })
  @Prop({ type: Types.ObjectId, ref: 'BlogPost', required: true })
  postId: Types.ObjectId;

  @ApiProperty({ description: 'User ID, reference to the user who reacted' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'Reaction type: either "like" or "dislike"',
    enum: ['like', 'dislike'],
  })
  @Prop({ required: true, enum: ['like', 'dislike'] })
  reactionType: string;
}

export const PostReactionSchema = SchemaFactory.createForClass(PostReaction);
