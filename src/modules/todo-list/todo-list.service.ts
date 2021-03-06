import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { TodoListEntity } from './entities/todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoListEntity)
    private readonly todoListsRepository: Repository<TodoListEntity>,
  ) {}

  create(createTodoListDto: CreateTodoListDto): Promise<TodoListEntity> {
    return this.todoListsRepository.save({
      ...createTodoListDto,
      isDone: false,
    });
  }

  findAllByUserId(userId: number): Promise<TodoListEntity[]> {
    return this.todoListsRepository.find({
      where: {
        userId: userId,
      },
    });
  }

  update(id: number, updateTodoListDto: UpdateTodoListDto): Promise<TodoListEntity> {
    return this.todoListsRepository.save({ id, ...updateTodoListDto });
  }

  async remove(id: number): Promise<boolean> {
    const res = await this.todoListsRepository.delete(TodoListEntity[id]);
    if (res.affected !== null && res.affected !== undefined) {
      if (res.affected > 0) {
        return true;
      }
    }
    return false;
  }
}
