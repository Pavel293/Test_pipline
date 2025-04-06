import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from '../employee/employee.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date: string;

  @Column('numeric')
  price: number;

  @Column('text')
  status: string;

  @ManyToOne(() => Employee, (employee) => employee.employee_id)
  employee: Employee;
}
