export class CreateUserDto {
  readonly name: string;
  readonly privateField: string;

  constructor() {
    this.name = '';
    this.privateField = '';
  }
}
