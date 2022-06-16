import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT = 10;

@Injectable()
export class BcryptService {
  encodePassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT);
  }

  comparePassword(passwordFromDB: string, passwordFromClient: string): Promise<boolean> {
    return bcrypt.compare(passwordFromClient, passwordFromDB);
  }
}
