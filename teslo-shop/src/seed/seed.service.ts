import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService
  ){

  }
  async runSeed() {
    await this.insertNewProducts();
    return 'Seed executed successfully';
  }

    private async insertNewProducts() {
    await this.productService.deleteAllProducts();
    const seedProducts = initialData.products;

    const insertPromises = [] as Promise<any>[];

/*     seedProducts.forEach(product => {
      insertPromises.push(this.productService.create(product));
    }); */

    await Promise.all(insertPromises);

    return true;
  }
}
