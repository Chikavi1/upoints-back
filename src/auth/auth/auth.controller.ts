import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    const { username, password } = loginDto;

    const user = { id: 1, username: 'testuser', password: 'hashedpassword' };

    const isPasswordValid = await this.authService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = await this.authService.generateToken(user);
    return { access_token: token };
  }
}