import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response } from 'express';

import { EntityNotFoundException } from '../../../common/exceptions/entity-not-found.exception';
import { UsersService } from '../users.service';

@Injectable()
export class AddUserToReqMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: any, res: Response, next: () => void): Promise<void> {
    const userId = Number(req.headers['user-id']);

    if (Number.isInteger(userId)) {
      const user = await this.usersService.findOne(userId || 1);
      if (!user) {
        throw new EntityNotFoundException();
      }

      req.user = user;
    } else {
      throw new BadRequestException();
    }

    next();
  }
}
