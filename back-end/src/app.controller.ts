import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UtmParams } from './interfaces/UtmParams';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async webhookHandler(
    @Query('email') userEmail: string,
    @Query('id') newsletterId: string,
    @Query('utm_source') utmSource?: string,
    @Query('utm_medium') utmMedium?: string,
    @Query('utm_campaign') utmCampaign?: string,
    @Query('utm_channel') utmChannel?: string,
  ) {
    const utmParams: UtmParams = {
      utmSource,
      utmMedium,
      utmCampaign,
      utmChannel,
    };

    console.log(utmParams);

    await this.appService.webhookHandler(userEmail, newsletterId, utmParams);

    return { message: 'Webhook processed successfully' };
  }
}
