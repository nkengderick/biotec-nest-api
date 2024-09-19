import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from '../schemas/service.schema';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  // Create a new service
  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = new this.serviceModel(createServiceDto);
    return newService.save();
  }

  // Find all services and populate bookings and service providers
  async findAll(): Promise<Service[]> {
    return this.serviceModel
      .find()
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
