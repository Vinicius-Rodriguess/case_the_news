import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { OpeningService } from './opening/opening.service';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly openingService: OpeningService,
  ) {}

  async webhookHandler(userEmail: string, newsletterId: string) {
    return;
  }
}
