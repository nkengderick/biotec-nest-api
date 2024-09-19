import { Injectable } from '@nestjs/common';
import { EventRepository } from '../repositories/event.repository';
import { CreateEventDto } from '../dto/create-event.dto';
import { Event } from '../schemas/event.schema';

@Injectable()
export class CreateEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventRepository.create(createEventDto);
  }
}
