import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Opening } from './opening.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UtmParams } from '../interfaces/UtmParams';

@Injectable()
export class OpeningService {
  constructor(
    @InjectRepository(Opening)
    private readonly openingRepository: Repository<Opening>,
  ) {}

  async create(newsletterId: string, user: User, utmParams?: UtmParams) {
    const postagem = {
      user: user,
      newsletterId: newsletterId,
      publicationDate: newsletterId.replace('post_', ''),
      openedAt: new Date().toISOString().split('T')[0],
      ...utmParams,
    };

    return await this.openingRepository.save(postagem);
  }

  async findOneById(newsletterId: string, userId: number) {
    return await this.openingRepository.findOne({
      where: { newsletterId: newsletterId, user: { id: userId } },
      relations: { user: true },
    });
  }

  async getAllOpenings() {
    return await this.openingRepository
      .createQueryBuilder('opening')
      .select('opening.newsletterId', 'newsletterId')
      .addSelect('opening.publicationDate', 'publicationDate')
      .addSelect('COUNT(opening.id)', 'openingsCount')
      .groupBy('opening.newsletterId')
      .addGroupBy('opening.publicationDate')
      .orderBy('openingsCount', 'DESC')
      .getRawMany();
  }
}
