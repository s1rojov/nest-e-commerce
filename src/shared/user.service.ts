import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from 'src/types/user';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtPayload } from 'src/types/jwt-payload';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private omitPassword(user: User) {
    const userObj = user.toObject() as User;
    // passwordni ajratib olamiz, qolganini 'result' ga yig'amiz
    const { password, ...result } = userObj;
    return result;
  }
  async create(userDto: RegisterDTO): Promise<Partial<User>> {
    const { username } = userDto;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User is already exist', HttpStatus.UNAUTHORIZED);
    }

    const createdUser = new this.userModel(userDto);
    await createdUser.save();
    return this.omitPassword(createdUser);
  }

  async findByLogin(userDto: LoginDTO): Promise<Partial<User>> {
    const { username, password } = userDto;
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.omitPassword(user);
    } else {
      throw new HttpException(
        'Password or login is wrong!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByPayload(payload: JwtPayload) {
    const { username } = payload;

    return await this.userModel.findOne({ username });
  }
}
