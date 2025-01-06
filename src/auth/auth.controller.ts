import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const hashedPassword = await this.authService.hashPassword(body.password);
    return { message: 'User registered', hashedPassword };
  }
}