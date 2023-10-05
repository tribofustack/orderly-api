import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  const SERVER_PORT = configService.get('SERVER_PORT');

  return app.listen(SERVER_PORT || 8080);
};

bootstrap();
