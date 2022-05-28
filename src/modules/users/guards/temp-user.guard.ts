import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';

import usersConfig from '../config/user.config';

export class TempUserGuard implements CanActivate {
  private readonly forbiddenUser: string | undefined;

  constructor(
    @Inject(usersConfig.KEY)
    { forbiddenUser }: ConfigType<typeof usersConfig>,
  ) {
    this.forbiddenUser = forbiddenUser;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['x-access-token'];

    return token !== this.forbiddenUser;
  }
}
