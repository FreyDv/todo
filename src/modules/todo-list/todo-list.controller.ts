import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';

import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { TodoListService } from './todo-list.service';

@Swagger.ApiTags('Todo list')
@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  create(@Body() createTodoListDto: CreateTodoListDto):Promise<OutputTodoListDto> {
    return this.todoListService.create(createTodoListDto);
  }

  @Get(':id')
  findAllByUserId(@Param('id') id: string) {
    return this.todoListService.findAllByUserId(+id);
  }

  @Patch(':id')
  updateIsDone(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    return this.todoListService.updateIsDone(+id, updateTodoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoListService.remove(+id);
  }
}
