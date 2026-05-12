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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { editedFileName } from 'src/utils/file-helper';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editedFileName,
      }),
    }),
  )
  async create(
    @Body() productDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.productService.create(productDto, image);
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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editedFileName,
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() productDto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): any {
    return await this.productService.update(id, productDto, image);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }
}
