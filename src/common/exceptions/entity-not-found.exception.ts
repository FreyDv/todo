import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(message = 'Entity not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
