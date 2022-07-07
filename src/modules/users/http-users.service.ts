import { Injectable, NotFoundException } from '@nestjs/common';

import { EntityNotFoundException } from '../../common/exceptions/entity-not-found.exception';
import { AccountService } from '../account/account.service';
import { CreateUserDto } from './dto/create-user.dto';
import { OutputMeUserDto } from './dto/output-me-user.dto';
import { OutputUserDto } from './dto/output-user.dto';
import { UsersService } from './users.service';

@Injectable()
export class HttpUsersService {
  constructor(private readonly usersService: UsersService, private readonly accountService: AccountService) {}

  async create(accountId: number, createUserDto: CreateUserDto): Promise<OutputUserDto> {
    const userEntity = await this.usersService.create(createUserDto);
    const account = await this.accountService.findByID(accountId);
    if (!account) {
      throw new Error('Cant find account of user');
    }
    account.user = userEntity;
    await this.accountService.updateAccount(account);
    return OutputUserDto.fromUserEntity(userEntity);
  }
  async findAll(): Promise<OutputUserDto[]> {
    const result = await this.usersService.findAll();
    if (!result) {
      throw new EntityNotFoundException('No one found');
    }
    return result.map((user) => {
      return OutputUserDto.fromUserEntity(user);
    });
  }
  async findOne(id: number): Promise<OutputUserDto> {
    const result = await this.usersService.findOne(id);
    const resultQuery = await this.usersService.findOneQuery(id);
    const resultQb = await this.usersService.findOneQb(id);
    console.log(resultQb, resultQuery);
    if (!result) {
      throw new EntityNotFoundException('User not found');
    }
    return OutputUserDto.fromUserEntity(result);
  }
  async getMe(id: number): Promise<OutputMeUserDto> {
    const result = await this.usersService.findByAccountId(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return OutputMeUserDto.fromUserEntity(result);
  }
  async remove(id: number) {
    return this.usersService.remove(id);
  }
}
