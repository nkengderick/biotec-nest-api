import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../repositories/service.repository';
import { UpdateServiceDto } from '../dto/update-service.dto';

@Injectable()
export class VerifyServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async verifyService(serviceId: string) {
    const updateDto: UpdateServiceDto = { is_verified: true };
    return this.serviceRepository.update(serviceId, updateDto);
  }
}
