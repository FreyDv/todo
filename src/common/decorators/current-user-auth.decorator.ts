import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentAccountId = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user?.accountId;
});
