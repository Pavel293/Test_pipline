import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';

@Entity()
export class ListOfProduct {
  @PrimaryGeneratedColumn('uuid')
  list_of_product_id: string;

  @ManyToOne(() => Order, (order) => order.order_id)
  order: Order;

  @ManyToOne(() => Product, (product) => product.product_id)
  product: Product;
}
