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

    // Construct the email content
    const subject = `Registration Confirmation for ${event.title}`;
    const text = `
      Dear ${user.first_name},

      You have successfully registered for the event "${event.title}".

      Event Details:
      - Date: ${event.startTime.toDateString()}
      - Time: ${event.startTime.toLocaleTimeString()} - ${event.endTime.toLocaleTimeString()}
      - Location: ${event.location}

      We look forward to your participation!

      Best regards,
      The Event Team
    `;

    const html = `
      <p>Dear ${user.first_name},</p>
      <p>You have successfully registered for the event <strong>${event.title}</strong>.</p>
      <p><strong>Event Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${event.startTime.toDateString()}</li>
        <li><strong>Time:</strong> ${event.startTime.toLocaleTimeString()} - ${event.endTime.toLocaleTimeString()}</li>
        <li><strong>Location:</strong> ${event.location}</li>
      </ul>
      <p>We look forward to your participation!</p>
      <p>Best regards,<br/>The Event Team</p>
    `;

    // Send confirmation email to the user
    let emailSent = false;
    try {
      await this.sendEmailUseCase.execute(user.email, subject, text, html);
      emailSent = true;
    } catch (error) {
      console.error(`Failed to send email to ${user.email}:`, error);
    }

    // Return the attendee and an appropriate message
    const message = emailSent
      ? `Registration successful and email sent to ${user.email}`
      : `Registration successful, but email failed to send to ${user.email}`;

    return { attendee, message };
  }
}
