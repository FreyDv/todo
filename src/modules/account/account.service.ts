import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/modules/account/bcrypt/bcrypt.service';
import { Repository } from 'typeorm';

import { UserEntity } from '../users/entities/user.entity';
import { AccountOutputDto } from './dto/account-output.dto';
import { AuthDto } from './dto/auth.dto';
import { AccountEntity } from './entities/account.entity';
import { WrongCredentialsProvidedException } from './exceptions/wrong-credentials-provided.exception';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly authRepository: Repository<AccountEntity>,
    private readonly bcrypt: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async create(authDto: AuthDto): Promise<AccountEntity | undefined> {
    return this.authRepository.save({
      ...authDto,
      user: {
        name: '',
        privateField: '',
      },
    });
  }

  async findAccountByEmail(email: string): Promise<AccountEntity | undefined> {
    return await this.authRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async registration(authDto: AuthDto): Promise<AccountOutputDto> {
    if (await this.findAccountByEmail(authDto.email)) {
      throw new Error('Entered email already exist!');
    } else {
      const password = await this.bcrypt.encodePassword(authDto.password);
      const account = await this.create({ ...authDto, password });
      if (!account) {
        throw new Error('Account was not created');
      }
      return AccountOutputDto.fromAccount(account);
    }
  }

  async authentication(authDto: AuthDto): Promise<boolean> {
    const authEntity = await this.findAccountByEmail(authDto.email);
    if (authEntity) {
      const isPasswordsEqual = await this.bcrypt.comparePassword(authEntity.password, authDto.password);
      if (isPasswordsEqual) {
        return true;
      } else throw new WrongCredentialsProvidedException();
    } else throw new WrongCredentialsProvidedException();
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
