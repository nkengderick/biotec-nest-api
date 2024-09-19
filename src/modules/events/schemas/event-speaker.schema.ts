import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event } from './event.schema';
import { Member } from '../../user-management/schemas/member.schema';
import { ApiProperty } from '@nestjs/swagger';

export type EventSpeakerDocument = EventSpeaker & Document;

@Schema()
export class EventSpeaker {
  @ApiProperty({
    description: 'The ID of the event the speaker is associated with',
    example: '64fc8593b193c2b9aef76132',
  })
  @Prop({ type: Types.ObjectId, ref: Event.name, required: true })
  eventId: Event;

  @ApiProperty({
    description: 'The ID of the member assigned as the speaker',
    example: '64fc863fb193c2b9aef76135',
  })
  @Prop({ type: Types.ObjectId, ref: Member.name, required: true })
  memberId: Member;

  @ApiProperty({
    description:
      'The role of the speaker in the event (e.g., keynote, panelist)',
    example: 'keynote',
  })
  @Prop({ required: true })
  speakerRole: string;

  @ApiProperty({
    description: 'The timestamp when the speaker was assigned to the event',
    example: '2024-09-18T10:30:00.000Z',
  })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const EventSpeakerSchema = SchemaFactory.createForClass(EventSpeaker);
