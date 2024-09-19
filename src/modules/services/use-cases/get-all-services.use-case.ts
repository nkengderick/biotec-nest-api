import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../repositories/service.repository';
import { Service } from '../schemas/service.schema';

@Injectable()
export class GetAllServicesUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(): Promise<Service[]> {
    return this.serviceRepository.findAll();
  }
}
