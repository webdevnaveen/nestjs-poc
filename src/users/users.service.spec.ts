import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

const mockUserRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should update the user role', async () => {
    const userId = 1;
    const newRole = 'admin';
    const user = { id: userId, role: 'user' };

    mockUserRepository.findOne.mockResolvedValue(user);
    mockUserRepository.save.mockResolvedValue({ ...user, role: newRole });

    const result = await usersService.updateUserRole(userId, newRole);
    expect(result).toEqual({ ...user, role: newRole });
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    expect(mockUserRepository.save).toHaveBeenCalledWith({ ...user, role: newRole });
  });

  it('should throw an error if user is not found', async () => {
    const userId = 1;
    const newRole = 'admin';

    mockUserRepository.findOne.mockResolvedValue(null);

    await expect(usersService.updateUserRole(userId, newRole)).rejects.toThrow('User not found');
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
  });
});
