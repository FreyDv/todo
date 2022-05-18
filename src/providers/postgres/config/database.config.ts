import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['dist/providers/postgres/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/providers/postgres/migrations',
  },
  migrationsRun: false,
  synchronize: false,
  autoLoadEntities: false,
}));
