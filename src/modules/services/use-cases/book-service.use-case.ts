import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BookingRepository } from '../repositories/booking.repository';
import { ServiceRepository } from '../repositories/service.repository';
import { BookServiceDto } from '../dto/book-service.dto';
import { UserRepository } from 'src/modules/user-management/repositories/user.repository';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly userRepository: UserRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly sendEmailUseCase: SendEmailUseCase,
  ) {}

  async bookService(bookServiceDto: BookServiceDto) {
    const { user_id, service_id, booking_date } = bookServiceDto;

    // Check if the user exists
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    // Check if the service exists
    const service = await this.serviceRepository.findById(service_id);
    if (!service) {
      throw new NotFoundException(`Service with ID ${service_id} not found`);
    }

    // Check if the booking date is in the future
    const bookingDate = new Date(booking_date);
    if (bookingDate <= new Date()) {
      throw new BadRequestException('Booking date must be in the future');
    }

    // Proceed to create the booking
    const booking = await this.bookingRepository.create(bookServiceDto)

    // Add the new booking's ObjectId to the service's bookings array
    const updatedBookings = [...service.bookings, booking.id];
    await this.serviceRepository.update(service_id, {
      bookings: updatedBookings,
    });

    // Construct the email content
    const subject = `Service Booking Confirmation: ${service.title}`;
    const text = `
      Dear ${user.first_name},

      You have successfully booked the service "${service.title}" for the date ${bookingDate.toDateString()}.

      Service Details:
      - Description: ${service.description}
      - Category: ${service.service_category}
      - Price: ${service.price ? '$' + service.price : 'Free'}
      - Type: ${service.service_type}

      We look forward to serving you!

      Best regards,
      The Service Team
    `;

    const html = `
      <p>Dear ${user.first_name},</p>
      <p>You have successfully booked the service <strong>${service.title}</strong> for the date ${bookingDate.toDateString()}.</p>
      <p><strong>Service Details:</strong></p>
      <ul>
        <li><strong>Description:</strong> ${service.description}</li>
        <li><strong>Category:</strong> ${service.service_category}</li>
        <li><strong>Price:</strong> ${service.price ? '$' + service.price : 'Free'}</li>
        <li><strong>Type:</strong> ${service.service_type}</li>
      </ul>
      <p>We look forward to serving you!</p>
      <p>Best regards,<br/>The Service Team</p>
    `;

    // Send email to the user upon successful booking
    let emailSent = false;
    try {
      await this.sendEmailUseCase.execute(user.email, subject, text, html);
      emailSent = true;
    } catch (error) {
      console.error(
        `Failed to send booking confirmation email to ${user.email}:`,
        error,
      );
    }

    // Return the booking and a message indicating whether the email was sent
    const message = emailSent
      ? `Booking successful and confirmation email sent to ${user.email}`
      : `Booking successful, but confirmation email failed to send to ${user.email}`;

    return { booking, message };
  }
}
