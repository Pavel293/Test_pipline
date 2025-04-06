import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ListOfProductService } from './list_of_product.service';
import { ListOfProduct } from './list_of_product.entity';

@Controller('list-of-products')
export class ListOfProductController {
  constructor(private readonly listOfProductService: ListOfProductService) {}

  @Get()
  async findAll(): Promise<ListOfProduct[]> {
    return this.listOfProductService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ListOfProduct> {
    return this.listOfProductService.findOne(id);
  }

  @Get('order/:orderId')
  async findByOrderId(@Param('orderId') orderId: string): Promise<ListOfProduct[]> {
    return this.listOfProductService.findByOrderId(orderId);
  }

  @Post()
  async create(@Body() listOfProduct: Partial<ListOfProduct>): Promise<ListOfProduct> {
    return this.listOfProductService.create(listOfProduct);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() listOfProduct: Partial<ListOfProduct>,
  ): Promise<ListOfProduct> {
    return this.listOfProductService.update(id, listOfProduct);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.listOfProductService.remove(id);
  }
} 