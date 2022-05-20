import { PartialType } from '@nestjs/swagger';
import { CreateTodoListDto } from './create-todo-list.dto';

export class UpdateTodoListDto extends PartialType(CreateTodoListDto) {}
