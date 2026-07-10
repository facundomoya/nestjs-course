import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){

  }
  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertNewUsers();
    await this.insertNewProducts(adminUser);
    return 'Seed executed successfully';
  }

  private async deleteTables() {
    await this.productService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute();
  }

  private async insertNewUsers() {
    const seedUsers = initialData.users;
    const seedUsersWithHashedPassword = seedUsers.map(user => {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      return { ...user, password: hashedPassword };
    });
    const users: User[] = [];
    seedUsersWithHashedPassword.forEach(user => {
      users.push(this.userRepository.create(user));
    });
    const dbUsers = await this.userRepository.save(users);
    return dbUsers[0];
  }


    private async insertNewProducts(adminUser: User) {
    await this.productService.deleteAllProducts();
    const seedProducts = initialData.products;

    const insertPromises = [] as Promise<any>[];

    seedProducts.forEach(product => {
      insertPromises.push(this.productService.create(product, adminUser));
    }); 

    await Promise.all(insertPromises);

    return true;
  }
}
