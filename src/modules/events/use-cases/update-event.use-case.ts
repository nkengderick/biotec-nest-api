import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from '../repositories/event.repository';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../schemas/event.schema';

@Injectable()
export class UpdateEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return this.eventRepository.update(id, updateEventDto);
  }
}
