import { UserEntity } from '../entities/user.entity';

export class OutputUserDto {
  id: number;
  name: string;

  static fromUserEntity({ id, name }: UserEntity): OutputUserDto {
    return {
      id,
      name,
    };
  }
}
