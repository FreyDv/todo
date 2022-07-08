import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AccountService } from '../account.service';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AccountService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const authDto = new AuthDto(email, password);
    const res = await this.authService.authentication(authDto);
    console.log(`Result of validate ${email}: ${res}`);
    return true;
  }
}
