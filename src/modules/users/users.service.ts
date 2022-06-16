import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // private readonly auth: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.find({
      where: {
        email: email,
      },
    });

    if (Array.isArray(user) && user.length === 1) {
      return user[0];
    } else return undefined;
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
