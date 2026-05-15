import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://localhost/nest',
    ),
    SharedModule,
    AuthModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
