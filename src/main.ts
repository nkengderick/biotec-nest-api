import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { swaggerConfig } from './common/config/swagger.config';
import { DatabaseService } from './common/services/database.service';
import { ErrorHandlerFilter } from './common/filters/error-handler.filter';
import { ValidationPipeConfig } from './common/config/validation-pipe.config';
import serverlessExpress from '@vendia/serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function createApp() {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.setGlobalPrefix('api');

  // Apply LoggerMiddleware globally
  app.use(new LoggerMiddleware().use.bind(new LoggerMiddleware()));

  // Enable CORS with the imported configuration
  app.enableCors();

  // Apply ErrorHandlerFilter globally to catch and handle exceptions
  app.useGlobalFilters(new ErrorHandlerFilter());

  // Use the custom validation pipe from the config file
  app.useGlobalPipes(ValidationPipeConfig);

  // Swagger configuration
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  // JSON document
  app.getHttpAdapter().get('/swagger-json', (req, res) => {
    res.send(document);
  });

  // Wait for the database to be connected
  const databaseService = app.get(DatabaseService);
  await databaseService.onModuleInit();

  await app.init();

  return expressApp;
}

let server;

export default async function handler(event, context) {
  if (!server) {
    const expressApp = await createApp();
    server = serverlessExpress({ app: expressApp });
  }
  return server(event, context);
}
