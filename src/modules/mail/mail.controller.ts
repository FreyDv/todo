import { Body, Controller, Post } from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';

import { SendEmailDto } from './dto/send-email.dto';
import { MailService } from './mail.service';

@Swagger.ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  sendEmail(@Body() mail: SendEmailDto) {
    return this.mailService.send(mail);
  }
}
