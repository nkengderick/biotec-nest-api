import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event } from './event.schema';
import { User } from '../../user-management/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export type EventAttendeeDocument = EventAttendee & Document;

@Schema()
export class EventAttendee {
  @ApiProperty({
    description: 'The ID of the event the attendee is associated with',
    example: '64fc8593b193c2b9aef76132',
  })
  @Prop({ type: Types.ObjectId, ref: Event.name, required: true })
  eventId: Event;

  @ApiProperty({
    description: 'The ID of the user attending the event',
    example: '64fc863fb193c2b9aef76135',
  })
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: User;

  @ApiProperty({
    description: 'The attending status of the user for the event',
    example: 'registered',
    enum: ['registered', 'cancelled'],
  })
  @Prop({
    required: true,
    enum: ['registered', 'cancelled'],
    default: 'registered',
  })
  attendingStatus: string;

  @ApiProperty({
    description:
      'The timestamp when the user was registered or their status was updated',
    example: '2024-09-18T10:30:00.000Z',
  })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const EventAttendeeSchema = SchemaFactory.createForClass(EventAttendee);
