import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ServiceProvider,
  ServiceProviderDocument,
} from '../schemas/service-provider.schema';
import { AssignProviderDto } from '../dto/assign-provider.dto';

@Injectable()
export class ServiceProviderRepository {
  constructor(
    @InjectModel(ServiceProvider.name)
    private serviceProviderModel: Model<ServiceProviderDocument>,
  ) {}

  async assignProvider(
    assignProviderDto: AssignProviderDto,
  ): Promise<ServiceProvider> {
    const newProvider = new this.serviceProviderModel(assignProviderDto);
    return newProvider.save();
  }

  async findAll(): Promise<ServiceProvider[]> {
    return this.serviceProviderModel.find().populate('member_id').exec();
  }

  async findByServiceId(serviceId: string): Promise<ServiceProvider[]> {
    return this.serviceProviderModel
      .find({ service_id: serviceId })
      .populate('member_id')
      .exec();
  }

  async delete(providerId: string): Promise<ServiceProvider> {
    return this.serviceProviderModel.findByIdAndDelete(providerId).exec();
  }
}
