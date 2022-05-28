import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoListEntity } from './entities/todo-list.entity';
import { HttpTodoListService } from './http-todo-list.service';
import { TodoListController } from './todo-list.controller';
import { TodoListService } from './todo-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoListEntity])],
  controllers: [TodoListController],
  providers: [TodoListService, HttpTodoListService],
})
export class TodoListModule {}
