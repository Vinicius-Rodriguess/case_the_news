import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  webhookHandler(
    @Query('email') userEmail: string,
    @Query('id') newsletterId: string,
  ) {
    return this.appService.webhookHandler(userEmail, newsletterId);
  }
}
