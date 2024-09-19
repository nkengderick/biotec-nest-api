import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  // Create a new event
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  // Find all events
  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  // Find an event by its ID
  async findById(id: string): Promise<Event> {
    return this.eventModel.findById(id).exec();
  }

  // Update an event
  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
  }

  // Delete an event
  async delete(id: string): Promise<Event> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }
}
