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

  findOne(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(id);
  }

  async getMe(id: number): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne(id);
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
