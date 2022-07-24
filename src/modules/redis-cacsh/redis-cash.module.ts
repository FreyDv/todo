import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { RedisCashService } from './redis-cash.service';
//
//
//
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: 86400,
      }),
    }),
  ],
  providers: [RedisCashService],
  exports: [RedisCashService],
})
export class RedisCashModule {}
