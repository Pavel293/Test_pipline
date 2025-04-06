import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  employee_id: string;

  @Column('numeric')
  scores: number;
}
