import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity'
import { handleDBException } from 'src/utils/handleDbExceptions';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productoRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try{
      const product = this.productoRepository.create(createProductDto);
      await this.productoRepository.save(product);
      return product;
    }catch(error){
     handleDBException(error);
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
