import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './providers/postgres/postgres.module';
import { UserModule } from './modules/user/user.module';
import { TodoListModule } from './modules/todo-list/todo-list.module';
import { ConfigModule } from '@nestjs/config';

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
