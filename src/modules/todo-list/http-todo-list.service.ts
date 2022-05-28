import { Injectable } from '@nestjs/common';
import {TodoListService} from "./todo-list.service";

@Injectable()
export class HttpTodoListService {
    constructor(private readonly todoListService: TodoListService) {}
}
