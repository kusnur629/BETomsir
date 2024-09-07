import { Test, TestingModule } from '@nestjs/testing';
import { MerchantService } from './merchant.service';
import { Tbl_merchant } from './merchant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('MerchantService', () => {
  let service: MerchantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerchantService, {
        provide: getRepositoryToken(Tbl_merchant),
        useValue: {
          save: jest.fn().mockResolvedValue(Tbl_merchant),
          find: jest.fn().mockResolvedValue([Tbl_merchant]),
        },
      }],
    }).compile();

    service = module.get<MerchantService>(MerchantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
