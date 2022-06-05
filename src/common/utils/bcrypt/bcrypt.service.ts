import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT = 10;

@Injectable()
export class BcryptService {
  async encodePassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT);
  }
}
