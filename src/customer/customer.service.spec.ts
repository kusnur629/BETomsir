import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Tbl_customer } from './customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, {
        provide: getRepositoryToken(Tbl_customer),
        useValue: {
          save: jest.fn().mockResolvedValue(Tbl_customer),
          find: jest.fn().mockResolvedValue([Tbl_customer]),
        },
      }],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
