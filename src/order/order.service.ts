import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['employee'] });
  }

  async findOne(id: string): Promise<Order> {
    return this.orderRepository.findOne({ 
      where: { order_id: id },
      relations: ['employee']
    });
  }

  async create(order: Partial<Order>): Promise<Order> {
    const newOrder = this.orderRepository.create(order);
    return this.orderRepository.save(newOrder);
  }

  async update(id: string, order: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(id, order);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
} 