import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Orderly')
    .setDescription('Orderly API Documentation - by tribofustack')
    .setVersion('1.0')
    .build();