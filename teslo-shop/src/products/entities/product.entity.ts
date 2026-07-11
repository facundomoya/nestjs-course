import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '00acaae7-bd31-4378-b30d-dce1dab8c04a',
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 19.99,
    description: 'Product Price'
  })
  @Column('float')
  price: number;

  @ApiProperty({
    example: 'A comfortable T-shirt for everyday wear',
    description: 'Product Description'
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: 't-shirt-teslo',
    description: 'Product Slug',
    uniqueItems: true
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: 0,
    description: 'Product Stock'
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ['S', 'M', 'L'],
    description: 'Product Sizes'
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product Gender'
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: ['casual', 'comfortable'],
    description: 'Product Tags'
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product,
    { cascade: true, eager: true })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}