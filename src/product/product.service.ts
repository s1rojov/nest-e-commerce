import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/types/product';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(productDto: CreateProductDto, image: Express.Multer.File) {
    productDto.image = image.filename;
    return await this.productModel.create(productDto as any);
  }

  async findAll() {
    return await this.productModel.find();
  }

  async findOne(id: string) {
    return await this.productModel.findOne({ _id: id });
  }

  async update(
    id: string,
    productDto: UpdateProductDto,
    image: Express.Multer.File,
  ) {
    const product: any = await this.productModel.findOne({ _id: id });

    if (image) {
      try {
        // Faylni o'chirishni kutamiz (await)
        await unlink(`${__dirname}/../../files/${product.image}`);
      } catch (error) {
        // Agar fayl topilmasa yoki o'chirishda xato bo'lsa
        throw new HttpException(
          'File not found or error deleting',
          HttpStatus.NOT_FOUND,
        );
      }

      productDto.image = image.filename;
    }

    return await product.updateOne(productDto);
  }

  async remove(id: string) {
    return await this.productModel.deleteOne({ _id: id });
  }
}
