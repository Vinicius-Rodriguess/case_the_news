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
    // Cria ou retorna um user
    const user = await this.userHandler(userEmail);

    return;
  }

  private async userHandler(userEmail: string) {
    let user = await this.userService.findOneByEmail(userEmail);

    if (!user) {
      user = await this.userService.create(userEmail);
      if (!user.openings) user.openings = [];
    }

    return user;
  }
}
