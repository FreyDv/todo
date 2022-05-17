import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './providers/postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
