import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './employee.entity';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  const mockEmployeeRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockEmployee = {
    employee_id: '1',
    scores: 10,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmployeeRepository,
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      const employees = [mockEmployee];
      jest.spyOn(service, 'findAll').mockResolvedValue(employees);

      expect(await controller.findAll()).toBe(employees);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single employee', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockEmployee);

      expect(await controller.findOne('1')).toBe(mockEmployee);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create an employee', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockEmployee);
      const createEmployeeDto = {
        scores: 10,
      };

      expect(await controller.create(createEmployeeDto)).toBe(mockEmployee);
      expect(service.create).toHaveBeenCalledWith(createEmployeeDto);
    });
  });

  describe('update', () => {
    it('should update an employee', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockEmployee);
      const updateEmployeeDto = { scores: 15 };

      expect(await controller.update('1', updateEmployeeDto)).toBe(mockEmployee);
      expect(service.update).toHaveBeenCalledWith('1', updateEmployeeDto);
    });
  });

  describe('remove', () => {
    it('should remove an employee', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
}); 