import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './providers/postgres/postgres.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PostgresModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
