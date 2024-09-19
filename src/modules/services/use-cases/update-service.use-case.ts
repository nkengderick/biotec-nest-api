import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepository } from '../repositories/service.repository';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Service } from '../schemas/service.schema';

@Injectable()
export class UpdateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(
    serviceId: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    // First, check if the service exists
    const existingService = await this.serviceRepository.findById(serviceId);

    if (!existingService) {
      // If the service doesn't exist, throw a NotFoundException
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }

    // If the service exists, proceed to update it
    return this.serviceRepository.update(serviceId, updateServiceDto);
  }
}
