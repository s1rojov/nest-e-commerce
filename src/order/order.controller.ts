import { Controller, Post, Body } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/types/order';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  @Post('add')
  async add(@Body() orderDto: OrderDto) {
    let order = await this.orderModel
      .findOne()
      .where({ owner: orderDto.product })
      .where({ 'products.product': orderDto.product.product });
    if (!order) {
      order = new this.orderModel({
        owner: orderDto.owner,
        totalPrice: orderDto.totalPrice,
        $push: {
          products: { ...orderDto.product },
        },
      });

      await order.save();
      return order;
    }

    await order.updateOne({
      owner: orderDto.owner,
      totalPrice: orderDto.totalPrice,
      $set: {
        products: { ...orderDto.product },
      },
    });

    return order;
  }
}
