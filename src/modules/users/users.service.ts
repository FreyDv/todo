import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { OutputMeUserDto } from './dto/output-me-user.dto';
import { OutputUserDto } from './dto/output-user.dto';
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

  async findAll(): Promise<OutputUserDto[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      return OutputUserDto.fromUserEntity(user);
    });
  }

  async findOne(id: number): Promise<OutputUserDto> {
    const user = await this.userRepository.findOne(id);

    return OutputUserDto.fromUserEntity(user);
  }

  async getMe(id: number): Promise<OutputMeUserDto> {
    const user = await this.userRepository.findOne(id);

    return OutputMeUserDto.fromUserEntity(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
