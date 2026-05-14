import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.scheme';
import { UserService } from './user.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception-filter';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [UserService],
})
export class SharedModule {}
