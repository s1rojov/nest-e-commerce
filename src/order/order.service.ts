import { OrderDto } from './dto/order.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  add(orderDto: OrderDto) {
    return orderDto;
  }
}
