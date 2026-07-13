import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        example: 19.99,
        description: 'Product Price',
        nullable: true
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        example: 'A comfortable T-shirt for everyday wear',
        description: 'Product Description',
        nullable: true
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        example: 't-shirt-teslo',
        description: 'Product Slug',
        uniqueItems: true
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        example: 0,
        description: 'Product Stock'
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        example: ['S', 'M', 'L'],
        description: 'Product Sizes'
    })
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty({
        example: ['casual', 'comfortable'],
        description: 'Product Tags'
    })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        description: 'Product Images'
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;
}
