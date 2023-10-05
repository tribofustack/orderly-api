/* eslint-disable max-classes-per-file */
import { Module, Controller, Get } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
})
export class AppModule {}
