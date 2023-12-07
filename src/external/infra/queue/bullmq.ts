import { BullModule } from '@nestjs/bull';
import { env } from 'src/internal/application/configs/env';

export const bullModule = BullModule.forRoot({
  redis: {
    host: env.cacheHost,
    port: env.cachePort,
  },
});
