import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from '../repositories/booking.repository';

@Injectable()
export class UpdateBookingStatusUseCase {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async updateBookingStatus(bookingId: string, status: string) {
    // First, check if the booking exists
    const booking = await this.bookingRepository.findById(bookingId);

    if (!booking) {
      // If the booking doesn't exist, throw a NotFoundException
      throw new NotFoundException(`Booking with ID ${bookingId} not found`);
    }

    // If the booking exists, proceed to update the status
    return this.bookingRepository.updateStatus(bookingId, status);
  }
}
