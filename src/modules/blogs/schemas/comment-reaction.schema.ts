import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CommentReactionDocument = CommentReaction & Document;

@Schema({ timestamps: true })
export class CommentReaction {
  @ApiProperty({
    description: 'Comment ID, reference to the associated comment',
  })
  @Prop({ type: Types.ObjectId, ref: 'PostComment', required: true })
  commentId: Types.ObjectId;

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

export const CommentReactionSchema =
  SchemaFactory.createForClass(CommentReaction);
