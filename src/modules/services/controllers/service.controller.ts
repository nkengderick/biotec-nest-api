import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateServiceDto } from '../dto/create-service.dto';
import { Service } from '../schemas/service.schema';
import { ServiceService } from '../services/service.service';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { AssignProviderDto } from '../dto/assign-provider.dto';
import { BookServiceDto } from '../dto/book-service.dto';

@ApiTags('Services') // This groups the endpoints under "Services" in Swagger
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiBody({
    type: CreateServiceDto,
    description: 'Details for the new service',
  })
  @ApiResponse({
    status: 201,
    description: 'The service has been successfully created.',
    type: Service,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  async createService(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.createService(createServiceDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing service' })
  @ApiParam({ name: 'id', description: 'The ID of the service to update' })
  @ApiBody({
    type: UpdateServiceDto,
    description: 'Updated details for the service',
  })
  @ApiResponse({
    status: 200,
    description: 'The service has been successfully updated.',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  async updateService(
    @Param('id') serviceId: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.updateService(serviceId, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service' })
  @ApiParam({ name: 'id', description: 'The ID of the service to delete' })
  @ApiResponse({
    status: 204,
    description: 'The service has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  @HttpCode(204) // 204 No Content response when deletion is successful
  async deleteService(@Param('id') serviceId: string) {
    return this.serviceService.deleteService(serviceId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({
    status: 200,
    description: 'List of all services.',
    type: [Service],
  })
  async getAllServices() {
    return this.serviceService.getAllServices();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a service by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the service to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'The service details.',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  async getServiceById(@Param('id') serviceId: string) {
    return this.serviceService.getServiceById(serviceId);
  }

  @Put(':id/verify')
  @ApiOperation({ summary: 'Verify a service' })
  @ApiParam({ name: 'id', description: 'The ID of the service to verify' })
  @ApiResponse({
    status: 200,
    description: 'The service has been successfully verified.',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  async verifyService(@Param('id') serviceId: string) {
    return this.serviceService.verifyService(serviceId);
  }

  @Post(':id/assign-provider')
  @ApiOperation({ summary: 'Assign a service provider' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the service to assign a provider',
  })
  @ApiBody({
    type: AssignProviderDto,
    description: 'Details of the provider assignment',
  })
  @ApiResponse({
    status: 201,
    description: 'The provider has been successfully assigned.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Service or member not found.' })
  async assignServiceProvider(@Body() assignProviderDto: AssignProviderDto) {
    return this.serviceService.assignServiceProvider(assignProviderDto);
  }

  @Post('book')
  @ApiOperation({ summary: 'Book a service' })
  @ApiBody({
    type: BookServiceDto,
    description: 'Details for booking the service',
  })
  @ApiResponse({
    status: 201,
    description: 'The service has been successfully booked.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data or booking date in the past.',
  })
  @ApiResponse({ status: 404, description: 'Service or user not found.' })
  async bookService(@Body() bookServiceDto: BookServiceDto) {
    return this.serviceService.bookService(bookServiceDto);
  }

  @Put('booking/:id/status')
  @ApiOperation({ summary: 'Update the status of a booking' })
  @ApiParam({ name: 'id', description: 'The ID of the booking to update' })
  @ApiBody({
    schema: {
      example: { status: 'confirmed' },
      description: 'The new status of the booking',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The booking status has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  async updateBookingStatus(
    @Param('id') bookingId: string,
    @Body('status') status: string,
  ) {
    return this.serviceService.updateBookingStatus(bookingId, status);
  }
}
