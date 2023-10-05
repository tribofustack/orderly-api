/* eslint-disable max-classes-per-file */
import { Module, Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}

@Module({ controllers: [AppController] })
export class AppModule {}
