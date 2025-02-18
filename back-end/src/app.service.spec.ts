import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { OpeningService } from './opening/opening.service';
import { User } from './user/user.entity';
import { Opening } from './opening/opening.entity';

describe('AppService', () => {
  let appService: AppService;
  let userService: UserService;
  let openingService: OpeningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: UserService,
          useValue: {
            findOneByEmail: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: OpeningService,
          useValue: {
            findOneById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    userService = module.get<UserService>(UserService);
    openingService = module.get<OpeningService>(OpeningService);
  });

  it('should create a new user if not found', async () => {
    const mockUser = new User();
    jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);
    jest.spyOn(userService, 'create').mockResolvedValue(mockUser);

    const user = await appService['userHandler']('test@example.com');
    expect(userService.create).toHaveBeenCalledWith('test@example.com');
    expect(user).toEqual(mockUser);
  });

  it('should return existing user', async () => {
    const mockUser = new User();
    jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(mockUser);

    const user = await appService['userHandler']('test@example.com');
    expect(userService.create).not.toHaveBeenCalled();
    expect(user).toEqual(mockUser);
  });

  it('should create an opening if not found', async () => {
    const mockUser = new User();
    mockUser.openings = [];
    const mockOpening = new Opening();
    jest.spyOn(openingService, 'findOneById').mockResolvedValue(null);
    jest.spyOn(openingService, 'create').mockResolvedValue(mockOpening);
    jest.spyOn(userService, 'update').mockResolvedValue(mockUser);

    const opening = await appService['openingHandler'](
      'newsletter-123',
      mockUser,
    );
    expect(openingService.create).toHaveBeenCalledWith(
      'newsletter-123',
      mockUser,
      undefined,
    );
    expect(userService.update).toHaveBeenCalledWith(mockUser);
    expect(opening).toEqual(mockOpening);
  });

  it('should return existing opening', async () => {
    const mockUser = new User();
    const mockOpening = new Opening();
    jest.spyOn(openingService, 'findOneById').mockResolvedValue(mockOpening);

    const opening = await appService['openingHandler'](
      'newsletter-123',
      mockUser,
    );
    expect(openingService.create).not.toHaveBeenCalled();
    expect(opening).toEqual(mockOpening);
  });

  it('should identify Sundays correctly', () => {
    expect(appService['isSunday']('2024-02-11')).toBe(true); // Sunday
    expect(appService['isSunday']('2024-02-12')).toBe(false); // Monday
  });

  it('should return correct previous valid date', () => {
    expect(appService['getPreviousValidDate']('2024-02-12')).toBe('2024-02-10'); // Monday -> Saturday
    expect(appService['getPreviousValidDate']('2024-02-14')).toBe('2024-02-13'); // Wednesday -> Tuesday
  });
});
