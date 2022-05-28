import {IsBoolean} from "class-validator";

export class UpdateTodoListDto {
  @IsBoolean()
  isDone: boolean;

}
