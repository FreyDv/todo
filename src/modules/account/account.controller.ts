import { Body, Controller, Get, HttpCode, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';
import { Response } from 'express';

import { AccountService } from './account.service';
import { AccountOutputDto } from './dto/account-output.dto';
import { AuthDto } from './dto/auth.dto';
import { ValidMsgDto } from './dto/valid-msg.dto';
import GoogleAuthenticationGuard from './guard/googleAuthenticationGuard';
import { LocalAuthenticationGuard } from './guard/localAuthentication.guard';
import snapchatAuthenticationGuard from './guard/snapchatAuthenticationGuard';

@Swagger.ApiTags('Auth')
@Controller('auth')
export class AccountController {
  private msg: ValidMsgDto;
  constructor(private readonly authService: AccountService) {}

  @Post('/registration')
  registration(@Body() authDto: AuthDto): Promise<AccountOutputDto> {
    return this.authService.registration(authDto);
  }

  @HttpCode(200)
  @Post('/login')
  @UseGuards(LocalAuthenticationGuard)
  async authentication(@Body() authDto: AuthDto, @Res() response: Response) {
    const account = await this.authService.findAccountByEmail(authDto.email);
    if (account) {
      this.sendJwtWithCookie(account, response);
    }
  }

  @Get('/with/snapchat')
  @UseGuards(snapchatAuthenticationGuard)
  async snapchatAuth(@Req() req) {
    return req;
  }

  @Get('/snapchat/callback')
  @UseGuards(snapchatAuthenticationGuard)
  async snapchatAuthRedirect(@Req() req, @Res() response: Response) {
    const account = await this.authService.snapchatLogin(req);
    if (account) {
      return this.sendJwtWithCookie(account, response);
    }
    return undefined;
  }

  @Get('/with/google')
  @UseGuards(GoogleAuthenticationGuard)
  async googleAuth(@Req() req) {
    return req;
  }

  @Get('/google/callback')
  @UseGuards(GoogleAuthenticationGuard)
  async googleAuthRedirect(@Req() req, @Res() response: Response) {
    const account = await this.authService.googleLogin(req);
    if (account) {
      return this.sendJwtWithCookie(account, response);
    }
    return undefined;
  }

  @Get('/validate')
  validationEmail(@Query() query) {
    return this.authService.validateMail(query.msg);
  }

  sendJwtWithCookie(account, response: Response) {
    const userJwt = this.authService.getCookieWithJwtToken(account.id);
    response.setHeader('Set-Cookie', userJwt);
    const res = {
      id: account.id,
      email: account.email,
      resultAuth: true,
      jwt: userJwt,
    };
    return response.send(JSON.stringify(res));
  }
}
