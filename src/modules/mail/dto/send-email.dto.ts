import { IsEmail, IsUrl } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  email: string;

  @IsUrl()
  msg: string;
}
