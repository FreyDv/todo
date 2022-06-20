import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
