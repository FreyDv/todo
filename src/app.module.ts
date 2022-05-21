import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoListModule } from './modules/todo-list/todo-list.module';
import { UserModule } from './modules/user/user.module';
import { PostgresModule } from './providers/postgres/postgres.module';

@Module({
  imports: [
    PostgresModule,
    UserModule,
    TodoListModule,
    ConfigModule.forRoot({ envFilePath: '../.env' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
