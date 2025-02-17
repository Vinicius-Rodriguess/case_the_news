import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { OpeningService } from './opening/opening.service';
import { User } from './user/user.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly openingService: OpeningService,
  ) {}

  async webhookHandler(userEmail: string, newsletterId: string) {
    // Cria ou retorna um user
    const user = await this.userHandler(userEmail);

    // Cria ou retorna uma opening
    const opening = await this.openingHandler(newsletterId, user);

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

  private async openingHandler(newsletterId: string, user: User) {
    let opening = await this.openingService.findOneById(newsletterId, user.id);

    if (!opening) {
      opening = await this.openingService.create(newsletterId, user);
      user.openings.push(opening);
      await this.userService.update(user);
    }

    return opening;
  }
}
