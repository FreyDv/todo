import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import * as fs from 'fs/promises';

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
      html: await this.insertDataIntoTemplate(sendEmailDto.email, sendEmailDto.url),
    };
    await fs.writeFile('src/common/temp/SendedEmail.html', mail.html);
    const transport = await SendGrid.send(mail);
    console.log(`Email successfully dispatched to ${mail.to}`);
    return transport;
  }

  private async insertDataIntoTemplate(email: string, url: string) {
    console.log(__dirname);
    const fileName = 'src/modules/mail/templates/mail-template.html';
    const str = await fs.readFile(fileName, { encoding: 'utf-8' });
    // eslint-disable-next-line prettier/prettier
    const templateFinish = str.replace('/${w+}/gm', (match) => {
      return this[match.toLowerCase()];
    });
    console.log(email + ' ' + url);
    return templateFinish;
  }
}
