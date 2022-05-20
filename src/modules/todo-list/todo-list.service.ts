import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoListEntity } from './entities/todo-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoListEntity)
    private readonly todoListsRepository: Repository<TodoListEntity>,
  ) {}

  create(createTodoListDto: CreateTodoListDto) {
    return this.todoListsRepository.create({
      ...createTodoListDto,
      isDone: false,
    });
  }

  findAllByUserId(userId: number): Promise<TodoListEntity[]> {
    return this.todoListsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  updateIsDone(
    id: number,
    updateTodoListDto: UpdateTodoListDto,
  ): Promise<TodoListEntity> {
    return this.todoListsRepository.save({ id, ...updateTodoListDto });
  }

  remove(id: number): Promise<TodoListEntity[]> {
    return this.todoListsRepository.remove(TodoListEntity[id]);
  }
}
