import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model, Types } from 'mongoose';
import { Service, ServiceDocument } from '../schemas/service.schema';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import path from 'path';
import { Booking, BookingDocument } from '../schemas/booking.schema';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

    // Script to check and convert user_id from string to ObjectId
  async convertUserIds(): Promise<void> {
    const bookings = await this.bookingModel.find().exec();

    const updates = bookings.map(async (booking) => {
      if (typeof booking.user_id === 'string') {
        try {
          // Convert the user_id from string to ObjectId if it's a valid ID string
          const objectId = new Types.ObjectId(booking.user_id);
          
          // Update the document with the new ObjectId value
          return this.bookingModel.updateOne(
            { _id: booking._id },
            { $set: { user_id: objectId } },
          ).exec();
        } catch (error) {
          console.error(`Error converting user_id for booking ${booking._id}: ${error.message}`);
        }
      }
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    console.log('User ID conversion completed.');
  }


  // Create a new service
  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = new this.serviceModel(createServiceDto);
    return newService.save();
  }

  // Find all services and populate bookings and service providers
  async findAll(): Promise<Service[]> {
    await this.convertUserIds()
    return this.serviceModel
      .find()
      .populate({
        path: 'service_providers',
        model: 'ServiceProvider',
        populate: {
          path: 'member_id',
          model: 'Member',
          populate: {
            path: 'user_id',
            model: "User"
          }
        },
      })
      .populate({
        path: 'bookings',
        model: 'Booking',
        populate: {
          path: 'user_id',
          model: 'User',
        },
      })
      .exec();
  }

  // Find a service by its ID and populate bookings and service providers
  async findById(serviceId: string): Promise<Service> {
    return this.serviceModel
      .findById(serviceId)
      .populate({
        path: 'service_providers',
        model: 'ServiceProvider',
        populate: {
          path: 'member_id',
          model: 'Member',
        },
      })
      .populate({
        path: 'bookings',
        model: 'Booking',
        populate: {
          path: 'user_id',
          model: 'User',
        },
      })
      .exec();
  }

  // Update a service by its ID
  async update(
    serviceId: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.serviceModel
      .findByIdAndUpdate(serviceId, updateServiceDto, {
        new: true,
      })
      .populate('bookings')
      .populate('service_providers')
      .exec();
  }

  // Delete a service by its ID
  async delete(serviceId: string): Promise<Service> {
    return this.serviceModel
      .findByIdAndDelete(serviceId)
      .populate('bookings')
      .populate('service_providers')
      .exec();
  }
}
