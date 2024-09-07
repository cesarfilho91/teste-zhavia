import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LogsService } from '../logs/logs.service'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly logsService: LogsService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ email, password: hashedPassword });

    await this.userRepository.save(newUser);

    await this.logsService.create({
      action: 'REGISTER',
      details: `Novo usuário registrado: ${email}`,
    });

    return { message: 'Usuário cadastrado com sucesso' };
  }

  async login(credentials: { email: string; password: string }) {
    const user = await this.userRepository.findOneBy({ email: credentials.email });

    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      await this.logsService.create({
        action: 'LOGIN_FAILED',
        details: `Falha de login para o e-mail: ${credentials.email}`,
      });

      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.jwtService.sign({ userId: user.id });

    await this.logsService.create({
      action: 'LOGIN_SUCCESS',
      details: `Usuário logado com sucesso: ${credentials.email}`,
    });

    return { token };
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}