import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BookServiceDto } from '../dto/book-service.dto';
import { Booking, BookingDocument } from '../schemas/booking.schema';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async create(
    bookServiceDto: BookServiceDto,
  ): Promise<{ booking: Booking; id: any }> {
    const newBooking = new this.bookingModel(bookServiceDto);
    const savedBooking = await newBooking.save();
    return { booking: savedBooking, id: savedBooking._id };
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().populate('user_id').exec();
  }

  async findById(bookingId: string): Promise<Booking> {
    return this.bookingModel.findById(bookingId).populate('user_id').exec();
  }

  async updateStatus(bookingId: string, status: string): Promise<Booking> {
    return this.bookingModel
      .findByIdAndUpdate(bookingId, { status }, { new: true })
      .populate('user_id')
      .exec();
  }

  async delete(bookingId: string): Promise<Booking> {
    return this.bookingModel
      .findByIdAndDelete(bookingId)
      .populate('user_id')
      .exec();
  }
}
