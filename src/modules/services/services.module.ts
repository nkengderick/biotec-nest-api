import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema, Service } from './schemas/service.schema';
import {
  ServiceProviderSchema,
  ServiceProvider,
} from './schemas/service-provider.schema';
import { BookingSchema, Booking } from './schemas/booking.schema';
import { ServiceRepository } from './repositories/service.repository';
import { ServiceProviderRepository } from './repositories/service-provider.repository';
import { BookingRepository } from './repositories/booking.repository';
import { CreateServiceUseCase } from './use-cases/create-service.use-case';
import { UpdateServiceUseCase } from './use-cases/update-service.use-case';
import { DeleteServiceUseCase } from './use-cases/delete-service.use-case';
import { GetAllServicesUseCase } from './use-cases/get-all-services.use-case';
import { VerifyServiceUseCase } from './use-cases/verify-service.use-case';
import { UpdateBookingStatusUseCase } from './use-cases/update-booking-status.use-case';
import { UserRepository } from '../user-management/repositories/user.repository';
import { MemberRepository } from '../user-management/repositories/member.repository';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case'; // Adjust path as needed
import { GetServiceByIdUseCase } from './use-cases/get-a-service.use-case';
import { AssignServiceProviderUseCase } from './use-cases/assign-provider.use-case';
import { BookingService } from './use-cases/book-service.use-case';
import { ServiceController } from './controllers/service.controller';
import { ServiceService } from './services/service.service';
import { User, UserSchema } from '../user-management/schemas/user.schema';
import { Member, MemberSchema } from '../user-management/schemas/member.schema';
import { EmailService } from 'src/common/services/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Service.name, schema: ServiceSchema },
      { name: ServiceProvider.name, schema: ServiceProviderSchema },
      { name: Booking.name, schema: BookingSchema },
      { name: User.name, schema: UserSchema },
      { name: Member.name, schema: MemberSchema },
    ]),
  ],
  controllers: [ServiceController],
  providers: [
    EmailService,
    ServiceService,
    ServiceRepository,
    ServiceProviderRepository,
    BookingRepository,
    CreateServiceUseCase,
    UpdateServiceUseCase,
    DeleteServiceUseCase,
    GetAllServicesUseCase,
    GetServiceByIdUseCase,
    VerifyServiceUseCase,
    AssignServiceProviderUseCase,
    BookingService,
    UpdateBookingStatusUseCase,
    SendEmailUseCase,
    UserRepository, 
    MemberRepository,
    SendEmailUseCase,
  ],
  exports: [ServiceService],
})
export class ServiceModule {}
