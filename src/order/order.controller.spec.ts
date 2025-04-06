import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './order.entity';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockOrder = {
    order_id: '1',
    date: '2023-01-01',
    price: 100,
    status: 'pending',
    employee: { employee_id: '1', scores: 10 },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const orders = [mockOrder];
      jest.spyOn(service, 'findAll').mockResolvedValue(orders);

      expect(await controller.findAll()).toBe(orders);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single order', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockOrder);

      expect(await controller.findOne('1')).toBe(mockOrder);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockOrder);
      const createOrderDto = {
        date: '2023-01-01',
        price: 100,
        status: 'pending',
        employee: { employee_id: '1', scores: 10 },
      };

      expect(await controller.create(createOrderDto)).toBe(mockOrder);
      expect(service.create).toHaveBeenCalledWith(createOrderDto);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockOrder);
      const updateOrderDto = { status: 'completed' };

      expect(await controller.update('1', updateOrderDto)).toBe(mockOrder);
      expect(service.update).toHaveBeenCalledWith('1', updateOrderDto);
    });
  });

  describe('remove', () => {
    it('should remove an order', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
}); 