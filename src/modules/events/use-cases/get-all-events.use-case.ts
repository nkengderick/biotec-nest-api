import { Injectable } from '@nestjs/common';
import { EventRepository } from '../repositories/event.repository';
import { EventSpeakerRepository } from '../repositories/event-speaker.repository';
import { EventAttendeeRepository } from '../repositories/event-attendee.repository';
import { Event, EventDocument } from '../schemas/event.schema';
import { EventSpeaker } from '../schemas/event-speaker.schema';
import { EventAttendee } from '../schemas/event-attendee.schema';

@Injectable()
export class GetAllEventsUseCase {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly eventSpeakerRepository: EventSpeakerRepository,
    private readonly eventAttendeeRepository: EventAttendeeRepository,
  ) {}

  async execute(): Promise<
    (Event & { speakers: EventSpeaker[]; attendees: EventAttendee[] })[]
  > {
    // Fetch all events
    const events = await this.eventRepository.findAll();

    // Fetch speakers and attendees for each event
    const populatedEvents = await Promise.all(
      events.map(async (event: EventDocument) => {
        const speakers = await this.eventSpeakerRepository.findByEventId(
          event._id.toString(),
        );
        const attendees = await this.eventAttendeeRepository.findByEventId(
          event._id.toString(),
        );

        // Return the event along with its speakers and attendees
        return {
          ...event.toObject(),
          speakers,
          attendees,
        };
      }),
    );

    return populatedEvents;
  }
}
