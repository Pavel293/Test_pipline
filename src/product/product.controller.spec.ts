import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockProduct = {
    product_id: '1',
    name: 'Test Product',
    description: 'Test Description',
    image: 'test.jpg',
    price: 100,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [mockProduct];
      jest.spyOn(service, 'findAll').mockResolvedValue(products);

      expect(await controller.findAll()).toBe(products);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockProduct);

      expect(await controller.findOne('1')).toBe(mockProduct);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockProduct);
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        image: 'test.jpg',
        price: 100,
      };

      expect(await controller.create(createProductDto)).toBe(mockProduct);
      expect(service.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockProduct);
      const updateProductDto = { name: 'Updated Product' };

      expect(await controller.update('1', updateProductDto)).toBe(mockProduct);
      expect(service.update).toHaveBeenCalledWith('1', updateProductDto);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
}); 