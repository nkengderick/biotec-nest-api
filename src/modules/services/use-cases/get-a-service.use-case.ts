import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../repositories/service.repository';
import { Service } from '../schemas/service.schema';

@Injectable()
export class GetServiceByIdUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(serviceId: string): Promise<Service> {
    return this.serviceRepository.findById(serviceId);
  }
}
