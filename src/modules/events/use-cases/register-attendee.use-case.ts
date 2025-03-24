import { Injectable, NotFoundException } from '@nestjs/common';
import { EventAttendeeRepository } from '../repositories/event-attendee.repository';
import { RegisterAttendeeDto } from '../dto/register-attendee.dto';
import { EventAttendee } from '../schemas/event-attendee.schema';
import { UserRepository } from 'src/modules/user-management/repositories/user.repository';
import { EventRepository } from '../repositories/event.repository';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';

@Injectable()
export class RegisterAttendeeUseCase {
  constructor(
    private readonly eventAttendeeRepository: EventAttendeeRepository,
    private readonly userRepository: UserRepository,
    private readonly eventRepository: EventRepository,
    private readonly sendEmailUseCase: SendEmailUseCase,
  ) {}

  async execute(
    registerAttendeeDto: RegisterAttendeeDto,
  ): Promise<{ attendee: EventAttendee; message: string }> {
    // Check if the user exists
    const user = await this.userRepository.findById(registerAttendeeDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${registerAttendeeDto.userId} not found`,
      );
    }

    // Check if the event exists
    const event = await this.eventRepository.findById(
      registerAttendeeDto.eventId,
    );
    if (!event) {
      throw new NotFoundException(
        `Event with ID ${registerAttendeeDto.eventId} not found`,
      );
    }

    // Register the attendee if both user and event are valid
    const attendee =
      await this.eventAttendeeRepository.registerAttendee(registerAttendeeDto);

    // Format dates for email
    const eventDate = event.startTime.toDateString();
    const eventStartTime = event.startTime.toLocaleTimeString();
    const eventEndTime = event.endTime.toLocaleTimeString();

    // Prepare template data
    const templateData = {
      userName: user.first_name,
      userEmail: user.email,
      emailTitle: `Registration Confirmation: ${event.title}`,
      eventTitle: event.title,
      eventDate: eventDate,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      eventLocation: event.location,
      eventDescription: event.description,
      actionRequired: true,
      actionUrl: `${process.env.FRONTEND_URL}/events/${(event as any)._id}`,
      actionText: 'View Event Details',
      secondaryInfo:
        'You will receive a reminder 24 hours before the event starts.',
    };

    // Send confirmation email to the user
    let emailSent = false;
    try {
      await this.sendEmailUseCase.executeTemplated(
        user.email,
        `Registration Confirmation for ${event.title}`,
        'event-registration',
        templateData,
      );
      emailSent = true;
    } catch (error) {
      console.error(
        `Failed to send event registration email to ${user.email}:`,
        error,
      );
    }

    // Return the attendee and an appropriate message
    const message = emailSent
      ? `Registration successful and email sent to ${user.email}`
      : `Registration successful, but email failed to send to ${user.email}`;

    return { attendee, message };
  }
}
