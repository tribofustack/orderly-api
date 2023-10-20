import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Orderly')
    .setDescription('internal API Orderly')
    .setVersion('1.0')
    .build();