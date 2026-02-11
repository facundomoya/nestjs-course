import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity'
import { handleDBException } from 'src/utils/handleDbExceptions';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try{
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    }catch(error){
     handleDBException(error);
    }
  }

  async findAll() {
    const products = await this.productRepository.find();
    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({id});
    if(!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if(!product) throw new NotFoundException(`Product with id ${id} not found`);
    await this.productRepository.remove(product);
    return { message: `Product with id ${id} has been removed` };
  }
}
