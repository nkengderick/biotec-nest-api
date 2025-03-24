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
    const user = await this.userRepository.findById(user_id.toString());
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    // Check if the service exists
    const service = await this.serviceRepository.findById(
      service_id.toString(),
    );
    if (!service) {
      throw new NotFoundException(`Service with ID ${service_id} not found`);
    }

    // Check if the booking date is in the future
    const bookingDate = new Date(booking_date);
    if (bookingDate <= new Date()) {
      throw new BadRequestException('Booking date must be in the future');
    }

    // Proceed to create the booking
    const booking = await this.bookingRepository.create(bookServiceDto);

    // Add the new booking's ObjectId to the service's bookings array
    const updatedBookings = [...service.bookings, booking.id];
    await this.serviceRepository.update(service_id.toString(), {
      bookings: updatedBookings,
    });

    // Get pricing information
    const pricingPlan = service.pricing_plans[0]; // Get the first pricing plan or adjust based on your logic
    const formattedPrice = pricingPlan ? `$${pricingPlan.price}` : 'Free';

    // Format the booking date for display
    const formattedBookingDate = bookingDate.toDateString();

    // Prepare template data for email
    const templateData = {
      userName: user.first_name,
      userEmail: user.email,
      emailTitle: `Service Booking Confirmation: ${service.title}`,
      serviceTitle: service.title,
      serviceDescription: service.description,
      serviceCategory: service.service_category,
      servicePrice: formattedPrice,
      serviceType: service.service_type,
      bookingDate: formattedBookingDate,
      actionRequired: true,
      actionUrl: `${process.env.FRONTEND_URL}/bookings/${booking.id}`,
      actionText: 'View Booking Details',
      secondaryInfo:
        'If you need to reschedule or cancel, please contact us at least 24 hours in advance.',
    };

    // Send email to the user upon successful booking
    let emailSent = false;
    try {
      await this.sendEmailUseCase.executeTemplated(
        user.email,
        `Service Booking Confirmation: ${service.title}`,
        'service-booking',
        templateData,
      );
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
