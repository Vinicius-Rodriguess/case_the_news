import { Repository } from 'typeorm';
import { OpeningService } from './opening.service';
import { Opening } from './opening.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UtmParams } from '../interfaces/UtmParams';
import { User } from '../user/user.entity';

describe('OpeningService', () => {
  let openingService: OpeningService;
  let openingRepository: Repository<Opening>;

  const mockUser = { id: 1, email: 'test@example.com' } as User;
  const mockUtmParams: UtmParams = {
    utmSource: 'google',
    utmCampaign: 'campaign',
  };
  const mockNewsletterId = 'post_17-02-2025';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpeningService,
        {
          provide: getRepositoryToken(Opening),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    openingService = module.get<OpeningService>(OpeningService);
    openingRepository = module.get<Repository<Opening>>(
      getRepositoryToken(Opening),
    );
  });

  it('Should create a Opening', async () => {
    const mockOpening = {
      id: 1,
      user: mockUser,
      newsletterId: mockNewsletterId,
      publicationDate: mockNewsletterId.replace('post_', ''),
      openedAt: new Date().toISOString().split('T')[0],
      ...mockUtmParams,
    } as Opening;

    jest.spyOn(openingRepository, 'save').mockResolvedValue(mockOpening);

    const result = await openingService.create(
      mockNewsletterId,
      mockUser,
      mockUtmParams,
    );

    expect(openingRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        user: mockUser,
        newsletterId: mockNewsletterId,
        publicationDate: mockNewsletterId.replace('post_', ''),
        openedAt: expect.any(String), // Considerando que a data vai ser dinâmica
        ...mockUtmParams,
      }),
    );

    expect(result).toEqual(mockOpening);
  });

  it('Should find a opening by id', async () => {
    const mockOpening = {
      id: 1,
      user: mockUser,
      newsletterId: mockNewsletterId,
      publicationDate: mockNewsletterId.replace('post_', ''),
      openedAt: new Date().toISOString().split('T')[0],
      ...mockUtmParams,
    } as Opening;

    jest.spyOn(openingRepository, 'findOne').mockResolvedValue(mockOpening);

    const result = await openingService.findOneById(
      mockNewsletterId,
      mockUser.id,
    );

    expect(openingRepository.findOne).toHaveBeenCalledWith({
      where: { newsletterId: mockNewsletterId, user: { id: mockUser.id } },
      relations: { user: true },
    });

    expect(result).toEqual(mockOpening);
  });
});
