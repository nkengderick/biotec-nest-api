import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ServiceProviderRepository } from '../repositories/service-provider.repository';
import { ServiceRepository } from '../repositories/service.repository';
import { AssignProviderDto } from '../dto/assign-provider.dto';
import { MemberRepository } from 'src/modules/user-management/repositories/member.repository';
import { WorkingHoursDto } from '../dto/availability.dto';
import { Types } from 'mongoose';

@Injectable()
export class AssignServiceProviderUseCase {
  constructor(
    private readonly serviceProviderRepository: ServiceProviderRepository,
    private readonly memberRepository: MemberRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async assignServiceProvider(assignProviderDto: AssignProviderDto) {
    const { member_id, service_id, availability } = assignProviderDto;

    // Check if the member exists
    const member = await this.memberRepository.findById(member_id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${member_id} not found`);
    }

    // Check if the service exists
    const service = await this.serviceRepository.findById(service_id);
    if (!service) {
      throw new NotFoundException(`Service with ID ${service_id} not found`);
    }

    // Validate availability
    this.validateAvailability(availability);

    // Assign the service provider (store in the service provider repository)
    const serviceProvider =
      await this.serviceProviderRepository.assignProvider(assignProviderDto);

    // Add the service provider to the service's service_providers array
    const updatedServiceProviders = [
      ...service.service_providers.map((id) => new Types.ObjectId(id)),
      new Types.ObjectId(serviceProvider._id.toString()),
    ];
    
    // Update the service with the new provider in the service_providers array
    await this.serviceRepository.update(service_id, {
      service_providers: updatedServiceProviders,
    });
  }

  // Validate each day’s working hours
  private validateAvailability(availability: WorkingHoursDto[]) {
    for (const hours of availability) {
      const [startHour, startMinute] = hours.start_time.split(':').map(Number);
      const [endHour, endMinute] = hours.end_time.split(':').map(Number);

      const startTime = new Date();
      startTime.setHours(startHour, startMinute, 0, 0);

      const endTime = new Date();
      endTime.setHours(endHour, endMinute, 0, 0);

      if (startTime >= endTime) {
        throw new BadRequestException(
          `Invalid time range for ${hours.day}: start time must be before end time.`,
        );
      }
    }
  }
}
