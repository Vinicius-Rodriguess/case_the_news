import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { OpeningService } from './opening/opening.service';
import { User } from './user/user.entity';
import { Opening } from './opening/opening.entity';

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

    // Se o usuario esta lendo uma publicacao antiga
    if (opening.opened_at !== opening.data_publicacao) {
      console.log('User is viewing an old post, nothing to do');
      return;
    }

    // Se o usuario entrar mais vezes na mesma publicacao no mesmo dia
    if (user.lastOpenedAt === opening.opened_at) {
      console.log('User is viewing again on the same day, nothing to do');
      return;
    }

    // Se e domingo, nao tem publicacao nesses dias
    if (this.isSunday(opening.opened_at)) {
      console.log('No publications on Sundays, nothing to do');
      return;
    }

    await this.updateStreak(user, opening);

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

  private isSunday(dateString: string): boolean {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day).getDay() === 0;
  }

  private getPreviousValidDate(openedAt: string) {
    // Pega a data e monta um Date
    const [year, month, day] = openedAt.split('-').map(Number);
    const openingDate = new Date(year, month - 1, day);

    let daysToGoBack = 1;

    // Se for segunda volta dois dias, para verificar a publicacao de sabado
    if (openingDate.getDay() === 1) {
      console.log('It is Monday, going back two days');
      daysToGoBack = 2;
    }

    // Subtraia os dias e formata a data
    openingDate.setDate(openingDate.getDate() - daysToGoBack);
    const previousDate = openingDate.toISOString().split('T')[0];

    return previousDate;
  }

  private async updateStreak(user: User, opening: Opening) {
    user.totalStreak++;

    // Verifica se o usuario é novo no sistema
    if (user.lastOpenedAt === null) {
      console.log('New user');
      user.lastOpenedAt = opening.opened_at;
      user.consecutiveStreak++;
      await this.userService.update(user);
      return;
    }

    // Pega a data da publicacao anterior
    const previousDate = this.getPreviousValidDate(opening.opened_at);

    // Compara a data da puplicacao anterior com a ultima leitura do usuario
    if (previousDate === user.lastOpenedAt) {
      user.consecutiveStreak++;
      console.log('Consecutive days');
    } else {
      console.log('Non-consecutive days');
      if (user.highestConsecutiveStreak < user.consecutiveStreak)
        user.highestConsecutiveStreak = user.consecutiveStreak;

      user.consecutiveStreak = 1;
    }

    // Atualiza a ultima leitura
    user.lastOpenedAt = opening.opened_at;
    await this.userService.update(user);
  }
}
