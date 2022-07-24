import { Injectable, NotFoundException } from '@nestjs/common';

import { EntityNotFoundException } from '../../common/exceptions/entity-not-found.exception';
import { AccountService } from '../account/account.service';
import { RedisCashService } from '../redis-cacsh/redis-cash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { OutputMeUserDto } from './dto/output-me-user.dto';
import { OutputUserDto } from './dto/output-user.dto';
import { UsersService } from './users.service';

@Injectable()
export class HttpUsersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly accountService: AccountService,
    private readonly redisCashService: RedisCashService,
  ) {}

  async create(accountId: number, createUserDto: CreateUserDto): Promise<OutputUserDto> {
    const userEntity = await this.usersService.create(createUserDto);
    const account = await this.accountService.findByID(accountId);
    if (!account) {
      throw new Error('Cant find account of user');
    }
    account.user = userEntity;
    await this.accountService.updateAccount(account);
    const res = OutputUserDto.fromUserEntity(userEntity);
    await this.redisCashService.delete('/users');
    await this.redisCashService.delete(`/users/${res.id}`);
    await this.redisCashService.set<OutputUserDto>(`/users/${res.id}`, res);
    return res;
  }
  async findAll(): Promise<OutputUserDto[]> {
    const redisData = await this.redisCashService.get<OutputUserDto>('/users', OutputUserDto.transform);
    if (Array.isArray(redisData)) {
      return redisData;
    }
    const result = await this.usersService.findAll();
    if (!result) {
      throw new EntityNotFoundException('No one found');
    }
    const res = result.map((user) => {
      return OutputUserDto.fromUserEntity(user);
    });
    await this.redisCashService.set<OutputUserDto[]>(`/users`, res);
    return res;
  }
  async findOne(id: number): Promise<OutputUserDto> {
    const redisData = await this.redisCashService.get<OutputUserDto>(`/users/${id}`, OutputUserDto.transform);
    if (Array.isArray(redisData) && redisData.length == 1) {
      return redisData[0];
    }
    const result = await this.usersService.findOne(id);
    const resultQuery = await this.usersService.findOneQuery(id);
    const resultQb = await this.usersService.findOneQb(id);
    console.log(resultQb, resultQuery);
    if (!result) {
      throw new EntityNotFoundException('User not found');
    }
    const res = OutputUserDto.fromUserEntity(result);
    await this.redisCashService.set<OutputUserDto>(`/users/${res.id}`, res);
    return res;
  }
  async getMe(id: number): Promise<OutputMeUserDto> {
    const result = await this.usersService.findByAccountId(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return OutputMeUserDto.fromUserEntity(result);
  }
  async remove(id: number) {
    const res = await this.usersService.remove(id);
    if (res) {
      await this.redisCashService.delete('/users');
      await this.redisCashService.delete(`/users/${id}`);
    }
    return res;
  }
}
