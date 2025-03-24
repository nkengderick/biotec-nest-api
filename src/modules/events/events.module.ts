import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EventAttendee,
  EventAttendeeSchema,
} from './schemas/event-attendee.schema';
import { EventSchema, Event } from './schemas/event.schema';
import {
  EventSpeaker,
  EventSpeakerSchema,
} from './schemas/event-speaker.schema';
import { EventRepository } from './repositories/event.repository';
import { EventSpeakerRepository } from './repositories/event-speaker.repository';
import { EventAttendeeRepository } from './repositories/event-attendee.repository';
import { CreateEventUseCase } from './use-cases/create-event.use-case';
import { UpdateEventUseCase } from './use-cases/update-event.use-case';
import { DeleteEventUseCase } from './use-cases/delete-event.use-case';
import { RegisterAttendeeUseCase } from './use-cases/register-attendee.use-case';
import { AssignSpeakerUseCase } from './use-cases/assign-speaker.use-case';
import { MemberRepository } from '../user-management/repositories/member.repository';
import { UserRepository } from '../user-management/repositories/user.repository';
import { EventsController } from './controllers/event.controller';
import { GetAllEventsUseCase } from './use-cases/get-all-events.use-case';
import { Member, MemberSchema } from '../user-management/schemas/member.schema';
import { User, UserSchema } from '../user-management/schemas/user.schema';
import { SendEmailUseCase } from 'src/common/use-cases/send-email.use-case';
import { EmailService } from 'src/common/services/email.service';
import { EmailTemplateService } from 'src/common/services/email-template.service';
import { AboutModule } from '../about/about.module';
import { GetAboutUseCase } from '../about/use-cases/get-about.use-case';
import { AboutRepository } from '../about/repositories/about.repository';
import { About, AboutSchema } from '../about/schemas/about.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Member.name, schema: MemberSchema },
      { name: User.name, schema: UserSchema },
      { name: EventAttendee.name, schema: EventAttendeeSchema },
      { name: EventSpeaker.name, schema: EventSpeakerSchema },
      { name: About.name, schema: AboutSchema },
    ]),
  ],
  providers: [
    EventsService,
    EmailService,
    EmailTemplateService,
    EventRepository,
    EventSpeakerRepository,
    EventAttendeeRepository,
    MemberRepository,
    UserRepository,
    CreateEventUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase,
    RegisterAttendeeUseCase,
    AssignSpeakerUseCase,
    GetAllEventsUseCase,
    SendEmailUseCase,
    GetAboutUseCase,
    AboutRepository,
  ],
  controllers: [EventsController],
})
export class EventsModule {}
