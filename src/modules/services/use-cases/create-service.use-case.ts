import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../repositories/service.repository';
import { CreateServiceDto } from '../dto/create-service.dto';
import { Service } from '../schemas/service.schema';

@Injectable()
export class CreateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(createServiceDto: CreateServiceDto): Promise<Service> {
    return this.serviceRepository.create(createServiceDto);
  }
}
