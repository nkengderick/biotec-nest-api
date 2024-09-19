import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { RegisterAttendeeDto } from '../dto/register-attendee.dto';
import { AssignSpeakerDto } from '../dto/assign-speaker.dto';
import { Event } from '../schemas/event.schema';
import { EventAttendee } from '../schemas/event-attendee.schema';
import { EventSpeaker } from '../schemas/event-speaker.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({
    status: 201,
    description: 'Event successfully created',
    type: Event,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.createEvent(createEventDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing event' })
  @ApiParam({ name: 'id', description: 'The ID of the event to update' })
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({
    status: 200,
    description: 'Event successfully updated',
    type: Event,
  })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the event to delete' })
  @ApiResponse({ status: 200, description: 'Event successfully deleted' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteEvent(@Param('id') id: string): Promise<void> {
    return this.eventsService.deleteEvent(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events with speakers and attendees' })
  @ApiResponse({
    status: 200,
    description: 'List of all events with speakers and attendees',
    isArray: true,
    type: Event,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Post('register')
  @ApiOperation({ summary: 'Register an attendee for an event' })
  @ApiBody({ type: RegisterAttendeeDto })
  @ApiResponse({
    status: 201,
    description: 'Attendee successfully registered for the event, an email sent via email for confirmation',
    type: EventAttendee,
  })
  @ApiResponse({ status: 404, description: 'User or event not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data, can not send email' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async registerAttendee(
    @Body() registerAttendeeDto: RegisterAttendeeDto,
  ): Promise<{ attendee: EventAttendee; message: string }> {
    return this.eventsService.registerAttendee(registerAttendeeDto);
  }

  @Post('assign-speaker')
  @ApiOperation({ summary: 'Assign a speaker to an event' })
  @ApiBody({ type: AssignSpeakerDto })
  @ApiResponse({
    status: 201,
    description: 'Speaker successfully assigned to the event',
    type: EventSpeaker,
  })
  @ApiResponse({ status: 404, description: 'Member not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async assignSpeaker(
    @Body() assignSpeakerDto: AssignSpeakerDto,
  ): Promise<EventSpeaker> {
    return this.eventsService.assignSpeaker(assignSpeakerDto);
  }
}
