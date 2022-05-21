import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoListModule } from './modules/todo-list/todo-list.module';
import { UsersModule } from './modules/users/users.module';
import { PostgresModule } from './providers/postgres/postgres.module';

@Module({
  imports: [
    PostgresModule,
    UsersModule,
    TodoListModule,
    ConfigModule.forRoot({ envFilePath: '../.env' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
