import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const mockUserRepository = {
  findOne: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should hash password correctly', async () => {
    const password = 'password123';
    const hash = await authService.hashPassword(password);
    expect(await bcrypt.compare(password, hash)).toBe(true);
  });

  it('should validate correct password', async () => {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    const isValid = await authService.validatePassword(password, hashedPassword);
    expect(isValid).toBe(true);
  });

  it('should throw error for invalid credentials', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);
    await expect(authService.login({ username: 'test', password: 'wrongpass' })).rejects.toThrow(
      'Invalid credentials',
    );
  });

  it('should return JWT token for valid credentials', async () => {
    const user = { username: 'test', password: 'hashedPassword', role: 'admin' };
    mockUserRepository.findOne.mockResolvedValue(user);

    const token = await authService.login({ username: 'test', password: 'hashedPassword' });
    expect(token).toHaveProperty('token');
  });
});
