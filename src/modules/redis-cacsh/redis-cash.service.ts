import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCashService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string, validFunc?: (obj) => T | undefined): Promise<T | T[] | undefined> {
    const res: T[] = [];
    const redisData = await this.cacheManager.get<T>(key);
    if (!redisData) return undefined;
    if (!validFunc) return redisData;
    if (Array.isArray(redisData)) {
      for (const oneOfRedisData of redisData) {
        if (typeof oneOfRedisData == 'object') {
          const validData = validFunc(oneOfRedisData);
          if (validData) {
            res.push(validData);
          }
        }
      }
    } else {
      if (typeof redisData == 'object') {
        const validData = validFunc(redisData);
        if (validData) {
          res.push(validData);
        }
      }
    }
    return res;
  }

  set<T>(key: string, value: T) {
    this.cacheManager.set<T>(key, value, { ttl: 86000 });
    return this.cacheManager.set<T>(key, value);
  }

  delete(key: string) {
    return this.cacheManager.del(key);
  }
}
