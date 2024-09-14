import { Test, TestingModule } from '@nestjs/testing';
import { SatuanService } from './satuan.service';
import { Tbl_satuan } from './satuan.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('SatuanService', () => {
  let service: SatuanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SatuanService, {
        provide: getRepositoryToken(Tbl_satuan),
        useValue: {
          save: jest.fn().mockResolvedValue(Tbl_satuan),
          find: jest.fn().mockResolvedValue([Tbl_satuan]),
        },
      }],
    }).compile();

    service = module.get<SatuanService>(SatuanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
