import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { MailModule } from './modules/mail/mail.module';
import { TodoListModule } from './modules/todo-list/todo-list.module';
import { UsersModule } from './modules/users/users.module';
import { PostgresModule } from './providers/postgres/postgres.module';

@Module({
  imports: [PostgresModule, UsersModule, TodoListModule, AccountModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
