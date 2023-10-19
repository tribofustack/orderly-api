import { BullModule } from '@nestjs/bull';

export const bullModule = BullModule.forRoot({
  redis: {
    host: 'redis',
    port: 6379,
  },
});
