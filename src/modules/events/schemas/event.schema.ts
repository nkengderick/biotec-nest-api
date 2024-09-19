import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @ApiProperty({
    description: 'The title of the event',
    example: 'Annual Science Expo',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'A detailed description of the event',
    example:
      'A gathering of scientists to showcase the latest in research and innovation.',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'The start time of the event',
    example: '2024-10-01T09:00:00.000Z',
  })
  @Prop({ type: Date, required: true })
  startTime: Date;

  @ApiProperty({
    description: 'The end time of the event',
    example: '2024-10-01T17:00:00.000Z',
  })
  @Prop({ type: Date, required: true })
  endTime: Date;

  @ApiProperty({
    description: 'The location of the event',
    example: '123 Main St, Science City',
  })
  @Prop({ required: true })
  location: string;

  @ApiProperty({
    description: 'The type of event (online, physical, or hybrid)',
    example: 'hybrid',
    enum: ['online', 'physical', 'hybrid'],
  })
  @Prop({
    required: true,
    enum: ['online', 'physical', 'hybrid'],
    default: 'physical',
  })
  eventType: string;

  @ApiProperty({
    description: 'Optional URL for the event image',
    example: 'http://example.com/event-image.png',
    required: false,
  })
  @Prop({ type: String, default: null })
  eventImageUrl?: string;

  @ApiProperty({
    description: 'The deadline to register for the event',
    example: '2024-09-25T23:59:59.000Z',
  })
  @Prop({ type: Date, required: true })
  registrationDeadline: Date;

  @ApiProperty({
    description: 'The timestamp when the event was created',
    example: '2024-09-01T12:00:00.000Z',
  })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the event was last updated',
    example: '2024-09-10T14:00:00.000Z',
  })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
