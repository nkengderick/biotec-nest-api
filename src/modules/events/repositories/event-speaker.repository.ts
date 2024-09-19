import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EventSpeaker,
  EventSpeakerDocument,
} from '../schemas/event-speaker.schema';
import { AssignSpeakerDto } from '../dto/assign-speaker.dto';

@Injectable()
export class EventSpeakerRepository {
  constructor(
    @InjectModel(EventSpeaker.name)
    private eventSpeakerModel: Model<EventSpeakerDocument>,
  ) {}

  // Assign a speaker to an event
  async assignSpeaker(
    assignSpeakerDto: AssignSpeakerDto,
  ): Promise<EventSpeaker> {
    const speaker = new this.eventSpeakerModel(assignSpeakerDto);
    return speaker.save();
  }

  // Find all speakers for a specific event
  async findByEventId(eventId: string): Promise<EventSpeaker[]> {
    return this.eventSpeakerModel.find({ eventId }).populate('memberId').exec();
  }

  // Remove a speaker from an event
  async removeSpeaker(
    eventId: string,
    memberId: string,
  ): Promise<EventSpeaker> {
    return this.eventSpeakerModel
      .findOneAndDelete({ eventId, memberId })
      .exec();
  }
}
