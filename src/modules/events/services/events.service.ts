import { Injectable } from '@nestjs/common';
import { CreateEventUseCase } from '../use-cases/create-event.use-case';
import { UpdateEventUseCase } from '../use-cases/update-event.use-case';
import { DeleteEventUseCase } from '../use-cases/delete-event.use-case';
import { GetAllEventsUseCase } from '../use-cases/get-all-events.use-case';
import { RegisterAttendeeUseCase } from '../use-cases/register-attendee.use-case';
import { AssignSpeakerUseCase } from '../use-cases/assign-speaker.use-case';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { RegisterAttendeeDto } from '../dto/register-attendee.dto';
import { AssignSpeakerDto } from '../dto/assign-speaker.dto';
import { Event, EventDocument } from '../schemas/event.schema';
import { EventAttendee } from '../schemas/event-attendee.schema';
import { EventSpeaker } from '../schemas/event-speaker.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EventsService {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly updateEventUseCase: UpdateEventUseCase,
    private readonly deleteEventUseCase: DeleteEventUseCase,
    private readonly getAllEventsUseCase: GetAllEventsUseCase,
    private readonly registerAttendeeUseCase: RegisterAttendeeUseCase,
    private readonly assignSpeakerUseCase: AssignSpeakerUseCase,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  // Create a new event
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    return this.createEventUseCase.execute(createEventDto);
  }

  // Update an existing event
  async updateEvent(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.updateEventUseCase.execute(id, updateEventDto);
  }

  // Delete an event by ID
  async deleteEvent(id: string): Promise<void> {
    return this.deleteEventUseCase.execute(id);
  }

  // Get all events with speakers and attendees
  async getAllEvents(): Promise<
    (Event & { speakers: EventSpeaker[]; attendees: EventAttendee[] })[]
  > {
    return this.getAllEventsUseCase.execute();
  }

  // Register an attendee for an event
  async registerAttendee(
    registerAttendeeDto: RegisterAttendeeDto,
  ): Promise<{ attendee: EventAttendee; message: string }> {
    return this.registerAttendeeUseCase.execute(registerAttendeeDto);
  }

  // Assign a speaker to an event
  async assignSpeaker(
    assignSpeakerDto: AssignSpeakerDto,
  ): Promise<EventSpeaker> {
    return this.assignSpeakerUseCase.execute(assignSpeakerDto);
  }

  // Cron job to close registration based on registrationDeadline
  @Cron(CronExpression.EVERY_MINUTE)  // Adjust the schedule as needed
  async closeExpiredRegistrations() {
    const now = new Date();

    const expiredEvents = await this.eventModel.find({
      registrationDeadline: { $lt: now },
      isRegistrationOpen: true,  // Only affect events where registration is still open
    });

    for (const event of expiredEvents) {
      event.isRegistrationOpen = false;
      await event.save();
    }

    console.log('Expired registrations closed', expiredEvents.length);
  }
}
