import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Tbl_product} from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, {
        provide: getRepositoryToken(Tbl_product),
        useValue: {
          save: jest.fn().mockResolvedValue(Tbl_product),
          find: jest.fn().mockResolvedValue([Tbl_product]),
        },
      }],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
