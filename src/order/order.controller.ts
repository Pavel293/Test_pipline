import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Post()
  async create(@Body() order: Partial<Order>): Promise<Order> {
    return this.orderService.create(order);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() order: Partial<Order>): Promise<Order> {
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(id);
  }
} 