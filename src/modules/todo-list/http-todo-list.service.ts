import { Injectable } from '@nestjs/common';
import {TodoListService} from "./todo-list.service";
import {CreateTodoListDto} from "./dto/create-todo-list.dto";
import {OutputTodoListDto} from "./dto/output-todo-list.dto";
import {EntityNotFoundException} from "../../common/exceptions/entity-not-found.exception";

@Injectable()
export class HttpTodoListService {
    constructor(private readonly todoListService: TodoListService) {}

    async create(createTodoListDto: CreateTodoListDto):Promise<OutputTodoListDto>{
        let result = await this.todoListService.create(createTodoListDto);
        return OutputTodoListDto.fromTodoListEntity(result);
    }

    async findAllByUserId(id: number):Promise<OutputTodoListDto[]>{
        let result = await this.todoListService.findAllByUserId(id);
        if(!result){
            throw new EntityNotFoundException('Cant find eny ToDo for this Users');
        }
        result.map((todo)=>{
            return OutputTodoListDto.fromTodoListEntity(todo);
        })
        return result;
    }
}
