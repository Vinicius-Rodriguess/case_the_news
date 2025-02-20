import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userEmail: string) {
    const user = { email: userEmail };
    return await this.userRepository.save(user);
  }

  async update(user: User) {
    return await this.userRepository.save(user);
  }

  async findOneByEmail(userEmail: string) {
    return await this.userRepository.findOne({
      where: { email: userEmail },
      relations: { openings: true },
    });
  }

  async getTopUsers(limit = 5) {
    return await this.userRepository.find({
      order: { consecutiveStreak: 'DESC' },
      take: limit,
      select: ['email', 'consecutiveStreak'],
    });
  }

  async getEngagementMetricsUser() {
    const totalUsers = await this.userRepository.count();

    const avgStreak = await this.userRepository
      .createQueryBuilder('user')
      .select('AVG(user.consecutiveStreak)', 'average')
      .where('user.consecutiveStreak > 0')
      .getRawOne();

    return {
      totalUsers,
      avgStreak: Number(avgStreak.average).toFixed(0),
    };
  }
}
