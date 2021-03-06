import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';

import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { OutputTodoListDto } from './dto/output-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { HttpTodoListService } from './http-todo-list.service';

@Swagger.ApiTags('Todo list')
@Controller('todo-list')
export class TodoListController {
  constructor(private readonly httpTodoListService: HttpTodoListService) {}

  @Post()
  create(@Body() createTodoListDto: CreateTodoListDto): Promise<OutputTodoListDto> {
    return this.httpTodoListService.create(createTodoListDto);
  }

  @Get(':id')
  findAllByUserId(@Param('id') id: number): Promise<OutputTodoListDto[]> {
    return this.httpTodoListService.findAllByUserId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTodoListDto: UpdateTodoListDto): Promise<OutputTodoListDto> {
    return this.httpTodoListService.update(+id, updateTodoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<boolean> {
    return this.httpTodoListService.remove(+id);
  }
}
