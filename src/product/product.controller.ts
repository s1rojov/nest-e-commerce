import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() productDto: CreateProductDto) {
    return await this.productService.create(productDto);
  }

  @Get('getlist')
  async findAll() {
    return await this.productService.findAll();
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() productDto: UpdateProductDto) {
    return await this.productService.update(id, productDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }
}
