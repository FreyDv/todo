import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class MailService {
  public constructor(private readonly conficSeervice: ConfigService) {
    SendGrid.setApiKey(this.conficSeervice.get<string>('SENDGRID_API_KEY') || '');
  }

  async send(sendEmailDto: SendEmailDto) {
    const mail = {
      to: sendEmailDto.email,
      subject: 'email confirmation',
      from: 'ldfm0401@gmail.com',
      text: sendEmailDto.msg,
    };
    const transport = await SendGrid.send(mail);
    console.log(`Email successfully dispatched to ${mail.to}`);
    return transport;
  }
}
