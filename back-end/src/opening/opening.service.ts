import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Opening } from './opening.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class OpeningService {
  constructor(
    @InjectRepository(Opening)
    private readonly openingRepository: Repository<Opening>,
  ) {}

  async create(newsletterId: string, user: User) {
    const postagem = {
      user: user,
      newsletter_id: newsletterId,
      data_publicacao: newsletterId.replace('post_', ''),
      opened_at: new Date().toISOString().split('T')[0],
    };

    return await this.openingRepository.save(postagem);
  }

  async findOneById(newsletterId: string, userId: number) {
    return await this.openingRepository.findOne({
      where: { newsletter_id: newsletterId, user: { id: userId } },
      relations: { user: true },
    });
  }
}
