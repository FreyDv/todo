import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { AccountEntity, aliasAccountEntity } from '../account/entities/account.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { aliasUserEntity, UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(id, {
      relations: ['account'],
    });
  }

  findByAccountId(accountId: number): Promise<UserEntity | undefined> {
    return this.userRepository
      .createQueryBuilder(aliasUserEntity)
      .innerJoin(
        AccountEntity,
        aliasAccountEntity,
        `${aliasUserEntity}.id = ${aliasAccountEntity}.user_id AND ${aliasAccountEntity}.id = :accountId`,
        { accountId },
      )
      .getOne();
  }

  findOneQuery(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.query(
      `SELECT * FROM users LEFT JOIN account ON users.id=account.user_id WHERE users.id=${id}`,
    );
  }

  findOneQb(id: number): Promise<UserEntity | undefined> {
    const qb = this.userRepository.createQueryBuilder(aliasUserEntity);
    UsersService.addToQbSelectAccount(qb);

    return qb.where({ id }).getOne();
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

  private static addToQbSelectAccount(qb: SelectQueryBuilder<UserEntity>): SelectQueryBuilder<UserEntity> {
    return qb.leftJoinAndSelect(`${aliasUserEntity}.account`, aliasAccountEntity);
  }
}
