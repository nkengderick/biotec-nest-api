import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Biotech Universe API')
  .setDescription('API documentation for the Biotech Universe WebSite')
  .setVersion('1.0')
  .build();
