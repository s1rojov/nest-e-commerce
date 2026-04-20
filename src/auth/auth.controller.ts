import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from 'src/shared/dto/register.dto';
import { LoginDTO } from 'src/shared/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userDto: RegisterDTO) {
    return userDto;
  }

  @Post('login')
  login(@Body() userDto: LoginDTO) {
    return userDto;
  }
}
