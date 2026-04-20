import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from 'src/shared/dto/register.dto';
import { LoginDTO } from 'src/shared/dto/login.dto';
import { UserService } from 'src/shared/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() userDto: RegisterDTO) {
    const user = await this.userService.create(userDto);

    const payload = {
      username: user.username,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() userDto: LoginDTO) {
    const user = await this.userService.findByLogin(userDto);
    const payload = {
      username: user.username,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Get('check')
  @UseGuards(AuthGuard('jwt'))
  check() {
    return 'authorized';
  }
}
