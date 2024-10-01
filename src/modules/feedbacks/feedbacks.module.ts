import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackController } from './controllers/feedback.controller';
import { FeedbackService } from './services/feedback.service';
import { FeedbackUseCase } from './use-cases/feedback.use-case';
import { FeedbackRepository } from './repositories/feedback.repository';
import { Feedback, FeedbackSchema } from './schemas/feedback.schema';
import { EventRepository } from '../events/repositories/event.repository';
import { ServiceRepository } from '../services/repositories/service.repository';
import { UserRepository } from '../user-management/repositories/user.repository';
import { User, UserSchema } from '../user-management/schemas/user.schema';
import { Service, ServiceSchema } from '../services/schemas/service.schema';
import { EventSchema } from '../events/schemas/event.schema';
import { Booking, BookingSchema } from '../services/schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feedback.name, schema: FeedbackSchema },
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Booking.name, schema: BookingSchema },
    ]),
  ],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    FeedbackUseCase,
    FeedbackRepository,
    EventRepository,
    ServiceRepository,
    UserRepository,
  ],
  exports: [FeedbackService],
})
export class FeedbackModule {}
