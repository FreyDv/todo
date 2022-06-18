import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/modules/account/bcrypt/bcrypt.service';
import { Repository } from 'typeorm';

import { UserEntity } from '../users/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { AuthOutputDto } from './dto/auth.output-dto';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly authRepository: Repository<AccountEntity>,
    private readonly bcrypt: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async create(authDto: AuthDto): Promise<AccountEntity | undefined> {
    return this.authRepository.save(authDto);
  }

  async findAccountByEmail(email: string): Promise<AccountEntity | undefined> {
    return await this.authRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async registration(authDto: AuthDto): Promise<AuthOutputDto> {
    if (await this.findAccountByEmail(authDto.email)) {
      throw new Error('Entered email already exist!');
    } else {
      authDto.password = await this.bcrypt.encodePassword(authDto.password);
      const authCreateResult = await this.create(authDto);
      if (authCreateResult) {
        return {
          id: authCreateResult.id,
          email: authCreateResult.email,
          resultAuth: true,
        } as AuthOutputDto;
      } else
        return {
          id: -0,
          email: '',
          resultAuth: false,
        } as AuthOutputDto;
    }
  }

  async authentication(authDto: AuthDto): Promise<boolean> {
    const authEntity = await this.findAccountByEmail(authDto.email);
    if (authEntity) {
      const isPasswordsEqual = await this.bcrypt.comparePassword(authEntity.password, authDto.password);
      if (isPasswordsEqual) {
        return true;
      } else throw new Error('Wrong credentials provided');
    } else throw new Error('Wrong credentials provided');
  }

  getJwtWithId(userId: number): string {
    const payload = { id: userId };
    return this.jwtService.sign(payload);
  }

  getCookieWithJwtToken(userId: number): string {
    const jwtWithId = this.getJwtWithId(userId);
    return `Authentication=${jwtWithId}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
  }

  async getUser(id: number): Promise<UserEntity> {
    const accountWithUser = await this.authRepository.findOne(id, {
      relations: ['user'],
    });
    if (accountWithUser?.user) {
      return accountWithUser?.user;
    } else throw new Error('User with this id does not exist');
  }
}
