import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  image?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  price?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  owner?: string;
}
