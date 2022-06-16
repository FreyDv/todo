import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserAuth = createParamDecorator((keyName: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  return keyName ? req.user?.[keyName] : req.user;
});
