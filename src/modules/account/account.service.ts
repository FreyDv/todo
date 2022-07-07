import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

import { BcryptService } from './bcrypt/bcrypt.service';
import { AccountOutputDto } from './dto/account-output.dto';
import { AuthDto } from './dto/auth.dto';
import { AccountEntity } from './entities/account.entity';
import { WrongCredentialsProvidedException } from './exceptions/wrong-credentials-provided.exception';

@Injectable()
export class AccountService {
  memoryOfSendingValidationMessage: Array<ValidMsgDto>;
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(AccountEntity)
    private readonly authRepository: Repository<AccountEntity>,
    private readonly bcrypt: BcryptService,
    private readonly jwtService: JwtService,
    private readonly mail: MailService,
  ) {
    this.memoryOfSendingValidationMessage = new Array<ValidMsgDto>();
  }

  async findAccountByEmail(email: string): Promise<AccountEntity | undefined> {
    return await this.authRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async registration(authDto: AuthDto): Promise<AccountOutputDto> {
    const accountWitheSameEmail = await this.findAccountByEmail(authDto.email);
    if (accountWitheSameEmail) {
      throw new Error('Entered email already exist!');
    } else {
      const password = await this.bcrypt.encodePassword(authDto.password);
      const account = await this.create({ ...authDto, password });
      if (!account) {
        throw new Error('Account was not created');
      }
      await this.sendValidationMail(account.id, account.email);
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
  async validateMail(msg: string) {
    const inMemory = this.findMsgInMemory(msg);
    if (!inMemory) {
      throw new Error('The message not found');
    }
    const resultOfCompare = await this.bcrypt.comparePassword(msg, inMemory.id + '' + inMemory.msFromUnix);
    if (resultOfCompare) {
      const isSuccess = this.updateVerifiedAccount(inMemory.id, true);
      if (!isSuccess) throw new Error('Cannot verified email');
      console.log(`Успешно провалидирован акаунт c id:${inMemory.id}`);
      const account = await this.findByID(inMemory.id);
      if (account) {
        const userAlreadyExists = await this.findUserIfEmailAlreadyExists(account);
        if (userAlreadyExists) {
          await this.create(account, undefined, userAlreadyExists);
        }
      }
      return { success: true };
    } else throw new Error('Error comparing secret');
  }
  async findAccountByEmail(email: string, type: AuthProvider = AuthProvider.Local): Promise<AccountEntity> {
    const account = await this.authRepository.find({
      where: {
        email: email,
        type: type,
      },
      relations: ['user'],
    });
    return account[0];
  }
  private async findAccountsByEmail(email: string): Promise<AccountEntity[]> {
    const account = await this.authRepository.find({
      where: {
        email: email,
        verified: true,
      },
      relations: ['user'],
    });
    return account;
  }
  async googleLogin(req) {
    if (!req.user) throw new Error('Can not get User from Google!');
    let account: AccountEntity;
    const userGoogle = req.user._json;
    account = await this.findAccountByEmail(userGoogle.email, AuthProvider.Google);
    if (account) {
      if (account.user && account.verified) {
        return account;
      }
    } else {
      const resultCreating = await this.create(new AuthDto(userGoogle.email), AuthProvider.Google);
      if (!resultCreating) throw new Error('Can not create account!');
      account = resultCreating;
    }
    const userAlreadyExists = await this.findUserIfEmailAlreadyExists(account);
    if (userAlreadyExists) {
      account.user = userAlreadyExists;
      return await this.updateAccount(account);
    }
  }
  updateAccount(account: AccountEntity) {
    return this.authRepository.save(account);
  }
  async findUserIfEmailAlreadyExists(account: AccountEntity): Promise<UserEntity | undefined> {
    const accountWithSameEmail = await this.findAccountsByEmail(account.email);
    for (const acc of accountWithSameEmail) {
      if (acc.user && acc.type != account.type) {
        return acc.user;
      }
    }
    return undefined;
  }
  private findMsgInMemory(msg: string) {
    const forDelete = new Array<number>();
    const nowD = Date.now();
    const inMemory = this.memoryOfSendingValidationMessage.find((el, index) => {
      if (el.msFromUnix > nowD) {
        if (el.msg === msg) {
          forDelete.push(index);
          return true;
        }
      } else forDelete.push(index);
    });
    if (!inMemory) throw new Error('Запись не найдена');
    // Очистка масива от сообшений которые были подтвержденны или истекли по сроку давности!
    if (forDelete.length > 0) {
      this.memoryOfSendingValidationMessage.filter((elm, indexMemory) => {
        for (const indexForDelete of forDelete) {
          if (indexForDelete === indexMemory) return false;
        }
        return true;
      });
    }
    return inMemory;
  }
  private async create(
    authDto: AuthDto,
    type: AuthProvider = AuthProvider.Local,
    user?: UserEntity,
  ): Promise<AccountEntity | undefined> {
    let verified = true;
    if (type == AuthProvider.Local) {
      verified = false;
    }
    return this.authRepository.save({
      ...authDto,
      type,
      verified,
      user,
    });
  }
  async findByID(id: number): Promise<AccountEntity | undefined> {
    return await this.authRepository.findOne(id);
  }
  private async updateVerifiedAccount(id: number, verified: boolean) {
    const account = await this.authRepository.findOne(id);
    if (!account) throw new Error('User with this id does not exist');
    account.verified = verified;
    const account2 = await this.authRepository.save(account);
    if (!account2) throw new Error('User with this id does not exist');
    if (account2.verified !== verified) throw new Error('Cannot verified email');
    return true;
  }
  private getJwtWithId(userId: number): string {
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
