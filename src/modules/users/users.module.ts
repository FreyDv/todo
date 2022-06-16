import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptModule } from '../auth/bcrypt/bcrypt.module';
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
    // AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, HttpUsersService],
  exports: [UsersService],
})
export class UsersModule /*implements NestModule*/ {
  // configure(consumer: MiddlewareConsumer): void {
  //   // consumer.apply(AddUserToReqMiddleware).forRoutes(UsersController);
  // }
}
