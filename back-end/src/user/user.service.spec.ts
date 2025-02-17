import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('Should create a user', async () => {
    const mockUser: User = { email: 'test@example.com' } as User;

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);

    const result = await userService.create(mockUser.email);

    expect(userRepository.save).toHaveBeenCalledWith({ email: mockUser.email });
    expect(result).toEqual(mockUser);
  });

  it('Should update a user', async () => {
    const mockUser: User = { email: 'test@example.com' } as User;

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);

    const result = await userService.update(mockUser);

    expect(userRepository.save).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('Should find a user by email', async () => {
    const mockUser: User = { email: 'test@example.com', openings: [] } as User;

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

    const result = await userService.findOneByEmail(mockUser.email);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { email: mockUser.email },
      relations: { openings: true },
    });

    expect(result).toEqual(mockUser);
  });
});
