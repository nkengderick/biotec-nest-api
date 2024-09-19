import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: true })
export class Feedback {
  @ApiProperty({
    description: 'The type of feedback, either "testimonial" or "review"',
    enum: ['testimonial', 'review'],
  })
  @Prop({ required: true, enum: ['testimonial', 'review'] })
  type: string;

  @ApiProperty({
    description: 'ID of the service being reviewed (for testimonials)',
  })
  @Prop({ type: Types.ObjectId, ref: 'Service' })
  serviceId?: Types.ObjectId;

  @ApiProperty({
    description: 'ID of the event being reviewed (for reviews)',
  })
  @Prop({ type: Types.ObjectId, ref: 'Event' })
  eventId?: Types.ObjectId;

  @ApiProperty({ description: 'ID of the user leaving the feedback' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @ApiProperty({ description: 'Rating given by the user (1-5)' })
  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @ApiProperty({ description: 'The actual review or comment left by the user' })
  @Prop({ required: true })
  comment: string;

  @ApiProperty({ description: 'Date when the feedback was created' })
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
