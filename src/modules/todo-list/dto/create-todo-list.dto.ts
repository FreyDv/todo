export class CreateTodoListDto {
  userId: number;
  title: string;

  constructor() {
    this.title = '';
    this.userId = 0;
  }
}
