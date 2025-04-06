import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() product: Partial<Product>): Promise<Product> {
    return this.productService.create(product);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: Partial<Product>): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }
}
