import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from '../account/account.module';
import { BcryptModule } from '../account/bcrypt/bcrypt.module';
import { RedisCashModule } from '../redis-cacsh/redis-cash.module';
import usersConfig from './config/user.config';
import { UserEntity } from './entities/user.entity';
import { HttpUsersService } from './http-users.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule.forRoot({ load: [usersConfig] }),
    BcryptModule,
    JwtModule,
    AccountModule,
    RedisCashModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, HttpUsersService],
  exports: [UsersService],
})
export class UsersModule {}
