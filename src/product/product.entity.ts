import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  image: string;

  @Column('numeric')
  price: number;
}
