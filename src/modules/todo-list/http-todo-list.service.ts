import { Injectable } from '@nestjs/common';

import { EntityNotFoundException } from '../../common/exceptions/entity-not-found.exception';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { OutputTodoListDto } from './dto/output-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { TodoListService } from './todo-list.service';

@Injectable()
export class HttpTodoListService {
  constructor(private readonly todoListService: TodoListService) {}

  async create(createTodoListDto: CreateTodoListDto): Promise<OutputTodoListDto> {
    const result = await this.todoListService.create(createTodoListDto);
    return OutputTodoListDto.fromTodoListEntity(result);
  }

  async findAllByUserId(id: number): Promise<OutputTodoListDto[]> {
    const result = await this.todoListService.findAllByUserId(id);
    if (!result) {
      throw new EntityNotFoundException('Cant find eny ToDo for this Users');
    }
    result.map((todo) => {
      return OutputTodoListDto.fromTodoListEntity(todo);
    });
    return result;
  }

  async update(id: number, updateTodoListDto: UpdateTodoListDto): Promise<OutputTodoListDto> {
    const result = await this.todoListService.update(id, updateTodoListDto);
    return OutputTodoListDto.fromTodoListEntity(result);
  }

  async remove(id: number): Promise<boolean> {
    return await this.todoListService.remove(id);
  }
}
