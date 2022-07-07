import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  constructor(email, password = '!NOT A PASSWORD') {
    this.email = email;
    this.password = password;
  }
}
