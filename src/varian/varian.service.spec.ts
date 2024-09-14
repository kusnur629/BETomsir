import { Test, TestingModule } from '@nestjs/testing';
import { VarianService } from './varian.service';
import { Tbl_varian } from './varian.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('VarianService', () => {
  let service: VarianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VarianService, {
        provide: getRepositoryToken(Tbl_varian),
        useValue: {
          save: jest.fn().mockResolvedValue(Tbl_varian),
          find: jest.fn().mockResolvedValue([Tbl_varian]),
        },
      }],
    }).compile();

    service = module.get<VarianService>(VarianService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
