import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepository } from '../repositories/service.repository';

@Injectable()
export class DeleteServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(serviceId: string): Promise<void> {
    // First, find the service by its ID to ensure it exists
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) {
      // If the service doesn't exist, throw a NotFoundException
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }

    // If the service exists, proceed with deletion
    await this.serviceRepository.delete(serviceId);
  }
}
