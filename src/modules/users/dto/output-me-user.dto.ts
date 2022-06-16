import { UserEntity } from '../entities/user.entity';

export class OutputMeUserDto {
  id: number;
  name: string;
  privateField: string;

  static fromUserEntity({ id, name, privateField }: UserEntity): OutputMeUserDto {
    return {
      id,
      name,
      privateField,
    };
  }
}
