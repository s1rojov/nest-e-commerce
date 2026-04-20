import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from 'src/types/user';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private omitPassword(user: User) {
    return user.depopulate('password');
  }
  async create(userDto: RegisterDTO): Promise<User> {
    const { username } = userDto;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User is already exist', HttpStatus.UNAUTHORIZED);
    }

    const createdUser = new this.userModel(userDto);
    await createdUser.save();
    return this.omitPassword(createdUser);
  }

  async findByLogin(userDto: LoginDTO): Promise<User> {
    const { username, password } = userDto;
    const user = await this.userModel.findById({ username });

    if (!user) {
      throw new HttpException('Invalid credintial', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.omitPassword(user);
    } else {
      throw new HttpException('Invalid credintial', HttpStatus.UNAUTHORIZED);
    }
  }
}
