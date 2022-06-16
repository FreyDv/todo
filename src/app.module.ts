import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TodoListModule } from './modules/todo-list/todo-list.module';
import { UsersModule } from './modules/users/users.module';
import { PostgresModule } from './providers/postgres/postgres.module';

@Module({
  imports: [PostgresModule, UsersModule, TodoListModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
