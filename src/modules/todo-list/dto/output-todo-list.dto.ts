import { TodoListEntity } from '../entities/todo-list.entity';

export class OutputTodoListDto {
  id: number;
  title: string;
  isDone: boolean;

  static fromTodoListEntity({
    id,
    title,
    isDone,
  }: TodoListEntity): OutputTodoListDto {
    return {
      id,
      title,
      isDone,
    };
  }
}
