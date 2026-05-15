import { QueryProductDto } from './dto/query-product.dto';
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

  async findAll(query: QueryProductDto) {
    const queryObject = query.search
      ? {
          title: {
            $regex: query.search,
            $options: 'i',
          },
        }
      : {};
    const limit = Number(query.limit || 12);
    const skip = (Number(query.page || 1) - 1) * Number(query.limit || 12);
    return await this.productModel.find(queryObject).limit(limit).skip(skip);
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
      fs.unlink(`${__dirname}/../../files/${product.image}`, async (error) => {
        if (error) {
          throw new HttpException('File could not found', HttpStatus.NOT_FOUND);
        }
      });
      productDto.image = image.filename;
      return await product.updateOne(productDto);
    }

    return await product.updateOne(productDto);
  }

  async remove(id: string) {
    return await this.productModel.deleteOne({ _id: id });
  }
}
