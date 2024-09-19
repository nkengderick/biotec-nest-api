import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { About, AboutSchema } from './schemas/about.schema';
import { AboutController } from './controllers/about.controller';
import { AboutService } from './services/about.service';
import { AboutRepository } from './repositories/about.repository';
import { CreateAboutUseCase } from './use-cases/create-about.use-case';
import { UpdateAboutUseCase } from './use-cases/update-about.use-case';
import { GetAboutUseCase } from './use-cases/get-about.use-case';
import { Faq, FaqSchema } from './schemas/faq.schema';
import { FaqRepository } from './repositories/faq.repository';
import { CreateFaqUseCase } from './use-cases/create-faq.use-case';
import { UpdateFaqUseCase } from './use-cases/update-faq.use-case';
import { GetAllFaqsUseCase } from './use-cases/get-all-faqs.use-case';
import { DeleteFaqUseCase } from './use-cases/delete-faq.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: About.name, schema: AboutSchema }]),
    MongooseModule.forFeature([{ name: Faq.name, schema: FaqSchema }]),
  ],
  controllers: [AboutController],
  providers: [
    AboutService,
    AboutRepository,
    FaqRepository,
    CreateAboutUseCase,
    UpdateAboutUseCase,
    GetAboutUseCase,
    CreateFaqUseCase,
    UpdateFaqUseCase,
    GetAllFaqsUseCase,
    DeleteFaqUseCase,
  ],
  exports: [AboutService],
})
export class AboutModule {}
