import { NestFactory } from '@nestjs/core';
import { swaggerConfig } from './internal/application/configs/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
