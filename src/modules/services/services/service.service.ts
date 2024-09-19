import { Injectable } from '@nestjs/common';
import { CreateServiceUseCase } from '../use-cases/create-service.use-case';
import { UpdateServiceUseCase } from '../use-cases/update-service.use-case';
import { DeleteServiceUseCase } from '../use-cases/delete-service.use-case';
import { GetAllServicesUseCase } from '../use-cases/get-all-services.use-case';
import { GetServiceByIdUseCase } from '../use-cases/get-a-service.use-case';
import { VerifyServiceUseCase } from '../use-cases/verify-service.use-case';
import { BookingService } from '../use-cases/book-service.use-case';
import { UpdateBookingStatusUseCase } from '../use-cases/update-booking-status.use-case';
import { AssignServiceProviderUseCase } from '../use-cases/assign-provider.use-case';
import { CreateServiceDto } from '../dto/create-service.dto';
import { Service } from '../schemas/service.schema';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { AssignProviderDto } from '../dto/assign-provider.dto';
import { BookServiceDto } from '../dto/book-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly updateServiceUseCase: UpdateServiceUseCase,
    private readonly deleteServiceUseCase: DeleteServiceUseCase,
    private readonly getAllServicesUseCase: GetAllServicesUseCase,
    private readonly getServiceByIdUseCase: GetServiceByIdUseCase,
    private readonly verifyServiceUseCase: VerifyServiceUseCase,
    private readonly assignServiceProviderUseCase: AssignServiceProviderUseCase,
    private readonly bookingService: BookingService,
    private readonly updateBookingStatusUseCase: UpdateBookingStatusUseCase,
  ) {}

  // Create a new service
  async createService(createServiceDto: CreateServiceDto): Promise<Service> {
    return this.createServiceUseCase.execute(createServiceDto);
  }

  // Update an existing service
  async updateService(
    serviceId: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.updateServiceUseCase.execute(serviceId, updateServiceDto);
  }

  // Delete a service by its ID
  async deleteService(serviceId: string): Promise<void> {
    await this.deleteServiceUseCase.execute(serviceId);
  }

  // Get all services
  async getAllServices(): Promise<Service[]> {
    return this.getAllServicesUseCase.execute();
  }

  // Get a service by its ID
  async getServiceById(serviceId: string): Promise<Service> {
    return this.getServiceByIdUseCase.execute(serviceId);
  }

  // Verify a service (mark as verified)
  async verifyService(serviceId: string): Promise<Service> {
    return this.verifyServiceUseCase.verifyService(serviceId);
  }

  // Assign a provider to a service
  async assignServiceProvider(
    assignProviderDto: AssignProviderDto,
  ): Promise<void> {
    await this.assignServiceProviderUseCase.assignServiceProvider(
      assignProviderDto,
    );
  }

  // Book a service
  async bookService(
    bookServiceDto: BookServiceDto,
  ): Promise<{ booking: any; message: string }> {
    return this.bookingService.bookService(bookServiceDto);
  }

  // Update booking status (e.g., Confirm, Cancel)
  async updateBookingStatus(bookingId: string, status: string): Promise<void> {
    await this.updateBookingStatusUseCase.updateBookingStatus(
      bookingId,
      status,
    );
  }
}
