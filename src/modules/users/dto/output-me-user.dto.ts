import { UserEntity } from '../entities/user.entity';

export class OutputMeUserDto {
  id: number;
  name: string;
  privateField: string;
  email: string;

  static fromUserEntity({
    id,
    name,
    privateField,
    email,
  }: UserEntity): OutputMeUserDto {
    return {
      id,
      name,
      privateField,
      email,
    };
  }
}
