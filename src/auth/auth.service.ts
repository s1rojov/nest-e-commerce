import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/shared/user.service';
import { JwtPayload } from 'src/types/jwt-payload';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signPayload(payload: JwtPayload): string {
    return sign(payload, process.env.JWT_SECRET || 'secretKey', {
      expiresIn: '7h',
    });
  }
  async validateUser(payload: JwtPayload) {
    return await this.userService.findByPayload(payload);
  }
}
