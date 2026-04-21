import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from 'src/shared/dto/register.dto';
import { LoginDTO } from 'src/shared/dto/login.dto';
import { UserService } from 'src/shared/user.service';
import { JwtPayload } from 'src/types/jwt-payload';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() userDto: RegisterDTO) {
    const user = await this.userService.create(userDto);

    const payload: JwtPayload = {
      username: user.username,
    };

    const token = this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() userDto: LoginDTO) {
    const user = await this.userService.findByLogin(userDto);
    const payload: JwtPayload = {
      username: user.username,
    };
    const token = this.authService.signPayload(payload);
    return { user, token };
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  check() {
    return 'authorized';
  }
}
