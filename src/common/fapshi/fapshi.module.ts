import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FapshiService } from './services/fapshi.service';
import { FapshiController } from './controllers/fapshi.controller';
import { WebhookController } from './controllers/webhook.controller';
import { FapshiConfig } from './config/fapshi.config';

@Module({
  imports: [ConfigModule.forFeature(FapshiConfig)],
  controllers: [FapshiController, WebhookController],
  providers: [FapshiService],
  exports: [FapshiService],
})
export class FapshiModule {}
