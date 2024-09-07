import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../src/auth/entities/user.entity';
import { LogsService } from '../../src/logs/logs.service';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let logsService: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        LogsService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    logsService = module.get<LogsService>(LogsService);
  });

  it('should register a new user', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
    jest.spyOn(userRepository, 'save').mockResolvedValue({ email: 'test@example.com', password: 'hashedpassword' } as any);
    jest.spyOn(logsService, 'create').mockResolvedValue({} as any);

    const result = await service.register({ email: 'test@example.com', password: 'password123' });

    expect(result).toEqual({ message: 'Usuário cadastrado com sucesso' });
  });

  it('should throw conflict exception if email already exists', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue({} as any);

    await expect(service.register({ email: 'test@example.com', password: 'password123' }))
      .rejects
      .toThrow(ConflictException);
  });

  it('should login a user and return a token', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue({ email: 'test@example.com', password: await bcrypt.hash('password123', 10) } as any);
    jest.spyOn(service['jwtService'], 'sign').mockReturnValue('token');
    jest.spyOn(logsService, 'create').mockResolvedValue({} as any);

    const result = await service.login({ email: 'test@example.com', password: 'password123' });

    expect(result).toEqual({ token: 'token' });
  });

  it('should throw unauthorized exception on invalid credentials', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

    await expect(service.login({ email: 'test@example.com', password: 'wrongpassword' }))
      .rejects
      .toThrow(UnauthorizedException);
  });
});