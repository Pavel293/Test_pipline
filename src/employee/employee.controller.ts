import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Post()
  async create(@Body() employee: Partial<Employee>): Promise<Employee> {
    return this.employeeService.create(employee);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() employee: Partial<Employee>): Promise<Employee> {
    return this.employeeService.update(id, employee);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.employeeService.remove(id);
  }
} 