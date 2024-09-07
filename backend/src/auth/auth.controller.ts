import { Controller, Post, Body, Get, Req, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: { email: string; password: string }) {
    try {
      return await this.authService.login(credentials);
    } catch (error) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }

  @Get('check')
  @HttpCode(HttpStatus.OK)
  async checkAuth(@Req() req: Request) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return { isAuthenticated: false };
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = this.authService.verifyToken(token);
      return { isAuthenticated: !!decoded };
    } catch (error) {
      return { isAuthenticated: false };
    }
  }
}