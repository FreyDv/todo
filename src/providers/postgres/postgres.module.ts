import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'aurora-data-api'>('database.type'),
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.database'),
        entities: config.get<string>('database.entities'),
        migrations: config.get<string[]>('database.migrations'),
        cli: config.get<string>('database.cli'),
        migrationsRun: config.get<boolean>('database.migrationsRun'),
        synchronize: config.get<boolean>('database.synchronize'),
        logger: 'advanced-console',
        logging: 'all',
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresModule {}
