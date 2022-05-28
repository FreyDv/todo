import { applyDecorators, UseGuards } from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';

import { ForbiddenUserGuard } from '../guards/forbidden-user.guard';

export const ForbiddenUser = () => {
  return applyDecorators(
    Swagger.ApiForbiddenResponse({
      description: 'User has x-access-token === FORBIDDEN_USER',
    }),
    UseGuards(ForbiddenUserGuard),
  );
};
