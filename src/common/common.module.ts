import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { EmailTemplateService } from './services/email-template.service';
import { SendEmailUseCase } from './use-cases/send-email.use-case';
import { AboutModule } from 'src/modules/about/about.module';
import { AboutRepository } from 'src/modules/about/repositories/about.repository';
import { GetAboutUseCase } from 'src/modules/about/use-cases/get-about.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { About, AboutSchema } from 'src/modules/about/schemas/about.schema';
import {
  Member,
  MemberSchema,
} from 'src/modules/user-management/schemas/member.schema';

@Module({
  imports: [
    AboutModule,
    MongooseModule.forFeature([
      { name: About.name, schema: AboutSchema },
      { name: Member.name, schema: MemberSchema },
    ]),
  ],
  providers: [
    EmailService,
    EmailTemplateService,
    SendEmailUseCase,
    GetAboutUseCase,
    AboutRepository,
  ],
  exports: [EmailService, EmailTemplateService, SendEmailUseCase],
})
export class CommonModule {}
