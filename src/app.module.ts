import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { getDatabaseConfig } from './common/config/database.config';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './common/services/database.service';
import { UserManagementModule } from './modules/user-management/user-management.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { EventsModule } from './modules/events/events.module';
import { ServiceModule } from './modules/services/services.module';
import { AboutModule } from './modules/about/about.module';
// import { AboutController } from './modules/about/controllers/about.controller';
import { BlogModule } from './modules/blogs/blogs.module';
// import { BlogService } from './modules/blogs/services/blog.service';
import { FeedbackModule } from './modules/feedbacks/feedbacks.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { FapshiModule } from './common/fapshi/fapshi.module';
import { PaymentsModule } from './modules/payment/payment.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: getDatabaseConfig,
    }),
    UserManagementModule,
    ProjectsModule,
    ServiceModule,
    EventsModule,
    AboutModule,
    BlogModule,
    FeedbackModule,
    FapshiModule,
    PaymentsModule,
    ChatbotModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
