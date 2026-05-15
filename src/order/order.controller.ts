import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('add')
  add(@Body() orderDto: OrderDto) {
    return this.OrderService.add(orderDto);
  }
}
