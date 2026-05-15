import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Type,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class Product {
  @ApiProperty({
    type: String,
    description: 'Id of purchased product',
  })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    type: Number,
    description: 'Quantity of purchased product',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class OrderDto {
  @ApiProperty({
    type: String,
    description: 'Owner Id',
  })
  @IsString()
  @IsNotEmpty()
  owner: string;

  @ApiProperty({
    type: String,
    description: 'Total price of purchased product',
  })
  @IsString()
  @IsNotEmpty()
  totalPrice: string;

  @ApiProperty({
    type: Product,
    description: 'Purchased product',
  })
  @ValidateNested()
  @Type(() => Product)
  product: Product;
}
