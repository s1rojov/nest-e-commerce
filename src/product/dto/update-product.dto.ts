import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';
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

  // @IsNotEmpty()
  @ApiProperty()
  image?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  price?: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty()
  amount?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  owner?: string;
}
