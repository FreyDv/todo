import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './providers/postgres/postgres.module';
import { UserModule } from './modules/user/user.module';
import { TodoListModule } from './modules/todo-list/todo-list.module';

@Module({
  imports: [PostgresModule, UserModule, TodoListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
