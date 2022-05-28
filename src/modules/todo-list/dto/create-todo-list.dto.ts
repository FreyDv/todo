import {IsNumber, IsString} from "class-validator";

export class CreateTodoListDto {
  @IsNumber()
  userId: number;
  @IsString()
  title: string;
}
