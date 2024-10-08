import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EventAttendee,
  EventAttendeeDocument,
} from '../schemas/event-attendee.schema';
import { RegisterAttendeeDto } from '../dto/register-attendee.dto';

@Injectable()
export class EventAttendeeRepository {
  constructor(
    @InjectModel(EventAttendee.name)
    private eventAttendeeModel: Model<EventAttendeeDocument>,
  ) {}

  // Register an attendee for an event
  async registerAttendee(
    registerAttendeeDto: RegisterAttendeeDto,
  ): Promise<EventAttendee> {
    const attendee = new this.eventAttendeeModel(registerAttendeeDto);
    return attendee.save();
  }
  
  // Helper function to update all userId fields to ObjectIds in the collection
  private async ensureUserIdsAreObjectIds(): Promise<void> {
    await this.eventAttendeeModel.updateMany(
      { userId: { $type: 'string' } },  // find documents where userId is still a string
      [{ $set: { userId: { $toObjectId: '$userId' } } }] // convert userId to ObjectId
    ).exec();
  }
  
    // Find all attendees for a specific event
    async findByEventId(eventId: string): Promise<EventAttendee[]> {
      await this.ensureUserIdsAreObjectIds()
      return this.eventAttendeeModel.find({ eventId }).populate('userId').exec();
    }

  // Find all events a user is registered for
  async findByUserId(userId: string): Promise<EventAttendee[]> {
    await this.ensureUserIdsAreObjectIds()
    return this.eventAttendeeModel.find({ userId }).populate('eventId').exec();
  }

  // Cancel a registration for an event
  async cancelRegistration(
    eventId: string,
    userId: string,
  ): Promise<EventAttendee> {
    return this.eventAttendeeModel
      .findOneAndUpdate(
        { eventId, userId },
        { attendingStatus: 'cancelled' },
        { new: true },
      )
      .exec();
  }
}
