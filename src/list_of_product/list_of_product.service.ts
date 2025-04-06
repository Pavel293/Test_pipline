import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListOfProduct } from './list_of_product.entity';

@Injectable()
export class ListOfProductService {
  constructor(
    @InjectRepository(ListOfProduct)
    private readonly listOfProductRepository: Repository<ListOfProduct>,
  ) {}

  async findAll(): Promise<ListOfProduct[]> {
    return this.listOfProductRepository.find({
      relations: ['order', 'product']
    });
  }

  async findOne(id: string): Promise<ListOfProduct> {
    return this.listOfProductRepository.findOne({
      where: { list_of_product_id: id },
      relations: ['order', 'product']
    });
  }

  async findByOrderId(orderId: string): Promise<ListOfProduct[]> {
    return this.listOfProductRepository.find({
      where: { order: { order_id: orderId } },
      relations: ['order', 'product']
    });
  }

  async create(listOfProduct: Partial<ListOfProduct>): Promise<ListOfProduct> {
    const newListOfProduct = this.listOfProductRepository.create(listOfProduct);
    return this.listOfProductRepository.save(newListOfProduct);
  }

  async update(id: string, listOfProduct: Partial<ListOfProduct>): Promise<ListOfProduct> {
    await this.listOfProductRepository.update(id, listOfProduct);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.listOfProductRepository.delete(id);
  }
} 