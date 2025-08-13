import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; 
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

@Post('login')
async login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}

  @Post('register')
  async register(@Body() createDto) {
    const user = await this.usersService.create(createDto);
    const { password, ...u } = user.toObject();
    return { message: 'Inscription réussie', user: u };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }
}
