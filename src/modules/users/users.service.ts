import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserEntity | undefined>;
  findOne(email: string): Promise<UserEntity | undefined>;

  async findOne(findProperty: unknown): Promise<unknown | undefined> {
    let user;
    if (typeof findProperty === 'string') {
      user = await this.userRepository.find({
        where: {
          email: findProperty,
        },
      });
      if (!Array.isArray(user)) {
        return user;
      }
    }
    if (typeof findProperty === 'number') {
      return this.userRepository.findOne(findProperty);
    }
  }

  async remove(id: number): Promise<boolean> {
    const res = await this.userRepository.delete(id);
    if (res.affected !== null && res.affected !== undefined) {
      if (res.affected > 0) {
        return true;
      }
    }
    return false;
  }
}
