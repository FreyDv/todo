import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';

@Module({
  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule {}
