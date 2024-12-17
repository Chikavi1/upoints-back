import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './email.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('send')
  async sendMail(
    @Query('to') to: string,
    @Query('subject') subject: string,
    @Query('text') text: string,
  ) {
    return this.mailService.sendMail(to, subject, text);
  }
}
