import {IsBoolean, IsString} from "class-validator";

export class UpdateTodoListDto {
  @IsString()
  title: string
  @IsBoolean()
  isDone: boolean;
}
