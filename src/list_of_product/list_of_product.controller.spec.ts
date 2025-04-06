import { Test, TestingModule } from '@nestjs/testing';
import { ListOfProductController } from './list_of_product.controller';
import { ListOfProductService } from './list_of_product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ListOfProduct } from './list_of_product.entity';

describe('ListOfProductController', () => {
  let controller: ListOfProductController;
  let service: ListOfProductService;

  const mockListOfProductRepository = {
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

  const mockProduct = {
    product_id: '1',
    name: 'Test Product',
    description: 'Test Description',
    image: 'test.jpg',
    price: 100,
  };

  const mockListOfProduct = {
    list_of_product_id: '1',
    order: mockOrder,
    product: mockProduct,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListOfProductController],
      providers: [
        ListOfProductService,
        {
          provide: getRepositoryToken(ListOfProduct),
          useValue: mockListOfProductRepository,
        },
      ],
    }).compile();

    controller = module.get<ListOfProductController>(ListOfProductController);
    service = module.get<ListOfProductService>(ListOfProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of list of products', async () => {
      const listOfProducts = [mockListOfProduct];
      jest.spyOn(service, 'findAll').mockResolvedValue(listOfProducts);

      expect(await controller.findAll()).toBe(listOfProducts);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single list of product', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockListOfProduct);

      expect(await controller.findOne('1')).toBe(mockListOfProduct);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('findByOrderId', () => {
    it('should return list of products by order id', async () => {
      const listOfProducts = [mockListOfProduct];
      jest.spyOn(service, 'findByOrderId').mockResolvedValue(listOfProducts);

      expect(await controller.findByOrderId('1')).toBe(listOfProducts);
      expect(service.findByOrderId).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a list of product', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockListOfProduct);
      const createListOfProductDto = {
        order: mockOrder,
        product: mockProduct,
      };

      expect(await controller.create(createListOfProductDto)).toBe(mockListOfProduct);
      expect(service.create).toHaveBeenCalledWith(createListOfProductDto);
    });
  });

  describe('update', () => {
    it('should update a list of product', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockListOfProduct);
      const updateListOfProductDto = {
        product: mockProduct,
      };

      expect(await controller.update('1', updateListOfProductDto)).toBe(mockListOfProduct);
      expect(service.update).toHaveBeenCalledWith('1', updateListOfProductDto);
    });
  });

  describe('remove', () => {
    it('should remove a list of product', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
}); 