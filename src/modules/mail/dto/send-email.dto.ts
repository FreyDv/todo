import { IsEmail, IsUrl } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  email: string;

  @IsUrl()
  url: string;

  constructor(email, msg) {
    this.email = email;
    this.url = msg;
  }
}
