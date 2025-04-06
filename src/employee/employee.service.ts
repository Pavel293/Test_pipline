import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    return this.employeeRepository.findOne({ 
      where: { employee_id: id } 
    });
  }

  async create(employee: Partial<Employee>): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(employee);
    return this.employeeRepository.save(newEmployee);
  }

  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    await this.employeeRepository.update(id, employee);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.employeeRepository.delete(id);
  }
} 