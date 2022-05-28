import { Injectable } from '@nestjs/common';
import {TodoListService} from "./todo-list.service";
import {CreateTodoListDto} from "./dto/create-todo-list.dto";
import {OutputTodoListDto} from "./dto/output-todo-list.dto";

@Injectable()
export class HttpTodoListService {
    constructor(private readonly todoListService: TodoListService) {}

    async create(createTodoListDto: CreateTodoListDto):Promise<OutputTodoListDto>{
        let result = await this.todoListService.create(createTodoListDto);
        return OutputTodoListDto.fromTodoListEntity(result);
    }
}
