import { Body, Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';
import { Response } from 'express';

import { AccountService } from './account.service';
import { AuthDto } from './dto/auth.dto';
import { AuthOutputDto } from './dto/auth.output-dto';
import { LocalAuthenticationGuard } from './guard/localAuthentication.guard';

@Swagger.ApiTags('Auth')
@Controller('auth')
export class AccountController {
  constructor(private readonly authService: AccountService) {}

  @Post('/registration')
  registration(@Body() authDto: AuthDto): Promise<AuthOutputDto> {
    return this.authService.registration(authDto);
  }

  @HttpCode(200)
  @Post('/login')
  @UseGuards(LocalAuthenticationGuard)
  async authentication(@Body() authDto: AuthDto, @Res() response: Response) {
    const user = await this.authService.findAccoundByEnail(authDto.email);
    if (user) {
      const userJwt = this.authService.getCookieWithJwtToken(user.id);
      response.setHeader('Set-Cookie', userJwt);
      const res = {
        id: user.id,
        email: user.email,
        resultAuth: true,
        jwt: userJwt,
      };
      return response.send(JSON.stringify(res));
    }
  }
}
