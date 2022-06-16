import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/modules/auth/bcrypt/bcrypt.service';
import { Repository } from 'typeorm';

import { UserEntity } from '../users/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { AuthOutputDto } from './dto/auth.output-dto';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly bcrypt: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(authDto: AuthDto): Promise<AuthOutputDto> {
    if (await this.findAuthCardByEmail(authDto.email)) {
      throw new HttpException('This email address is already being used!', HttpStatus.INTERNAL_SERVER_ERROR);
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
    const authEntity = await this.findAuthCardByEmail(authDto.email);
    if (authEntity) {
      const isPasswordsEqual = await this.bcrypt.comparePassword(authEntity.password, authDto.password);
      if (isPasswordsEqual) {
        return true;
      } else throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    } else throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    return false;
  }

  getJwtWithId(userId: number): string {
    const payload = { id: userId };
    return this.jwtService.sign(payload);
  }

  getCookieWithJwtToken(userId: number): string {
    const jwtWithId = this.getJwtWithId(userId);
    return `Authentication=${jwtWithId}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
  }

  async findAuthCardByEmail(email: string): Promise<AuthEntity | undefined> {
    return await this.authRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(authDto: AuthDto): Promise<AuthEntity | undefined> {
    return this.authRepository.save(authDto);
  }

  async getUser(id: number): Promise<UserEntity> {
    const authEntity = await this.authRepository.findOne(id, {
      relations: ['user'],
    });
    if (authEntity?.user) {
      return authEntity.user;
    } else throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }
}
