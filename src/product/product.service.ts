import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/types/product';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(productDto: CreateProductDto) {
    return await this.productModel.create(productDto as any);
  }

  async findAll() {
    return await this.productModel.find();
  }

  async findOne(id: string) {
    return await this.productModel.findOne({ _id: id });
  }

  async update(id: string, productDto: UpdateProductDto) {
    return await this.productModel.updateOne({ _id: id }, productDto);
  }

  async remove(id: string) {
    return await this.productModel.deleteOne({ _id: id });
  }
}
