import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description?: string;

  @IsNotEmpty()
  @ApiProperty()
  image?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  price?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  owner?: string;
}
