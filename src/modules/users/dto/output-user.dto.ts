import { UserEntity } from '../entities/user.entity';

export class OutputUserDto {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromUserEntity({ id, name }: UserEntity): OutputUserDto {
    return {
      id,
      name,
    };
  }
  static transform(obj): OutputUserDto | undefined {
    const exemplar = new OutputUserDto(0, '0');
    const keyObj = Object.getOwnPropertyNames(exemplar);
    for (const key of keyObj) {
      if (obj.hasOwnProperty(key)) {
        exemplar[key] = obj[key];
      } else return;
    }
    return exemplar;
  }
}
