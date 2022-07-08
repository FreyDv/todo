import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '../mail/mail.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { BcryptModule } from './bcrypt/bcrypt.module';
import JwtConfig from './config/jwt.config';
import { AccountEntity } from './entities/account.entity';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    BcryptModule,
    MailModule,
    PassportModule,
    ConfigModule.forRoot({
      load: [JwtConfig],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') },
      }),
    }),
  ],
  providers: [AccountService, LocalStrategy, JwtStrategy, GoogleStrategy],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
